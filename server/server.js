import connectDB from "./config/db.config.js";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.router.js';
import uploadRoutes from './routes/upload.router.js';
import itineraryRoutes from './routes/itinerary.router.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/itinerary', itineraryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});