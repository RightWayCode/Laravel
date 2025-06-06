<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Dashboard')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js']) {{-- Tailwind + JS --}}
</head>

<body class="bg-gray-50 text-gray-900">

    {{-- Header --}}
    @include('layouts.dashboard.header')

    {{-- Sidebar --}}

    {{-- Main Content --}}
    <main>
        @yield('content')
    </main>

    {{-- Footer (optional) --}}
    {{-- @include('footer') --}}

</body>

</html>