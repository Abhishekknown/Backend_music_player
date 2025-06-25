import dotenv from 'dotenv';
dotenv.config(); //Must Be before any use of proccess env

import express from 'express';
import mongoose from 'mongoose';

import songRoute from './routes/songs.js';


const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); //Parse JSON Bodies

// Routes
app.use('/api/songs', songRoute);

// MongoDB Connections

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to MongoDB');

    // Start Server only after DB connection
    app.listen(PORT ,()=>{
        console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
}).catch((err)=>{
    console.error(`❌ MongoDB connection failed:`, err.message)
});