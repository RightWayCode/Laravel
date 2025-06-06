<?php

use App\Http\Controllers\Route\RouteController;
use App\Http\Controllers\Route\UserController;
use App\Http\Controllers\Shop\CartController;
use App\Http\Controllers\Shop\FavoriteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [RouteController::class, "home"])->name("home");

Route::middleware('auth')->prefix('/my')->group(function () {
    Route::get('/dashboard', [UserController::class, 'Overview'])->name('Overview');
    Route::get('/profile', [UserController::class, 'profile'])->name('profile');
    Route::get('/orders', [UserController::class, 'MyOrders'])->name('orders');
    
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::delete('/cart/{productId}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites/toggle/{productId}', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
    Route::post('/favorites/move/', [FavoriteController::class, 'moveCart'])->name('favorites.move');
});
