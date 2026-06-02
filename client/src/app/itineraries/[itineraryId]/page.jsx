"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getItineraryById } from "@/services/itineraryService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ItineraryPage() {
    const { itineraryId } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (itineraryId) {
            fetchItineraries();
        }
    }, [itineraryId]);

    const fetchItineraries = async () => {
        try {
            const data = await getItineraryById(itineraryId);
            setItinerary(data.itinerary);
        } catch (error) {
            toast.error(
                "Failed to load itinerary"
            );
        } finally {
            setLoading(false);
        }
    }

    const copyShareLink = async () => {
        const url = `${window.location.origin}/shared/${itinerary.sharedId}`;
        await navigator.clipboard.writeText(url);
        toast.success("Link copied!");
    }

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    if (!itinerary) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Itinerary not found
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {itinerary.title}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {itinerary.destination ||
                                "Travel Destination"}
                        </p>
                    </div>

                    <button className="bg-black text-white px-5 py-3 rounded-lg" onClick={copyShareLink}>
                        Copy Share Link
                    </button>
                </div>

                <div className="bg-white border rounded-xl p-8 shadow-sm">
                    <div className="prose max-w-none whitespace-pre-wrap">
                        {itinerary.itineraryText}
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}