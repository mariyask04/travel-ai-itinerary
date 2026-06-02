import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push("/");
    }
    return (
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    TravelAI
                </h1>

                <div className="flex items-center gap-4">
                    <span>
                        {user?.name}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar