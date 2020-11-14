const express = require('express');
const films = require('./films');
const F = require('./models/films.js'); 


const router = express.Router();

//get all films
router.get('/', (req, res) => {
    F.find({}, (err, movies)=> {
        let response = {}; 
        movies.forEach((movie)=> {
            response[movie.title]=movie;
        });
    });
    res.send(response);
});

//guardar peli
router.post('/', (req, res) => {
    
});

router.use('/emojis', emojis);

module.exports = router;
