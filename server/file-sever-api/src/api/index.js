const express = require('express');
const emojis  = require('./emojis');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'FilmNet - API v1.0'
  });
});

router.use('/emojis', emojis);

module.exports = router;
