"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User, ShieldCheck } from "lucide-react";

export default function ProfileSettings() {
    const [user, setUser] = useState({ name: "", email: "" });
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/v1/me")
            .then((res) => res.json())
            .then((data) => {
                setUser({ name: data.name, email: data.email });
            });
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        const res = await fetch("/api/v1/me", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: user.name }),
        });

        if (res.ok) {
            toast.success("Identity updated");
            router.refresh();
        } else {
            toast.error("Update failed");
        }
        setIsUpdating(false);
    };

    return (
        <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="bg-[#121212] border border-zinc-800/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-[#D9FF41] text-[10px] font-bold uppercase tracking-tighter mb-4">
                                <ShieldCheck size={12} />
                                Verified Account
                            </div>
                            <h3 className="text-3xl font-bold text-white tracking-tight">
                                Account Settings
                            </h3>
                            <p className="text-zinc-500 text-sm mt-1">
                                Manage your public identity and credentials.
                            </p>
                        </div>

                        <form
                            onSubmit={handleUpdate}
                            className="space-y-6">
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="text"
                                        value={user.email}
                                        disabled
                                        className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-500 cursor-not-allowed text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">
                                        Display Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={user.name}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:border-[#D9FF41] focus:ring-1 focus:ring-[#D9FF41] outline-none transition-all text-sm"
                                            required
                                        />
                                        <User
                                            className="absolute right-5 top-4 text-zinc-700"
                                            size={18}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="group relative px-4 py-3 bg-white text-black font-bold rounded-2xl hover:bg-[#D9FF41] transition-all active:scale-95 disabled:opacity-50 overflow-hidden">
                                <span className="relative z-10">
                                    {isUpdating
                                        ? "Syncing..."
                                        : "Update Identity"}
                                </span>
                                <div className="absolute inset-0 bg-[#D9FF41] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
