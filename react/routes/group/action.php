<?php
use App\Http\Controllers\Auth\PaymentController;
use App\Http\Controllers\Auth\ProfileUpdateController;
use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;


Route::middleware("auth")->group(function () {
    Route::prefix('/my')->group(function () {
        Route::post("/profile", [ProfileUpdateController::class, "update"])->name('profile.update');
        Route::get('/logout', [LogoutController::class, 'logout'])->name('logout');
    });
    Route::post('/pay', [PaymentController::class, 'pay'])->name("payment.pay");
    Route::post('/payment-verified',[PaymentController::class,'verify'])->name('payment.verified');
});
// 5267 3181 8797 5449	