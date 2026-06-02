import React from 'react'

const ItineraryCard = ({ itinerary }) => {
    return (
        <div className="border rounded-xl p-5 bg-white shadow-sm">
            <h3 className="font-semibold text-lg">
                {itinerary.title || "Travel Itinerary"}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
                Created:
                {" "}
                {new Date(itinerary.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-4">
                <a
                    href={`/shared/${itinerary.shareId}`}
                    target="_blank"
                    className="text-blue-600"
                >
                    Share Link
                </a>
            </div>
        </div>
    );
}

export default ItineraryCard