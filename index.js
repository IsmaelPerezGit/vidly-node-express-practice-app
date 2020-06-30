const express = require('express');
const mongoose = require('mongoose');
const mongoPass = require('./keys');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const app = express();

const mongoConnectionUrl = `mongodb+srv://admin:${mongoPass}@cluster0-iikki.mongodb.net/vidly-practice?retryWrites=true&w=majority`;

mongoose
  .connect(mongoConnectionUrl)
  .then(() => console.log('CONNECTED TO MONGO DB...'))
  .catch(() => console.error('COULD NOT ESTABLISH CONNECTION'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Now listening on port ${port}`));
