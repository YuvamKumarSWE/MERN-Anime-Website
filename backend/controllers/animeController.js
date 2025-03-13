// controllers/animeController.js
const Anime = require('../models/animeModel');

exports.getAllAnime = async (req, res) => {
  try {
    const { name, genre, minEpisodes, maxEpisodes, sortBy } = req.query;

    // Build the query object dynamically
    const queryObject = {};

    // Search by name (case-insensitive)
    if (name) {
      queryObject.name = { $regex: name, $options: 'i' };
    }

    // Search by multiple genres (split by comma, case-insensitive)
    if (genre) {
      const genresArray = genre.split(',').map((g) => g.trim());
      queryObject.genre = { $in: genresArray.map(g => new RegExp(g, 'i')) };
    }

    // Minimum episodes
    if (minEpisodes) {
      queryObject.episodes = { ...queryObject.episodes, $gte: Number(minEpisodes) };
    }

    // Maximum episodes
    if (maxEpisodes) {
      queryObject.episodes = { ...queryObject.episodes, $lte: Number(maxEpisodes) };
    }

    // Initialize query
    let query = Anime.find(queryObject);

    // Handle multiple sorting fields
    if (sortBy) {
      // Example: ?sortBy=rating,-episodes (rating asc, episodes desc)
      const sortCriteria = sortBy.split(',').join(' '); // Convert to 'rating -episodes'
      query = query.sort(sortCriteria);
    }

    // Execute query
    const anime = await query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: anime.length,
      data: { anime },
    });

  } catch (err) {
    console.error(err); // Log the error to see what happened
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
