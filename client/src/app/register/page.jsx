"use client";

import { useRouter } from "next/navigation";
import { registerUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordDisplay = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            toast.success("Registration successful");
            router.push("/");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <span className="text-lg font-semibold text-zinc-900 tracking-tight">VoyageAI</span>
                </div>

                {/* Card */}
                <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
                    <div className="mb-6">
                        <h1 className="text-xl font-semibold text-zinc-900">Create account</h1>
                        <p className="text-sm text-zinc-500 mt-1">Plan your first AI-powered trip today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-600 mb-1.5">
                                Full name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full h-10 px-3 text-sm bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-600 mb-1.5">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full h-10 px-3 text-sm bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-600 mb-1.5">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    className="w-full h-10 px-3 pr-16 text-sm bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={togglePasswordDisplay}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-600 hover:text-zinc-900"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-10 bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors mt-2"
                        >
                            Create account
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-sm text-zinc-500 mt-5">
                    Already have an account?{" "}
                    <Link href="/" className="text-zinc-900 font-medium hover:underline underline-offset-2">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}