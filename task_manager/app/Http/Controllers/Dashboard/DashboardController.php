<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // You can add logic here to fetch data for the dashboard
        $tasks = $request->user()->tasks()->latest()->take(5)->get();
        $allTasks = $request->user()->tasks()->count();
        $completedTasks = $request->user()->tasks()->where('is_completed', true)->count();
        $pendingTasks = $request->user()->tasks()->where('is_completed', false)->count();
        // $tasks = request()->user()->with('tasks')->get();
        return view('dashboard.index', [
            'tasks' => $tasks,
            'counts' => [
                'all' => $allTasks,
                'completed' => $completedTasks,
                'pending' => $pendingTasks,
            ],
            "user" => [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ]
        ]);
    }

    public function taskEdit(Request $request, string $id)
    {
        $task = $request->user()->tasks()->find($id);
        if (!$task) {
            return redirect()->back()->with('error', 'Task not found!');
        }
        return view('dashboard.task-edit', compact('task'));
    }

    public function tasks(Request $request)
    {
        $tasks = $request->user()->tasks()->where("is_completed",false)->latest()->get();
        // You can add logic here to fetch tasks data
        return view('dashboard.tasks',["tasks" => $tasks]);
    }
    public function completedTasks(){
        $tasks = request()->user()->tasks()->where("is_completed",true)->latest()->get();
        // You can add logic here to fetch completed tasks data
        return view('dashboard.completed',["tasks" => $tasks]);
    }
}
