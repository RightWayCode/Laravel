<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Twilio\Rest\Client;

class OTPController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'phone' => 'required'
        ]);
        // dd(Auth::user()->phone);
        // dd([
        //     "type"=> "sid",
        //     "env"=> config('services.twilio.token')
        // ]);
        $twilio = new Client(config('services.twilio.sid'), config('services.twilio.token'));

        $verification = $twilio->verify->v2->services(config('services.twilio.verify_sid'))
            ->verifications
            ->create($request->phone, 'sms'); // Must be in +91xxxxxxxxxx format

        if ($verification->status === 'pending') {
            return redirect()->back();
        } else {
            return redirect()->back()->withErrors(["status"=>"Failed"]);
        }
    }

    public function verify(Request $request)
    {
        $request->validate([
            'phone' => 'required',
            'code' => 'required'
        ]);
        // dd($request->code);

        $twilio = new Client(config('services.twilio.sid'), config('services.twilio.token'));

        $verification_check = $twilio->verify->v2->services(config('services.twilio.verify_sid'))
            ->verificationChecks
            ->create([
                'to' => $request->phone,
                'code' => $request->code
            ]);

        if ($verification_check->status === 'approved') {
            $user= User::firstOrCreate([
                "phone"=>$request->phone
            ]);
            Auth::login($user,true);
            
            return redirect()->route('dashboard');
        }

        return redirect()->back()->withErrors(['status'=>"failed"]);
    }
}
