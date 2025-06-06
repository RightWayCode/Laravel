<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function products(Request $request)
    {
        $search = $request->search;
        $sort = $request->get('sort') ?? "latest";
        $parsedFilters = $this->getParams($request->get('f'));
        $page = $request->get('page');

        $cacheKey = 'products:' . md5(json_encode([
            'search' => $search,
            'filters' => $parsedFilters,
            'sort' => $sort,
            'page' => $page,
        ]));

        $products = Cache::remember($cacheKey, now()->addMinutes(20), function () use ($search, $parsedFilters, $sort) {
            $query = $this->searchProducts($search);
            $query->where(function ($q) use ($parsedFilters) {
                foreach ($parsedFilters as $key => $value) {
                    switch ($key) {
                        case "brands":
                            $q->whereIn('brand', $value);
                            break;
                        case "categories":
                            $q->whereHas('category', function ($q2) use ($value) {
                                $q2->whereIn("name", $value);
                            });
                            break;
                    }
                };
            });

            switch ($sort) {
                case 'price_asc':
                    $query->orderBy("price",  'asc');
                    break;
                case 'price_desc':
                    $query->orderBy("price",  "desc");
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
                    break;
            }

            return $query->paginate(40);
        });
        // Apply search

        $filters = Cache::remember("filter$search", now()->addMinutes(20), function () use ($search) {
            $query = $this->searchProducts($search);
            $brands = (clone $query)->select('brand')
                ->distinct()
                ->whereNotNull('brand')
                ->pluck('brand');
            // 🔄 Fetch categories from filtered products
            $categories = (clone $query)->with("category")->get()->pluck('category.name')->unique()->values();

            return [
                "brands" => $brands,
                "categories" => $categories
            ];
        });

        // Return to frontend
        return Inertia::render("shop/Shop", [
            "productsData" => $products,
            "filters" => $filters,
            "filtered" => [
                "sort" => $sort,
                "search" => $search,
                'filter' => $parsedFilters
            ]
        ]);
    }

    public function product_about(Request $request)
    {
        $productId = $request->id;
        $product = [];
        if ($productId) {
            $product = Product::with(['tags', "category", 'images'])->find($productId);
            // return response()->json([$product]);
        }
        // dd($product, $user_carts);
        $user = Auth::user();
        return Inertia::render("shop/ShowProduct", [
            "product" => $product,
            // "auth" => auth()->check() ? auth()->user()->loadMissing(['cart', 'favorites']) : null
            "auth" => auth()->check() ? [
                "cart" => $user->cart->pluck('product_id'),
                "favorites" => $user->favorites->pluck('product_id'),
            ] : null
        ]);
        // return Inertia::render("shop/ShowProduct");
    }

    protected function searchProducts($search)
    {
        // Main base query
        $query = Product::query()->with(['tags', 'category', 'images'])
            ->where(function ($q) use ($search) {
                $q->where("name", "like", "%{$search}%")
                    ->orWhere("description", "like", "%{$search}%")
                    ->orWhereHas("category", function ($q2) use ($search) {
                        $q2->where("name", "like", "%{$search}%");
                    })
                    ->orWhereHas("tags", function ($q2) use ($search) {
                        $q2->where("tag", "like", "%{$search}%");
                    });
            });
        return $query;
    }

    protected function getParams($filters)
    {
        $parsedFilters = [];

        if ($filters) {
            // Split into filter groups
            $groups = explode('::', $filters);
            if ($groups) {
                foreach ($groups as $group) {
                    [$key, $values] = explode(':', $group, 2);
                    $parsedFilters[Str::lower($key)] = explode(',', Str::lower($values));
                }
            }
        }
        return $parsedFilters;
    }
    protected function getSort($filters)
    {
        $parsedFilters = [];

        if ($filters !== "latest") {
            // Split into filter groups
            [$key, $values] = explode('_', $filters);
            $parsedFilters[Str::lower($key)] = $values;
        } else {
            $parsedFilters = $filters;
        }
        return $parsedFilters;
    }
}
