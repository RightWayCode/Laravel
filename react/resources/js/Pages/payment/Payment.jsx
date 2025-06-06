import { router, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

const Payment = ({ order }) => {
    const { auth } = usePage().props;

    useEffect(() => {
        // Dynamically load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
            const options = {
                key: order.razorpay_key,
                amount: order.amount * 100, // in paise
                currency: 'INR',
                name: "Shopify",
                description: `Order #${order.order_id}`,
                order_id: order.order_id,
                handler: function (response) {
                    router.post(route('payment.verified'), {
                        order_id: order.order_id,
                        razorpay_payment_id: response.razorpay_payment_id
                    });
                },
                prefill: {
                    name: auth.user?.profile?.name,
                    email: auth.user?.profile?.email,
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        };

        script.onerror = () => {
            console.error("Razorpay SDK failed to load. Please check your connection or try again.");
        };

        document.body.appendChild(script);
    }, []);

    return null; // We’re not rendering anything visibly
};

export default Payment;
