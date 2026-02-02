"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        setLoading(true);
        const query = new URLSearchParams({
            search,
            status: filter,
        }).toString();
        const res = await fetch(`/api/v1/tasks?${query}`);
        const data = await res.json();
        setTasks(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, [search, filter]);

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const res = await fetch("/api/v1/tasks", {
            method: "POST",
            body: JSON.stringify({ title: newTask }),
        });

        const data = await res.json();

        if (res.ok) {
            setNewTask("");
            fetchTasks();
            toast.success("Task created successfully!");
        } else {
            toast.error(data.error || "Failed to create task");
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const nextStatus =
            currentStatus === "PENDING" ? "COMPLETED" : "PENDING";
        await fetch(`/api/v1/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: nextStatus }),
        });
        fetchTasks();
    };

    const deleteTask = async (id: string) => {
        await fetch(`/api/v1/tasks/${id}`, { method: "DELETE" });
        fetchTasks();
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h2 className="text-2xl font-bold text-slate-900">
                    Manage Tasks
                </h2>
                <p className="text-slate-500 text-sm">
                    Organize your daily workflow efficiently.
                </p>
            </header>

            {/* Control Panel */}
            <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
                <form
                    onSubmit={addTask}
                    className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-200">
                        Create
                    </button>
                </form>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search title..."
                            className="w-full pl-4 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All Tasks</option>
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
            </section>

            {/* List Area */}
            <div className="space-y-3">
                {loading ? (
                    <div className="text-center py-12 text-slate-400">
                        Loading your workspace...
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-200 text-slate-500">
                        No tasks found. Start by creating one above!
                    </div>
                ) : (
                    tasks.map((task: any) => (
                        <div
                            key={task.id}
                            className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    checked={task.status === "COMPLETED"}
                                    onChange={() =>
                                        toggleStatus(task.id, task.status)
                                    }
                                />
                                <span
                                    className={`font-medium transition-all ${task.status === "COMPLETED" ? "line-through text-slate-400" : "text-slate-700"}`}>
                                    {task.title}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="opacity-0 cursor-pointer group-hover:opacity-100 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-600 transition-all">
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
