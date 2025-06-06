<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Razorpay\Api\Api;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function pay(Request $request)
    {
        $order = $request->order;

        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));
        // dd($request->amount);
        $query = $api->order->create([
            'receipt' => 'rcptid_11',
            'amount' => $order['total_amount'] * 100, // amount in paise (₹100 = 10000)
            'currency' => 'INR',
        ]);

        $orderCreated = Auth::user()->orders()->create([
            "purchased_id" => $query['id'],
            "total_amount" => $order['total_amount'],
            "status" => "Pending"
        ]);
        if ($orderCreated) {
            foreach ($order['products'] as $item) {
                $orderCreated->items()->create([
                    "product_id" => $item['id'],
                    "quantity" => $item['quantity'],
                    "product_url" => $item['product_url'],
                    "price" => $item['price'],
                    "total" => $item['total']
                ]);
            }
        }
        return Inertia::render('payment/Payment', [
            "order" => [
                "order_id" => $query['id'],
                "razorpay_key" => config('services.razorpay.key'),
                "amount" => $order['total_amount']
            ],
            "auth" => [
                "user" => auth()->user()->load('profile')
            ]
        ]);
    }

    public function verify(Request $request)
    {
        // dd($requ/est);
        $razorpay_payment_id = $request->razorpay_payment_id;
        $order_id = $request->order_id;
        $order = Auth::user()->orders()->where("purchased_id", $order_id)->first();
        if ($order) {
            $order->update([
                "payment_id" => $razorpay_payment_id,
                "status" => "Paid"
            ]);
        }
        return redirect()->route('payment.verified', [$order]);
    }
}
