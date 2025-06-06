<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(Request $request)
    {
        return view('pages.index', [
            'title' => 'Page Title',
            'description' => 'Page Description',
        ]);
    }

    public function login(){
        return view("auth.login", [
            'title' => 'Login',
            'description' => 'Login to your account',
        ]);
    }
    public function register(){
        return view("auth.register", [
            'title' => 'Register',
            'description' => 'Register to your account',
        ]);
    }
    public function forgetPassword(){
        return view('auth.forgot-password');
    }

    public function verifyEmail(Request $request){
        return view('auth.verify-email', [
            'title' => 'Verify Email',
            'description' => 'Verify your email address',
        ]);
    }

    public function resetPassword(Request $request,string $token){
        return view('auth.reset-password', ['token' => $token,"email" => request('email')]);
    }
}
