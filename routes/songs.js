import express from 'express';
import Song from '../models/music.js';

const router = express.Router();

// Upload a song (CREATE)

router.post('/create', async (req,res)=>{
    try {
        // Take data from the body
        console.log("hellow")
        const {name, type, cover, link} = req.body;
        const newSong = new Song({name, type, cover, link});
        await newSong.save();

        // Response use this 
        res.status(201).json({message:'Song Uploaded', song:newSong});

    } catch (error) {
        res.status(400).json({error:error.message});
    }
})

// Get all Songs (READ ALL)
router.get('/', async(req, res)=>{
    try {
        const songs = await Song.find();
        res.json({songs});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

// Search by the name of the songs

router.get('/search/by-name', async(req,res)=>{
    try {
        const {name} = req.query;

        if(!name){
            return res.status(400).json({message:'Missing "name" query parameter'});
        }

        // To find the song
        const songs = await Song.find({
            name:{$regex:name, $options:'i'} //Case-insensitive 
        })

        res.json({songs});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})


// Update a song (UPDATE)

router.put('/_id', async (req, res)=>{
    try {
        const Updated = await Song.findByIdAndUpdate(req.params.id ,req.body, {new: true});

        if(!Updated){
            return res.status(404).json({message:'Song not found'});
        }

        res.json(Updated);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

// Delete a song
router.delete('/:id', async(req, res)=>{
    try {
        const deleted = await Song.findByIdAndDelete(req.params.id);
        
        if(!deleted){
            return res.status(404).json({message:'song not found'});
        }

        res.json({message:'Song Deleted'});


    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

export default router;