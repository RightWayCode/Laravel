<?php
use App\Http\Controllers\Shop\CartController;
use App\Http\Controllers\Shop\FavoriteController;
use App\Http\Controllers\Shop\ProductController;
use Illuminate\Support\Facades\Route;

// This is carts Section
// Route::get('/cart', fn() => redirect()->route('shop.cart'));
Route::get('/carts', [CartController::class,'cart'])->name('shop.cart');

// This is favorites section
Route::get('/favorites', [FavoriteController::class,'favorite']);

// This is products section
Route::get('/{category}/{brand}/{title}/{id}/buy', [ProductController::class,'product_about'])->name('product.show');
Route::get('/{search}', [ProductController::class,'products'])->name("shop");
