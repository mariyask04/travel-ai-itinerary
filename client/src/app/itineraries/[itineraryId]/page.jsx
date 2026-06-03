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
    const [copied, setCopied] = useState(false);

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
            toast.error("Failed to load itinerary");
        } finally {
            setLoading(false);
        }
    };

    const copyShareLink = async () => {
        const url = `${window.location.origin}/shared/${itinerary.sharedId}`;
        await navigator.clipboard.writeText(url);
        toast.success("Link copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center gap-3">
                <div className="w-7 h-7 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-zinc-500">Loading your itinerary...</p>
            </div>
        );
    }

    if (!itinerary) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-sm font-medium text-zinc-900">Itinerary not found</p>
                <p className="text-sm text-zinc-500">This itinerary may have been removed.</p>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-zinc-900">{itinerary.title}</h1>
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-sm text-zinc-500">{itinerary.destination || "Travel Destination"}</p>
                        </div>
                    </div>

                    <button
                        onClick={copyShareLink}
                        className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors flex-shrink-0"
                    >
                        {copied ? (
                            <>
                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share
                            </>
                        )}
                    </button>
                </div>

                {/* Itinerary content */}
                <div className="bg-white border border-zinc-200 rounded-xl p-8">
                    <div className="prose max-w-none whitespace-pre-wrap text-sm text-zinc-700 leading-relaxed">
                        {itinerary.itineraryText}
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}