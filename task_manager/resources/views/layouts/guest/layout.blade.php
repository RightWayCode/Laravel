<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>TaskManager</title>
    @vite('resources/css/app.css') {{-- If you're using Vite for Tailwind --}}
</head>

<body class="min-h-screen flex flex-col">

    {{-- Header --}}
    @include("layouts.guest.header")

    {{-- Main Content --}}
    <main>
        @yield('content')
    </main>

    {{-- Footer --}}
    @include('layouts.guest.footer')

</body>

</html>