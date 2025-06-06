@extends("layouts.guest.layout")

@section('content')
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
        <div
            class="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-white/60">
            <h1 class="text-3xl font-extrabold text-blue-700 mb-3">Welcome 👋</h1>
            <p class="text-gray-600 mb-6 text-sm">
                Join us to track your tasks, boost productivity, and stay organized. Login or register below!
            </p>

            <div class="flex flex-col sm:flex-row justify-center gap-4">
                <a href="{{ route('login') }}"
                    class="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow transition-all">
                    {{-- Lucide Icon placeholder --}}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Login
                </a>

                <a href="{{ route('register') }}"
                    class="flex items-center justify-center gap-2 px-5 py-3 bg-white text-blue-700 border border-blue-600 rounded-xl hover:bg-blue-50 shadow transition-all">
                    {{-- Lucide Icon placeholder --}}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Register
                </a>
            </div>

            <p class="mt-6 text-xs text-gray-400">By continuing, you agree to our Terms and Privacy Policy.</p>
        </div>
    </div>
@endsection