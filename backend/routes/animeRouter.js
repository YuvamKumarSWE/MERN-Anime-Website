const express = require('express');
const animeController = require('../controllers/animeController');
const router = express.Router();

router.route('/').
    get(animeController.getAllAnime);


module.exports = router;