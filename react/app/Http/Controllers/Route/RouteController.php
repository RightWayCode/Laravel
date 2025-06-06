<?php

namespace App\Http\Controllers\Route;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RouteController extends Controller
{
    public function home(){
        return Inertia::render('Home');
    }
    public function about() {}

    public function contact() {}
    public function LoginWithPassword() {
        return Inertia::render('auth/LoginWithPassword');
    }
    public function login() {
        return Inertia::render('auth/Login');
    }
}
