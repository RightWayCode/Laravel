<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\TaskController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Page\PageController;




Route::group(['middleware' => "guest"], function () {
    Route::get('/', [PageController::class, 'index'])->name('index');
    Route::get('/login', [PageController::class, 'login'])->name('login')->middleware('redirectRoute');
    Route::get('/register', [PageController::class, 'register'])->name('register')->middleware('redirectRoute');
    Route::get('/forget-password', [PageController::class, 'forgetPassword'])->name('password.forget');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');
    // Reset password form (from email link)
    Route::post('/forget-password', [AuthController::class, 'resetLinkSent'])->name('password.email');
    Route::get('/reset-password/{token}', [PageController::class,'resetPassword'])->name('password.reset');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('guest')->name('password.update');
});

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/tasks', [DashboardController::class, 'tasks'])->name('tasks.index');
    Route::get("completed-tasks", [DashboardController::class, 'completedTasks'])->name('tasks.completed');
    Route::get("show-tasks", [TaskController::class, 'taskAll']);
    
    Route::put("task-completed/{id}", [TaskController::class, 'taskCompleted'])->name('task.completed');
    Route::post("/tasks", [TaskController::class, 'taskCreate'])->name('task.create');
    Route::put("task-pending/{id}", [TaskController::class, 'taskPending'])->name('task.pending');
    Route::get("tasks-edit/{id}", [DashboardController::class, 'taskEdit'])->name('task.edit');
    Route::put("tasks-update/{id}", [TaskController::class, 'taskEdit'])->name('task.update');
    Route::get("tasks-undo/{id}", [TaskController::class, 'taskUndo'])->name('task.undo');
    Route::delete("task-delete/{id}", [TaskController::class, 'taskDelete'])->name('task.delete');
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('/email/verify', [PageController::class, 'verifyEmail'])->name('verification.notice');
    Route::get('/email/verification-notification', [AuthController::class, 'resendVerificationEmail'])->name('verification.send');
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
