<header class="bg-white fixed top-0 left-0 right-0 z-10 shadow-md px-6 py-4 flex justify-between items-center">
    <h1 class="text-xl font-bold text-blue-600">TaskManager</h1>
    <nav class="space-x-6">
        <a href="{{ route('index') }}" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Guest
        </a>
        <a href="{{ route('login') }}" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Login
        </a>
        <a href="{{ route('register') }}" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Register
        </a>
    </nav>
</header>