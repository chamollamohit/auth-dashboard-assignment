"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email || !formData.password) {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Welcome Back!");
                router.refresh();
                router.push("/dashboard");
            } else {
                toast.error(data.error || "Login failed");
            }
        } catch (err) {
            toast.error("Connection error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center text-center">
                <div className="w-30 h-30 rounded-full bg-gradient-to-b from-lime-400 to-green-900 shadow-[0_0_40px_rgba(163,230,53,0.2)] mb-6 flex items-center justify-center overflow-hidden">
                    <Image
                        src={"login.svg"}
                        alt="login"
                        width={100}
                        height={100}
                    />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome Back!
                </h1>
                <p className="text-zinc-500 text-sm">
                    Sign in to access your dashboard.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-400 ml-1">
                            Email address*
                        </label>
                        <input
                            required
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full bg-[#121212] border border-zinc-800 rounded-2xl px-4 py-3 text-white focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none transition-all placeholder:text-zinc-700"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-400 ml-1">
                            Password*
                        </label>
                        <input
                            required
                            type="password"
                            placeholder="@Sn123hsn#"
                            className="w-full bg-[#121212] border border-zinc-800 rounded-2xl px-4 py-3 text-white focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none transition-all placeholder:text-zinc-700"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <button
                    disabled={loading}
                    className="w-full py-4 bg-[#D9FF41] text-black font-bold rounded-full hover:bg-[#cbe635] transition-transform active:scale-95 disabled:opacity-50">
                    {loading ? "Verifying..." : "Sign in"}
                </button>
            </form>

            <div className="text-center">
                <p className="text-zinc-500 text-sm">
                    Don&apos;t have an account?{" "}
                    <button
                        onClick={() => router.push("/signup")}
                        className="text-white font-bold hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}
