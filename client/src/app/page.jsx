"use client";

import { useAuth } from "@/context/authContext";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);
      login(data);
      toast.success("Login successful");
      router.push("/dashboard");
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
            <h1 className="text-xl font-semibold text-zinc-900">Welcome back</h1>
            <p className="text-sm text-zinc-500 mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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
              Sign in
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-zinc-500 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-zinc-900 font-medium hover:underline underline-offset-2">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}