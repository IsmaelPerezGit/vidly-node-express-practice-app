const config = require('config');
const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwt private key is not defined.');
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Now listening on port ${port}`));
