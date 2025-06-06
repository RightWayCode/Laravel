@extends('layouts.guest.layout')

@section('content')
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
        <div class="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/60">
            <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

            <form method="POST" action="{{ route('login.post') }}">
                @csrf

                {{-- Email Input --}}
                <div class="space-y-4">
                    <div class="relative">
                        <input type="email" name="email" id="email" value="{{ old('email') }}" placeholder=" "
                            required
                            class="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <label for="email"
                            class="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600">
                            Email Address
                        </label>
                        @error('email')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Password Input --}}
                    <div class="relative">
                        <input type="password" name="password" id="password" value="{{ old('password') }}" placeholder=" "
                            required
                            class="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <label for="password"
                            class="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600">
                            Password
                        </label>
                        @error('password')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                {{-- Remember Me & Forgot Password --}}
                <div class="flex items-center justify-between mt-4 mb-6 text-sm">
                    <label class="flex items-center gap-2 text-gray-600">
                        <input type="checkbox" name="remember" id="remember" class="accent-blue-600" />
                        <span>Remember Me</span>
                    </label>

                    <a href="{{ route('password.forget') }}" class="text-blue-600 hover:underline">
                        Forgot Password?
                    </a>
                </div>

                {{-- Submit Button --}}
                <button type="submit"
                    class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                    Login
                </button>
            </form>

            {{-- Register Link --}}
            <p class="mt-6 text-center text-sm text-gray-600">
                Don’t have an account?
                <a href="{{ route('register') }}" class="text-blue-600 hover:underline">
                    Register here
                </a>
            </p>
        </div>
    </div>
@endsection
