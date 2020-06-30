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
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
  })
);

const validateCustomer = customer => {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(1).max(50).required(),
  };
  return Joi.validate(customer, schema);
};

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
