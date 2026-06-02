"use client";

import { getSharedItinerary } from "@/services/itineraryService";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SharedItineraryPage() {
    const { sharedId } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSharedItinerary();
    }, []);

    const fetchSharedItinerary = async () => {
        try {
            const data =
                await getSharedItinerary(
                    sharedId
                );

            setItinerary(data.itinerary);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!itinerary) {
        return (
            <p>Itinerary not found</p>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">
                Shared Travel Itinerary
            </h1>

            <div className="border rounded-xl p-8">
                <div className="whitespace-pre-wrap">
                    {itinerary.itineraryText}
                </div>
            </div>
        </main>
    );
}