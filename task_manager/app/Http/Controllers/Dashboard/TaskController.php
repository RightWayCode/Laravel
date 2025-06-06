<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class TaskController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->latest()->get();
        $allTasks = $request->user()->tasks()->where('is_completed', true)->count();
        $completedTasks = $request->user()->tasks()->where('is_completed', true)->count();
        $pendingTasks = $request->user()->tasks()->where('is_completed', false)->count();
        // $tasks = request()->user()->with('tasks')->get();
        return response()->json([
            'tasks' => $tasks,
            'counts' => [
                'all' => $allTasks,
                'completed' => $completedTasks,
                'pending' => $pendingTasks,
            ],
            "user" => [
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ]
        ]);
    }

    public function newTask(Request $request){
        $credentials = $request->validate([
            'title' => 'required|string',
            'is_completed' => 'required|in:pending,completed',
        ]);
        $tasks = $request->user()->tasks()->create($credentials);
        return redirect()->back()->with('success', 'Task created successfully!');
    }

    public function taskCompleted(Request $request, string $id){
        $request->user()->tasks()->find($id)->Update([
            'is_completed' => true,
        ]);
        return redirect()->back()->with('success', 'Task completed successfully!');
    }

    public function taskUndo(Request $request, string $id){
        $request->user()->tasks()->find($id)->Update([
            'is_completed' => false,
        ]);
        return redirect()->back()->with('success', 'Task undone successfully!');
    }

    public function taskAll(){
        // $tasks = request()->user()->with('tasks')->get();
        $tasks = request()->user()->tasks()->where('is_completed', false)->get();
        return response()->json([
            'tasks' => $tasks
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function taskEdit(Request $request, string $id)
    {
        $task = $request->user()->tasks()->find($id);
        if (!$task) {
            return redirect()->back()->with('error', 'Task not found!');
        }
        $task->update([
            'title' => $request->input('title')
        ]);
        // dd($task->title);
        return redirect()->route('tasks.index')->with('success', 'Task updated successfully!');
    }

    public function taskCreate(Request $request)
    {
        $request->validate([
            'task' => 'required|string|max:255',
        ]);
        $task = $request->user()->tasks()->create([
            'title' => $request->input('task'),
            'is_completed' => false
        ]);
        if (!$task) {
            return redirect()->back()->with('error', 'Task not found!');
        }
        // dd($task->title);
        return redirect()->route('tasks.index')->with('success', 'Task updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function taskDelete(Request $request,string $id)
    {
        $task = $request->user()->tasks()->find($id);
        if ($task) {
            $task->delete();
            return redirect()->back()->with('success', 'Task deleted successfully!');
        }
        return redirect()->back()->with('error', 'Task not found!');
    }

}
