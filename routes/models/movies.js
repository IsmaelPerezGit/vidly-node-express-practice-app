const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const { genreSchema } = require('./genre');

const Movie = new mongoose.model(
  'Movies',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
  })
);

module.exports = router;
