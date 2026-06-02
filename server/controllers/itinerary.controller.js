import Booking from '../models/booking.model.js';
import Itinerary from '../models/Itinerary.model.js';

import { nanoid } from 'nanoid';

import { generateItinerary } from '../services/gemini.service.js';

const createItinerary = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const aiResponse = await generateItinerary(booking.extractedText);
        const itinerary = await Itinerary.create({
            user: req.user._id,
            booking: booking._id,
            itineraryText: aiResponse,
            shareId: nanoid(10)
        });
        res.status(201).json({ message: "true", itinerary });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getUserItineraries = async (req, res) => {
    const itineraries = await Itinerary.find({ user: req.user._id }).populate("booking").sort({ createdAt: -1, });
    res.status(200).json({
        success: true,
        itineraries,
    });
}

const getSharedItinerary = async (req, res) => {
    const itinerary = await Itinerary.findOne({ sharedId: req.params.sharedId });
    if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
    }
    res.status(200).json({
        success: true,
        itinerary,
    });
}

export {
    createItinerary,
    getUserItineraries,
    getSharedItinerary
};