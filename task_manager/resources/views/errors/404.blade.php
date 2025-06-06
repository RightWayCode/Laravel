@extends('layouts.guest.layout')
@section('title', '404 - Page Not Found')

@section('content')
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-yellow-500 mb-3" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L2.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 class="text-3xl font-bold mb-1">404 - Page Not Found</h1>
        <p class="text-gray-600">The page you're looking for doesn't exist.</p>
        <a href="{{ url('/') }}" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Back to
            Home</a>
    </div>
@endsection