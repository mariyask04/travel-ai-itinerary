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
        <nav className="bg-white border-b border-zinc-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <span className="text-base font-semibold text-zinc-900 tracking-tight">VoyageAI</span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-medium text-zinc-600">
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="text-sm text-zinc-700 font-medium">{user?.name}</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar