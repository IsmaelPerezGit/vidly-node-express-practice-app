const asyncMiddleware = require('../middleware/async');
const express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  })
);

router.post(
  '/',
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
  })
);

router.put(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre) res.status(404).send('The genre with the given id was not found...');
    res.send(genre);
  })
);

router.delete(
  '/:id',
  [auth, admin],
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) res.status(404).send('The genre with the given id was not found...');
    res.send(genre);
  })
);

router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) res.status(404).send('The genre with the given id was not found...');
    res.send(genre);
  })
);

module.exports = router;
