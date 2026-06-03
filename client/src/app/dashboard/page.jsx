"use client";

import ItineraryCard from "@/components/ItineraryCard";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getItineraries } from "@/services/itineraryService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        try {
            const data = await getItineraries();
            setItineraries(data.itineraries || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
                        <p className="text-sm text-zinc-500 mt-1">Manage your AI-generated travel itineraries</p>
                    </div>

                    <Link
                        href="/upload"
                        className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Booking
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-white border border-zinc-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="text-sm text-zinc-500">Total Itineraries</span>
                        </div>
                        <p className="text-3xl font-semibold text-zinc-900">{itineraries.length}</p>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </div>
                            <span className="text-sm text-zinc-500">Shared Trips</span>
                        </div>
                        <p className="text-3xl font-semibold text-zinc-900">{itineraries.length}</p>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <span className="text-sm text-zinc-500">AI Generated</span>
                        </div>
                        <p className="text-3xl font-semibold text-zinc-900">{itineraries.length}</p>
                    </div>
                </div>

                {/* Recent Itineraries */}
                <div>
                    <h2 className="text-base font-semibold text-zinc-900 mb-5">Recent Itineraries</h2>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <div className="w-7 h-7 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm text-zinc-500">Fetching your itineraries...</p>
                        </div>
                    ) : itineraries.length === 0 ? (
                        <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center">
                            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-zinc-900 mb-1">No itineraries yet</p>
                            <p className="text-sm text-zinc-500 mb-5">Upload your flight or hotel booking to get started</p>
                            <Link
                                href="/upload"
                                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload your first booking
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {itineraries.map((itinerary) => (
                                <ItineraryCard key={itinerary._id} itinerary={itinerary} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </ProtectedRoute>
    );
}