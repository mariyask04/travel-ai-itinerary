import express from 'express';
import { uploadBooking } from '../controllers/upload.controller.js';
import upload from '../middleware/upload.middleware.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, upload.single("document"), uploadBooking);

export default router;