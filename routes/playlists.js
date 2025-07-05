import express from 'express';
// Exporting the model playlist 
import Playlist from '../models/playlist.js';
import Song from '../models/music.js';

const router = express.Router();

// Write the functions now 

// Fetch all songs from the playlist with its name 
router.get('/',async(req,res)=>{
    try {
        const playlists = await Playlist.find().populate('songs');
        res.json({playlists});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})


// Create a playlist 
router.post('/create', async(req, res)=>{
    try {
        const { name, songs } = req.body;
        const playlist = new Playlist({
            name,
            songs
        });

        await playlist.save();

        res.status(201).json({message:'Playlist Created', playlist});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})