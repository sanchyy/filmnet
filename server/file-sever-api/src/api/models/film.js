const mongoose = require('mongoose');
const Schema    = mongoose.Schema;

var Film = new Schema({
    title: {
        type: String, 
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        //default: pathToImage 
    }
}); 

var film = mongoose.model('film', Film); 
module.exports = film; 





















