"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ProfileSettings() {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/v1/me");
                const data = await res.json();
                if (res.ok) setUser({ name: data.name, email: data.email });
            } catch (err) {
                toast.error("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const res = await fetch("/api/v1/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: user.name }),
            });
            if (res.ok) {
                toast.success("Profile updated!");
                router.refresh();
            } else {
                toast.error("Update failed");
            }
        } catch (err) {
            toast.error("Network error");
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading)
        return (
            <div className="p-4 text-slate-400 animate-pulse">
                Loading profile...
            </div>
        );

    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                    Account Settings
                </h3>
                <p className="text-sm text-slate-500">
                    Manage your profile information.
                </p>
            </div>

            <form
                onSubmit={handleUpdate}
                className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Email Address
                    </label>
                    <input
                        type="text"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 disabled:bg-slate-400 transition-all shadow-sm">
                    {isUpdating ? "Saving..." : "Update Profile"}
                </button>
            </form>
        </section>
    );
}
