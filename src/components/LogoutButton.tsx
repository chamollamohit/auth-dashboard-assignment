"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/v1/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm cursor-pointer font-medium text-red-600 hover:text-red-800">
            Logout
        </button>
    );
}
