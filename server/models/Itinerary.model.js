import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    title: {
        type: String,
        default: "Itinerary for the trip"
    },
    destination: {
        type: String,
        default: ""
    },
    itineraryText: {
        type: String,
        required: true,
    },
    sharedId: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;