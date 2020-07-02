require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const mongoPass = require('./keys');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
require('./startup/routes')(app);

const mongoConnectionUrl = `mongodb+srv://admin:${mongoPass}@cluster0-iikki.mongodb.net/vidly-practice?retryWrites=true&w=majority`;

winston.handleExceptions(
  new winston.transports.MongoDB({
    db: mongoConnectionUrl,
    metaKey: 'meta',
    level: 'error',
  })
);

process.on('unhandledRejection', ex => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(
  new winston.transports.MongoDB({
    db: mongoConnectionUrl,
    metaKey: 'meta',
    level: 'error',
  })
);

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwt private key is not defined.');
  process.exit(1);
}

mongoose
  .connect(mongoConnectionUrl)
  .then(() => console.log('CONNECTED TO MONGO DB...'))
  .catch(() => console.error('COULD NOT ESTABLISH CONNECTION'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Now listening on port ${port}`));
