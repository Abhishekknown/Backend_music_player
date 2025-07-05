// routes/playlists.js
import express from 'express';
import Playlist from '../models/playlist.js';
import Song from '../models/music.js'; // ✅ Necessary for populate to work

const router = express.Router();

// GET all playlists with populated song details
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    res.json({ playlists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new playlist
router.post('/create', async (req, res) => {
  try {
    const { name, songs } = req.body;
    const playlist = new Playlist({ name, songs });
    await playlist.save();
    res.status(201).json({ message: 'Playlist created', playlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD song to playlist
router.put('/:playlistId/add', async (req, res) => {
  try {
    const { songId } = req.body;

    const playlist = await Playlist.findByIdAndUpdate(
      req.params.playlistId,
      { $addToSet: { songs: songId } },
      { new: true }
    ).populate('songs');

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json({ message: 'Song added to playlist', playlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
