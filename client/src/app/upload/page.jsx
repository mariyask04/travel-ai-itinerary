"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { uploadBooking } from "@/services/uploadService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export default function UploadPage() {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "application/pdf": [".pdf"],
            "image/*": [".jpeg", ".jpg", ".png"],
        },
    });

    const handleUpload = async () => {
        if (!file) {
            return toast.error("Please select a file");
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("document", file);
            const response = await uploadBooking(formData);
            toast.success("Booking uploaded successfully");
            router.push(`/itineraries/${response.itinerary._id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const getFileIcon = () => {
        if (!file) return null;
        const isPdf = file.type === "application/pdf";
        return isPdf ? (
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ) : (
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        );
    };

    return (
        <ProtectedRoute>
            <Navbar />

            <main className="max-w-2xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-zinc-900">Upload Travel Booking</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Upload flight tickets, hotel bookings, train tickets or other travel documents.
                    </p>
                </div>

                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${isDragActive
                            ? "border-zinc-400 bg-zinc-50"
                            : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                >
                    <input {...getInputProps()} />
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium text-zinc-900">
                        {isDragActive ? "Drop your file here" : "Drag & drop your file here"}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">or click to browse</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {["PDF", "JPG", "PNG"].map((fmt) => (
                            <span key={fmt} className="text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md font-medium">
                                {fmt}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Selected file */}
                {file && (
                    <div className="mt-4 bg-white border border-zinc-200 rounded-xl p-4 flex items-start gap-3">
                        <div className="w-9 h-9 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {getFileIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 truncate">{file.name}</p>
                            <p className="text-xs text-zinc-400 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Upload button */}
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Upload & Generate Itinerary
                        </>
                    )}
                </button>
            </main>
        </ProtectedRoute>
    );
}