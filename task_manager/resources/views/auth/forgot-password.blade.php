@extends('layouts.guest.layout')

@section('content')
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
        <div class="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/60">
            <h2 class="text-2xl font-bold text-center text-blue-700 mb-4">Forgot Password</h2>

            <p class="text-sm text-gray-600 mb-6 text-center">
                Enter your email address and we’ll send you a link to reset your password.
            </p>

            @if (session('status'))
                <div class="bg-green-100 text-green-800 px-4 py-3 rounded mb-4 text-sm">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('password.email') }}">
                @csrf

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus
                        class="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    @error('email')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                    Send Password Reset Link
                </button>
            </form>

            <p class="mt-6 text-center text-sm text-gray-600">
                Remember your password?
                <a href="{{ route('login') }}" class="text-blue-600 hover:underline">Back to Login</a>
            </p>
        </div>
    </div>
@endsection