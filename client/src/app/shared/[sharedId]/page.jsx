"use client";

import { getSharedItinerary } from "@/services/itineraryService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SharedItineraryPage() {
    const { sharedId } = useParams();

    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sharedId) {
            fetchSharedItinerary();
        }
    }, [sharedId]);

    const fetchSharedItinerary = async () => {
        try {
            const data = await getSharedItinerary(sharedId);
            setItinerary(data.itinerary);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load itineraries");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center gap-3">
                <div className="w-7 h-7 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-zinc-500">
                    Loading itinerary...
                </p>
            </div>
        );
    }

    if (!itinerary) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-2">
                    <svg
                        className="w-6 h-6 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <p className="text-sm font-medium text-zinc-900">
                    Itinerary not found
                </p>

                <p className="text-sm text-zinc-500">
                    This shared itinerary may no longer be available.
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-50">
            <div className="max-w-4xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316"
                                />
                            </svg>
                            Shared Itinerary
                        </span>
                    </div>

                    <h1 className="text-2xl font-semibold text-zinc-900">
                        {itinerary.title}
                    </h1>

                    <div className="flex items-center gap-1.5 mt-1.5">
                        <svg
                            className="w-3.5 h-3.5 text-zinc-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>

                        <p className="text-sm text-zinc-500">
                            {itinerary.destination ||
                                "Travel Destination"}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white border border-zinc-200 rounded-xl p-8">
                    <div className="prose max-w-none whitespace-pre-wrap text-sm text-zinc-700 leading-relaxed">
                        {itinerary.itineraryText}
                    </div>
                </div>
            </div>
        </main>
    );
}