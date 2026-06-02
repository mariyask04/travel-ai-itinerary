import express from 'express';

import protect from '../middleware/auth.middleware.js';

import { createItinerary, getUserItineraries, getSharedItinerary } from '../controllers/itinerary.controller.js';

const router = express.Router();

router.post("/generate",protect, createItinerary);
router.get("/my", protect, getUserItineraries);
router.get("/shared/:sharedId", protect, getSharedItinerary);

export default router;