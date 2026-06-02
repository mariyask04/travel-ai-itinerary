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
    }, [])

    const fetchItineraries = async () => {
        try {
            const data = await getItineraries();
            setItineraries(data.itineraries || [])
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <ProtectedRoute>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your AI-generated
                            travel itineraries
                        </p>
                    </div>

                    <Link
                        href="/upload"
                        className="bg-black text-white px-5 py-3 rounded-lg"
                    >
                        Upload Booking
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <div className="border rounded-xl p-6">
                        <h2 className="text-gray-500">
                            Total Itineraries
                        </h2>

                        <p className="text-4xl font-bold mt-2">
                            {itineraries.length}
                        </p>
                    </div>

                    <div className="border rounded-xl p-6">
                        <h2 className="text-gray-500">
                            Shared Trips
                        </h2>

                        <p className="text-4xl font-bold mt-2">
                            {itineraries.length}
                        </p>
                    </div>

                    <div className="border rounded-xl p-6">
                        <h2 className="text-gray-500">
                            AI Generated
                        </h2>

                        <p className="text-4xl font-bold mt-2">
                            {itineraries.length}
                        </p>
                    </div>
                </div>

                {/* Recent Itineraries Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">
                        Recent Itineraries
                    </h2>

                    {loading ? (<p>Loading...</p>) : itineraries.length === 0 ? (
                        <div className="border rounded-xl p-10 text-center">
                            <p>
                                No itineraries yet.
                            </p>

                            <Link
                                href="/upload"
                                className="text-blue-600 mt-4 inline-block"
                            >
                                Upload your first booking
                            </Link>
                        </div>
                    ):(
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {itineraries.map(itinerary=>(
                                <ItineraryCard key={itinerary._id} itinerary={itinerary}/>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </ProtectedRoute>
    );
}