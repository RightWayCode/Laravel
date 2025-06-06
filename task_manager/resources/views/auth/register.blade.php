@extends('layouts.guest.layout')

@section('content')
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
        <div class="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md border border-white/60">
            <h2 class="text-2xl font-bold text-center text-purple-700 mb-6">Create an Account</h2>

            <form method="POST" action="{{ route('register.post') }}" class="space-y-5">
                @csrf

                <div class="relative">
                    <input type="text" name="name" id="name" value="{{old("name")}}" placeholder=" " required
                        class="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <label for="name"
                        class="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600">
                        Full Name
                    </label>
                    @error('name')
                        <p class="text-sm text-red-500 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="relative">
                    <input type="email" name="email" value="{{old("email")}}" id="email" placeholder=" " required
                        class="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <label for="email"
                        class="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600">
                        Email Address
                    </label>
                    @error('email')
                        <p class="text-sm text-red-500 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="relative">
                    <input type="password" name="password" value="{{old('password')}}" id="password" placeholder=" " required
                        class="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <label for="password"
                        class="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600">
                        Password
                    </label>
                    @error('password')
                        <p class="text-sm text-red-500 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="relative">
                    <input type="password" name="password_confirmation" value="{{old("password_confirmation")}}" id="password_confirmation" placeholder=" " required
                        class="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    <label for="password_confirmation"
                        class="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600">
                        Confirm Password
                    </label>
                    @error('password')
                        <p class="text-sm text-red-500 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit"
                    class="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition">
                    Register
                </button>
            </form>

            <p class="mt-6 text-center text-sm text-gray-600">
                Already have an account?
                <a href="{{ route('login') }}" class="text-purple-600 hover:underline">Login here</a>
            </p>
        </div>
    </div>
@endsection