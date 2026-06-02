"use client";

import { useRouter } from 'next/navigation';
import { registerUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useState } from 'react';

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            toast.success("Registration successful");
            router.push("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message
            );
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-3 w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 w-full"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 w-full"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <button
                    type="submit"
                    className="bg-black text-white w-full p-3"
                >
                    Register
                </button>
            </form>
        </div>
    );
}