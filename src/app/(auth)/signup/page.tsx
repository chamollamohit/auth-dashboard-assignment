"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/v1/auth/signup", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Signup failed");

            router.push("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">
                        {error}
                    </p>
                )}

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="w-full p-2 border rounded"
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full p-2 border rounded"
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-2 border rounded"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300">
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    );
}
