<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\User\AddToCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = Auth::user()->cart()->with(['product.images', 'product.category'])->get();
        return Inertia::render('shop/Cart', [
            'cart' => $cart,
            "auth" => [
                "user" => auth()->user()->load([
                    "profile" => function ($q) {
                        $q->select("user_id", "name", "email"); // include foreign key!
                    }
                ])
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer',
        ]);
        // dd($request->quantity);
        AddToCart::updateOrCreate(
            ['user_id' => Auth::id(), 'product_id' => $request->product_id],
            ['quantity' => DB::raw("quantity + {$request->quantity}")]
        );

        return back()->with('success', 'Item added to cart.');
    }

    public function destroy($productId)
    {
        AddToCart::where('user_id', Auth::id())->where('product_id', $productId)->delete();
        return back()->with('success', 'Item removed.');
    }
}
