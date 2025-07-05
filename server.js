// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import songRoute from './routes/songs.js';
import playlistRoute from './routes/playlists.js'; // ✅ Correct route

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/songs', songRoute);
app.use('/api/playlist', playlistRoute); // ✅ Mount point for playlist routes

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err.message));
