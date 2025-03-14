const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  anime_id: { type: Number, required: true },
  name: { type: String, required: true },
  genre: { type: String, required: true },
  type: { type: String, required: true },
  episodes: { type: Number, required: false },
  rating: { type: Number, required: false },
  members: { type: Number, required: false },
});

// Specify the collection name explicitly
const Anime = mongoose.model('Anime', animeSchema, 'anime_list');

module.exports = Anime;
