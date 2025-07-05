import dotenv from 'dotenv';
dotenv.config(); //Must Be before any use of proccess env

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';// Allow all origins (dev-friendly)

import songRoute from './routes/songs.js';
import playlistRoute from './routes/playlist.js'; 



const app = express();
app.use(cors()); 

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); //Parse JSON Bodies

// Routes
app.use('/api/songs', songRoute);
app.use('/api/playlist', playlistRoute)

// MongoDB Connections

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to MongoDB');

    // Start Server only after DB connection
    app.listen(PORT ,()=>{
        console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
}).catch((err)=>{
    console.error(`❌ MongoDB connection failed:`, err.message)
});