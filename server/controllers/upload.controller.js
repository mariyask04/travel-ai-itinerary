import extractPdfText from '../services/pdf.service.js';
import extractImageText from '../services/ocr.service.js';

import Booking from '../models/booking.model.js';

const uploadBooking = async (req, res) => {
    try {
        if (!req.file) {
            res.status(404).json({
                success: false,
                message: "No file uploaded",
            })
        }
        let extarctedText = "";
        if (req.file.mimetype === "application/pdf") {
            extractedText = await extractPdfText(req.file.path);
        } else {
            extractedText = await extractImageText(req.file.path);
        }
        const booking = await Booking.create({
            user: req.user._id,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            extractedText,
        })
        res.status(201).json({
            success: true,
            booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export {
    uploadBooking,
}