<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Auth::user()->favorites()->with(['product.images', 'product.category'])->get();
        return Inertia::render('shop/Favorites', ['favorites' => $favorites]);
    }

    public function toggle($productId)
    {
        $user = Auth::user();
        $exists = $user->favorites()->where('product_id', $productId)->first();

        if ($exists) {
            $exists->delete();
            return back()->with('success', 'Removed from favorites.');
        }

        $user->favorites()->create(['product_id' => $productId]);
        return back()->with('success', 'Added to favorites.');
    }
    public function moveCart(Request $request)
    {
        $user = Auth::user();
        $move = $user->cart();
        $move->updateOrCreate([
            'product_id' => $request->product_id
        ], [
            "quantity" => $request->quantity
        ]);
        $delete = $user->favorites()->where('product_id', $request->product_id)->delete();


        return back()->with('success', 'Added to favorites.');
    }
}
