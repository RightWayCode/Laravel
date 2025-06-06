@extends('layouts.dashboard.layout')

@section('title', 'Your Tasks')


@section('content')
<div class="p-6 space-y-6 min-h-screen">
    <h1 class="text-2xl font-bold">Update Task</h1>
    <form action="{{ route('task.update', $task->id) }}" method="POST" class="space-y-4">
        @csrf
        @method('PUT')
        <input type="text" name="title" value="{{ $task->title }}" class="flex-1 p-2 border rounded" required />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
</div>

@endsection