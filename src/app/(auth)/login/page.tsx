"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/v1/auth/login", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Welcome back!");
                router.refresh();
                router.push("/dashboard");
            } else {
                toast.error(data.error || "Login failed");
            }

            if (!res.ok) throw new Error(data.error);
            router.push("/dashboard");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                <p className="text-slate-400 text-sm mt-1">
                    Please sign in to your account
                </p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-3 rounded-lg mb-6 text-center">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        className="w-full bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 ml-1">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-[#0f172a] border border-slate-700 p-3 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-all active:transform active:scale-[0.98] disabled:opacity-50 mt-2">
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <p className="text-center mt-6 text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="text-indigo-400 hover:text-indigo-300 font-medium">
                    Create one
                </Link>
            </p>
        </>
    );
}
