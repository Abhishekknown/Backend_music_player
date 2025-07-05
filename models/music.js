// models/music.js
import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  cover: String,
  link: String,
});

const Song = mongoose.model('Song', songSchema);

export default Song;
