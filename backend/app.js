const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const animeRouter = require('./routes/animeRouter');
const aiRouter = require('./routes/aiRouter');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); // Use express.json() as a middleware
app.use(cors());       // Use cors() as a middleware

// ROUTES
app.use('/api/v1/anime', animeRouter);
app.use('/api/v1/ai', aiRouter);

module.exports = app;