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
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "application/pdf": [".pdf"],
            "image/*": [".jpeg", ".jpg", ".png"]
        }
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
            toast.success(
                "Booking uploaded successfully"
            );
            router.push(`/itineraries/${response.itinerary._id}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Upload failed"
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <ProtectedRoute>
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-2">
                    Upload Travel Booking
                </h1>

                <p className="text-gray-500 mb-8">
                    Upload flight tickets,
                    hotel bookings, train
                    tickets or other travel
                    documents.
                </p>

                <div {...getRootProps()} className="border-2 border-dashed rounded-xl p-16 text-center cursor-pointer">
                    <input {...getInputProps()} />
                    <p className="text-lg">
                        Drag & Drop your file here
                    </p>

                    <p className="text-gray-500 mt-2">
                        PDF, JPG, PNG
                    </p>
                </div>

                {file && (
                    <div className="mt-6 border rounded-lg p-4">
                        <p className="font-medium">
                            Selected File
                        </p>

                        <p className="text-gray-600 mt-2">
                            {file.name}
                        </p>

                        <p className="text-sm text-gray-400">
                            {(
                                file.size /
                                1024 /
                                1024
                            ).toFixed(2)}
                            MB
                        </p>
                    </div>
                )}

                <button onClick={handleUpload} disabled={loading} className="mt-8 bg-black text-white px-6 py-3 rounded-lg">
                    {loading ? "Processing..." : "Upload & Generate Itinerary"}
                </button>
            </main>
        </ProtectedRoute>
    );
}