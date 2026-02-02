"use client";
import { CheckIcon, TrashIcon } from "lucide-react";
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
        <div className="space-y-4 animate-in fade-in duration-700">
            <header className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                    Your Workspace
                </h2>
                <p className="text-zinc-500 font-medium">
                    Focus on what matters today.
                </p>
            </header>

            <section className="bg-[#121212] border border-zinc-800 p-6 rounded-[2rem] shadow-2xl space-y-6">
                <form
                    onSubmit={addTask}
                    className="relative">
                    <input
                        type="text"
                        placeholder="What's the next big move?"
                        className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:border-[#D9FF41] focus:ring-1 focus:ring-[#D9FF41] outline-none transition-all placeholder:text-zinc-700"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-[#D9FF41] text-black px-6 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all">
                        Create
                    </button>
                </form>

                <div className="flex gap-3">
                    <input
                        className="flex-1 bg-transparent border border-zinc-800 rounded-xl px-4 py-2 text-sm focus:border-zinc-500 outline-none"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="bg-[#1A1A1A] border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-400 outline-none"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Done</option>
                    </select>
                </div>
            </section>

            <div className="grid gap-4">
                {tasks.map((task: any) => (
                    <div
                        key={task.id}
                        className="group bg-[#121212]/50 border border-zinc-800/50 p-5 rounded-2xl flex items-center justify-between hover:bg-[#121212] hover:border-zinc-700 transition-all">
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() =>
                                    toggleStatus(task.id, task.status)
                                }
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                    task.status === "COMPLETED"
                                        ? "bg-[#D9FF41] border-[#D9FF41]"
                                        : "border-zinc-700 hover:border-zinc-500"
                                }`}>
                                {task.status === "COMPLETED" && (
                                    <CheckIcon
                                        size={14}
                                        className="text-black font-bold"
                                    />
                                )}
                            </button>
                            <span
                                className={`text-lg font-medium ${task.status === "COMPLETED" ? "text-zinc-600 line-through" : "text-zinc-200"}`}>
                                {task.title}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-400 transition-all">
                            <TrashIcon size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
