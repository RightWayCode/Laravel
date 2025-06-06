@extends('layouts.dashboard.layout')

@section('title', 'Completed Tasks')

@section('content')
    <div class="p-6 space-y-6">
        <h1 class="text-2xl font-bold">Completed Tasks</h1>

        <ul class="space-y-3">
            @foreach ($tasks as $task)
                <li class="bg-green-50 p-4 rounded shadow flex justify-between items-center">
                    <span class="line-through">{{ $task->title }}</span>
                    <a href="{{ route('task.undo', $task->id) }}" class="text-blue-600 hover:underline">↩ Undo</a>
                </li>
            @endforeach
            {{-- Repeat other tasks dynamically --}}
            {{-- @foreach ($completedTasks as $task)
            <li>...</li>
            @endforeach --}}
        </ul>
    </div>
@endsection