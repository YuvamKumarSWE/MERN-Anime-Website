const express = require('express');
const aiController = require('../controllers/aiController');
const router = express.Router();

router.post('/recommend', aiController.generateAnimeRecommendation);

module.exports = router;