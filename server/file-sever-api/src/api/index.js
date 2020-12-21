const router = require('express').Router();
const fs = require('fs');
const fileUpload = require('express-fileupload');
const moveFile = require('../utils');
const monk = require('monk')
const Joi = require('@hapi/joi')
const path = require('path');

const dirPath = process.env.PATH_TO_DIR
console.log("File path:", dirPath);
const db = monk(process.env.MONGO_URI);
console.log("MONGO_URI:", process.env.MONGO_URI);
const movies = db.get('movies');

router.use(fileUpload());

var Film = Joi.object({
    title: Joi.string().trim().required(),
    url: Joi.string().trim().uri().required(),
    image: Joi.required()
});

//GET CONTENT
router.get('/content', async(req, res, next) => {
    try {
        const items = await movies.find({});
        res.json(items);
    } catch (err) {
        next(err);
    }
});

//UPLOAD MOVIE
router.post('/upload', async(req, res, next) => {
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'No files were uploaded'
        });
    }
    let movie = req.files.film;

    const request = {
        title: req.body.title,
        url: "http://192.168.0.46:7000/movie/" + movie.name,
        image: req.files.image
    }


    try {
        await moveFile(movie, dirPath);
    } catch (err) {
        // Sys error
        if (err.code) {
            return next(err);
        }

        return res.status(400).json({
            success: false,
            message: err.message,
            path: path.join(dirPath, movie.name)
        });
    }

    try {
        const value = await Film.validateAsync(request);
        const inserted = await movies.insert(value);
        res.json({
            success: true,
            message: 'Files successfully uploaded',
            path: dirPath.relativePath
        });

    } catch (err) {
        next(err);
    }

});

module.exports = router;