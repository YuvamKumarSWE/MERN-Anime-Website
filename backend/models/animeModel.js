const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  anime_id: { type: Number, required: true },
  name: { type: String, required: true },
  genre: { type: String, required: true },
  type: { type: String, required: true },
  episodes: { type: Number, required: true },
  rating: { type: Number, required: true },
  members: { type: Number, required: true },
});

// Specify the collection name explicitly
const Anime = mongoose.model('Anime', animeSchema, 'anime_list');

module.exports = Anime;
