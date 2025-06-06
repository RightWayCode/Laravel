<?php

use App\Http\Controllers\Auth\OTPController;
use App\Http\Controllers\Route\RouteController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/send-otp', [OTPController::class, 'send'])->name('login.send');
    Route::post('/verify-otp', [OTPController::class, 'verify'])->name("login.verify");
    Route::get('/login', [RouteController::class, 'login'])->name('login');
    Route::get('/login-with-password', [RouteController::class, 'LoginWithPassword']);
});