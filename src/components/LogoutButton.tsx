"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch("/api/v1/auth/logout", { method: "POST" });
        if (res.ok) {
            toast.success("Logged out!");
            router.refresh();
            router.push("/login");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-700 transition-all active:scale-95">
            <span className="text-xs font-bold uppercase tracking-widest">
                Sign Out
            </span>
            <LogOut
                size={16}
                className="group-hover:text-red-400 transition-colors"
            />
        </button>
    );
}
