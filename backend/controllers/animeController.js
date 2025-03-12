const Anime = require('../models/animeModel');

exports.getAllAnime = async (req, res) => {
  try {
    const anime = await Anime.find();
    res.status(200).json({
      status: 'success',
      results: anime.length,
      data: {
        anime,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};