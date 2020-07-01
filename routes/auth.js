const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const Joi = require('joi');

router.post('/', async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');
  res.send(true);
});

const validateAuth = creds => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(creds, schema);
};

module.exports = router;
