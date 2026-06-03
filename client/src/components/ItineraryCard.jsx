import React from "react";

const ItineraryCard = ({ itinerary }) => {
    return (
        <div className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 hover:shadow-sm transition-all group">
            {/* Icon + title */}
            <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-zinc-900 truncate">
                        {itinerary.title || "Travel Itinerary"}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                        Created {new Date(itinerary.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-100 pt-4">
                <a
                    href={`/shared/${itinerary.sharedId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share link
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default ItineraryCard;