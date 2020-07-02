const mongoPass = require('../keys');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
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
};
