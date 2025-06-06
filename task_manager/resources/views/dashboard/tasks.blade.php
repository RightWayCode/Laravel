@extends('layouts.dashboard.layout')

@section('title', 'Your Tasks')

@section('content')
    <div class="p-6 space-y-6">
        <h1 class="text-2xl font-bold">Your Tasks</h1>

        <form action="{{ route("task.create") }}" method="POST" class="flex gap-2">
            @csrf
            <input type="text" name="task" placeholder="New task..." class="flex-1 p-2 border rounded" required />
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </form>

        <ul class="space-y-3">
            @foreach ($tasks as $task)
                <li class="bg-white p-4 rounded shadow flex justify-between items-center">
                    <span>{{ $task->title }}</span>
                    <div class="space-x-2">
                        <form action="{{ route('task.completed', $task->id) }}" method="POST" class="inline">
                            @csrf
                            @method('PUT')
                            <button type="submit" class="cursor-pointer text-green-600">✓</button>
                        </form>
                        <a href="{{ route('task.edit', $task->id) }}" class="cursor-pointer text-yellow-600">✎</a>
                        <form action="{{ route('task.delete', $task->id) }}" method="POST" class="inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="cursor-pointer text-red-600">🗑</button>
                        </form>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>
@endsection