"use client";
import { CheckIcon, ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = async () => {
        setLoading(true);

        const res = await fetch(
            `/api/v1/tasks?page=${page}&limit=5&search=${search}&status=${filter}`,
        );
        const data = await res.json();
        if (res.ok) {
            setTasks(data.tasks);
            setTotalPages(data.pagination.totalPages);
            setLoading(false);
        } else {
            toast.error(data.error || "Failed to create task");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, search, filter]);

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
            setSearch("");
            setFilter("");
            fetchTasks();
            toast.success("Task created successfully!");
        } else {
            toast.error(data.error || "Failed to create task");
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const nextStatus =
            currentStatus === "PENDING" ? "COMPLETED" : "PENDING";
        const res = await fetch(`/api/v1/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: nextStatus }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success("Task status updated");
        } else {
            toast.error(data.error || "Failed to update status");
        }
        fetchTasks();
    };

    const deleteTask = async (id: string) => {
        const res = await fetch(`/api/v1/tasks/${id}`, { method: "DELETE" });

        const data = await res.json();
        if (res.ok) {
            toast.success("Task deleted");
        } else {
            toast.error(data.error || "Failed to delete task");
        }

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
                        id="taskInput"
                        placeholder="What's the next big move?"
                        className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:border-[#D9FF41] focus:ring-1 focus:ring-[#D9FF41] outline-none transition-all placeholder:text-zinc-700"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-[#D9FF41] text-black px-6 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all">
                        Create
                    </button>
                </form>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    <div className="relative w-full sm:flex-1">
                        <input
                            className="flex-1 w-full bg-transparent border border-zinc-800 rounded-xl px-4 py-2 text-sm focus:border-zinc-500 outline-none"
                            placeholder="Search task..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-auto">
                        <select
                            className="bg-[#1A1A1A] border w-full border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-400 outline-none"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}>
                            <option value="">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="COMPLETED">Done</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className="grid gap-4">
                {loading ? (
                    [1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-20 bg-[#121212]/50 border border-zinc-800/50 rounded-2xl animate-pulse flex items-center px-6 gap-4">
                            <div className="w-6 h-6 rounded-full bg-zinc-800" />
                            <div className="h-4 w-1/3 bg-zinc-800 rounded" />
                        </div>
                    ))
                ) : tasks.length > 0 ? (
                    tasks.map((task: any) => (
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
                    ))
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800/50 rounded-[2.5rem] bg-[#121212]/20">
                        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-300">
                            No tasks found
                        </h3>
                        <p className="text-zinc-500 text-sm mt-1 mb-6">
                            Your workspace is empty. Start by creating a task.
                        </p>
                        <button
                            onClick={() =>
                                document.getElementById("taskInput")?.focus()
                            }
                            className="px-6 py-2 bg-zinc-900 border border-zinc-700 rounded-full text-zinc-300 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                            + Create First Task
                        </button>
                    </div>
                )}
            </div>
            {tasks.length > 0 && (
                <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-zinc-800/50">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 disabled:opacity-20 hover:text-white transition-all">
                        <ChevronLeft size={20} />
                    </button>

                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        Page <span className="text-[#D9FF41]">{page}</span> of{" "}
                        {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 disabled:opacity-20 hover:text-white transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
