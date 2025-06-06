<header class="bg-white z-10 shadow-md px-6 py-4 flex justify-between items-center">
    <h1 class="text-xl font-bold text-blue-600">Dashboard</h1>
    <nav class="space-x-6">
        <a href="{{ route('dashboard') }}" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Dashboard
        </a>
        <a href="{{ route('tasks.index') }}" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Tasks
        </a>
        <a href="{{ route('tasks.completed') }}"
            class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Completed
        </a>
        <form method="POST" action="{{ route('logout') }}" class="inline">
            @csrf
            <button type="submit" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Log Out
            </button>
        </form>
    </nav>
</header>