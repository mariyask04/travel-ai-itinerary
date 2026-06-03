import extractPdfText from '../services/pdf.service.js';
import extractImageText from '../services/ocr.service.js';

import Booking from '../models/Booking.model.js';
import { generateItinerary } from '../services/groq.service.js';
import Itinerary from '../models/Itinerary.model.js';
import { nanoid } from 'nanoid';

const uploadBooking = async (req, res) => {
    console.log("FILE RECEIVED:", req.file);
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        let extractedText = "";

        const fileUrl = req.file.path;

        if (req.file.mimetype === "application/pdf") {
            extractedText = await extractPdfText(fileUrl);
        } else {
            extractedText = await extractImageText(fileUrl);
        }
        
        if (!extractedText) {
            extractedText = "No text could be extracted from PDF";
        }

        const booking = await Booking.create({
            user: req.user._id,
            fileName: req.file.originalname,
            fileUrl,
            fileType: req.file.mimetype,
            extractedText,
        });

        let aiResponse = "";

        try {
            aiResponse = await generateItinerary(extractedText);
        } catch (error) {
            console.log("Groq Error:", error.message);

            aiResponse = "AI itinerary generation failed. Please try again later.";
        }

        const itinerary = await Itinerary.create({
            user: req.user._id,
            booking: booking._id,
            itineraryText: aiResponse,
            sharedId: nanoid(10),
        });

        return res.status(201).json({
            success: true,
            booking,
            itinerary,
        });
    } catch (error) {
        console.log("UPLOAD ERROR", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    uploadBooking,
}