<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileUpdateController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            "name" => "required|min:6",
            "email" => "required|unique:user_profiles,email",
            "birthdate" => "date",
            "address" => "required",
            "city" => "required",
            "state" => "required",
            "country" => "required",
        ]);
        $user = Auth::user();
        if ($user) {
            $user->profile()->updateOrCreate([], [
                'name' => $request->name,
                'email' => $request->email,
                'birthdate' => $request->birthdate,
                'avatar' => $request->avatar,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'country' => $request->country,
            ]);
        }
        return redirect()->back();
    }
}
