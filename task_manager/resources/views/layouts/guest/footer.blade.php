<footer class="bg-gray-100 py-6 text-center text-sm text-gray-600">
    <p>&copy; {{ date('Y') }} TaskManager. All rights reserved.</p>
    <div class="mt-2 space-x-4">
        <a href="{{ url('/') }}" class="hover:text-blue-600 transition-colors">Home</a>
        <a href="{{ route('login') }}" class="hover:text-blue-600 transition-colors">Login</a>
        <a href="{{ route('register') }}" class="hover:text-blue-600 transition-colors">Register</a>
    </div>
</footer>