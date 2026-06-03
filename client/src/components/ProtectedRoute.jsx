"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/");
    }, [router]);

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 gap-3">
                <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-zinc-500">Loading your dashboard...</p>
            </div>
        );
    }

    return children;
}