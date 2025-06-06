<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\TwilioService;
use Illuminate\Http\Request;
use Twilio\Rest\Client;

class SmsController extends Controller
{
    public function sendOtp()
    {
        // $request->validate([
        //     'phone' => 'required'
        // ]);

        $twilio = new Client(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));

        $verification = $twilio->verify->v2->services(env('TWILIO_VERIFY_SID'))
            ->verifications
            ->create("+919643080587", 'sms'); // phone should be like +919643080587
        return response()->json([
            'status' => $verification->status,
            'message' => 'OTP sent!'
        ]);
    }
}
