const winston = require('winston');
const mongoose = require('mongoose');
const mongoPass = require('../keys');

module.exports = function () {
  const mongoConnectionUrl = `mongodb+srv://admin:${mongoPass}@cluster0-iikki.mongodb.net/vidly-practice?retryWrites=true&w=majority`;
  mongoose
    .connect(mongoConnectionUrl)
    .then(() => winston.info('CONNECTED TO MONGO DB...'));
};
