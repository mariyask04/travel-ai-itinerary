import express from 'express';

import protect from '../middleware/auth.middleware.js';

import { createItinerary, getItineraryById, getUserItineraries, getSharedItinerary } from '../controllers/itinerary.controller.js';

const router = express.Router();

router.post("/generate", protect, createItinerary);
router.get("/my", protect, getUserItineraries);
router.get("/:itineraryId", protect, getItineraryById);
router.get("/shared/:sharedId", protect, getSharedItinerary);

export default router;