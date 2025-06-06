<?php

namespace App\Http\Controllers\Route;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function Overview()
    {
        return Inertia::render('profile/Overview');
    }
    public function profile()
    {
        return Inertia::render('profile/Profile', [
            'auth' => [
                "user" => auth()->user()->load('profile')
            ]
        ]);
    }
    public function MyOrders()
    {
        $user = Auth::user();
        $orders = $user->orders()->with("items.product.images")->latest()->get();
        return Inertia::render('profile/MyOrders', [
            "auth" => [
                "user" => $user,
                "orders" => $orders
            ],
        ]);
    }
}
