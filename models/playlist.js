import mongoose from "mongoose";

const playlistSchema = {
    name:{type:String, required:true},
    //an Array of song references 
    //Each item in the array wil have objectID and mongoDbz unique identifir 
    songs:[{type:mongoose.Schema.Types.ObjectId, ref:'Song'}]

    //It references documents from the Song collection (ref: 'Song').

    //This sets up a relationship between the Playlist and Song schemas, allowing for population of song data.
}

const Playlist = mongoose.model('Playlist', playlistSchema)

export default Playlist;