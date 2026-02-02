"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { validateEmail, validatePassword } from "@/lib/validation";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error("Please enter a valid email address");
            setLoading(false);
            return;
        }

        if (!validatePassword(formData.password)) {
            toast.error("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Account created! Please login.");
                router.push("/login");
            } else {
                toast.error(data.error || "Signup failed");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center text-center">
                <div className="w-30 h-30 rounded-full bg-gradient-to-tr from-lime-400 to-green-900 shadow-[0_0_40px_rgba(163,230,53,0.15)] mb-6 flex items-center justify-center overflow-hidden">
                    <Image
                        src={"sign-up.svg"}
                        alt="login"
                        width={100}
                        height={100}
                    />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    Join TaskMaster
                </h1>
                <p className="text-zinc-500 text-sm">
                    Create an account to start organizing.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-400 ml-1">
                            Full Name*
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Mohit"
                            className="w-full bg-[#121212] border border-zinc-800 rounded-2xl px-4 py-3 text-white focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none transition-all placeholder:text-zinc-700"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-400 ml-1">
                            Email address*
                        </label>
                        <input
                            required
                            type="email"
                            placeholder="mohit@example.com"
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
                            placeholder="••••••••"
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

                <p className="text-[10px] text-zinc-600 px-1 text-center leading-relaxed">
                    By signing up, you agree to our{" "}
                    <span className="text-zinc-400 underline">
                        Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-zinc-400 underline">
                        Privacy Policy
                    </span>
                    .
                </p>

                <button
                    disabled={loading}
                    className="w-full py-4 bg-[#D9FF41] text-black font-bold rounded-full hover:bg-[#cbe635] transition-transform active:scale-[0.98] disabled:opacity-50 shadow-[0_10px_20px_rgba(217,255,65,0.1)]">
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>

            <div className="text-center">
                <p className="text-zinc-500 text-sm">
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-white font-bold hover:underline">
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}
