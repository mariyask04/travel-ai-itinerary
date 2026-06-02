import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    extractedText: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;