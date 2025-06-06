import { Link } from "@inertiajs/react";
import { CategoryBanner } from "@/components/CategoryBanner";
import PromoBanner from "@/components/PromoBanner";
import GuestLayout from "@/Layouts/Front/Layout";

const Home = () => {
    return (
        <GuestLayout>
            <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-100 via-white to-blue-100">
                <PromoBanner />
                <section className="relative py-24 overflow-hidden text-white bg-gradient-to-r from-indigo-600 to-purple-600">
                    {/* Optional background image */}
                    <div className="absolute inset-0 bg-[url('/images/banner.jpg')] bg-cover bg-center opacity-20 z-0"></div>

                    <div className="container relative z-10 max-w-3xl px-6 mx-auto text-center">
                        <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-indigo-600 bg-white rounded-full shadow-md">
                            New Arrival
                        </span>
                        <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                            Spring Collection 2025
                        </h1>
                        <p className="mb-8 text-lg text-gray-200 sm:text-xl">
                            Feel the fashion, wear the comfort
                        </p>
                        <Link
                            href="/spring"
                            className="inline-block px-8 py-3 font-semibold text-indigo-700 transition duration-300 bg-white rounded-full shadow-lg hover:bg-gray-900 hover:text-white"
                        >
                            Shop Now
                        </Link>
                    </div>
                </section>
                <CategoryBanner />
                <section className="px-4 py-6 bg-gray-50">
                    <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
                        <div>
                            <p className="text-lg font-semibold">🚚 Free Shipping</p>
                            <p className="text-sm text-gray-600">On all orders above $50</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">💳 Secure Checkout</p>
                            <p className="text-sm text-gray-600">Safe and encrypted payment</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">📞 24/7 Support</p>
                            <p className="text-sm text-gray-600">We’re here to help anytime</p>
                        </div>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
};

export default Home;