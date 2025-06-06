@extends('layouts.guest.layout')

@section('content')
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
        <div class="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/60">
            <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Verify Your Email Address</h2>

            @if (session('status') === 'verification-link-sent')
                <div class="mb-4 text-green-600 text-sm text-center">
                    A new verification link has been sent to your email address.
                </div>
            @endif

            <p class="text-gray-700 mb-4 text-center">
                Before proceeding, please check your email for a verification link.
                If you didn't receive the email, click below to request another.
            </p>

            <form method="POST" action="{{ route('verification.send') }}" class="text-center">
                @csrf
                <button type="submit"
                    class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                    Resend Verification Email
                </button>
            </form>

            <form method="POST" action="{{ route('logout') }}" class="mt-4 text-center">
                @csrf
                <button type="submit"
                    class="text-sm text-red-500 hover:underline">
                    Logout
                </button>
            </form>
        </div>
    </div>
@endsection
