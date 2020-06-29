const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
  })
);

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

const validateCustomer = customer => {
  const schema = {
    name: Joi.string().min(1).required(),
    phone: Joi.required(),
  };

  return Joi.validate(genre, schema);
};

module.exports = router;
