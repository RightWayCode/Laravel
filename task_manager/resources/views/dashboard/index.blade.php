@extends('layouts.dashboard.layout')

@section('title', 'Dashboard Home')
@php
    $completed = $counts['completed'];
    $all = $counts['all'];
    $percentage = $all > 0 ? ($completed / $all) * 100 : 0;
@endphp
@section('content')
    <div class="p-6 space-y-8">
        {{-- Header Section --}}
        <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-blue-700">Welcome Back 👋</h1>
            <span class="text-sm text-gray-500">Today: {{ now()->format('F j, Y') }}</span>
        </div>

        {{-- Stats Overview --}}
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-blue-100 p-4 rounded-xl shadow hover:shadow-md transition">
                <p class="text-lg font-semibold text-blue-700">Total Tasks</p>
                <p class="text-3xl font-bold">{{ $counts['all'] }}</p>
            </div>
            <div class="bg-green-100 p-4 rounded-xl shadow hover:shadow-md transition">
                <p class="text-lg font-semibold text-green-700">Completed</p>
                <p class="text-3xl font-bold">{{$counts["completed"]}}</p>
            </div>
            <div class="bg-yellow-100 p-4 rounded-xl shadow hover:shadow-md transition">
                <p class="text-lg font-semibold text-yellow-700">Pending</p>
                <p class="text-3xl font-bold">{{ $counts["pending"]}}</p>
            </div>
        </div>

        {{-- Progress Bar --}}
        <div class="mt-4">
            <h2 class="text-lg font-semibold mb-2 text-gray-800">Overall Progress</h2>
            <div class="w-full bg-gray-200 h-5 rounded-full overflow-hidden shadow-inner">
                <div class="bg-blue-600 h-5 rounded-full transition-all duration-500 ease-in-out" style="width: {{$percentage}}%"></div>
            </div>
            <p class="text-sm text-gray-600 mt-1">You're {{$percentage}}% through your task list today 🎯</p>
        </div>

        {{-- Recent Tasks --}}
        <section class="mt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Recent Tasks</h2>
            <ul class="space-y-3">
                @foreach ($tasks as $task)
                    <li class="bg-white p-4 rounded shadow flex justify-between items-center">
                        <span>{{$task->title}}</span>
                        <span
                            class="text-xs px-2 py-1 rounded bg-green-200 text-green-800">{{ $task->is_completed ? "Completed" : "Pending" }}</span>
                    </li>
                @endforeach
                {{-- <li class="bg-white p-4 rounded shadow flex justify-between items-center">
                    <span>Create Redux slice</span>
                    <span class="text-xs px-2 py-1 rounded bg-yellow-200 text-yellow-800">Pending</span>
                </li> --}}
            </ul>
        </section>
    </div>
@endsection