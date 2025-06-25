// Song will have 
// Name ,type, cover , link -- link is required 

import mongoose from "mongoose";


// Setup the string type 
export const songSchema = {
    name:{type: String, required:true},
    type:{type:String},
    cover:{type:String},
    link:{type:String}
}

// take constant and export the too the mongooes model
const Song = mongoose.model('songs', songSchema);


export default Song;

