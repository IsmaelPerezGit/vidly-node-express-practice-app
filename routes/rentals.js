const express = require('express');
const router = express.Router();

router.get('/', async (req , res) => {
    const rentals = await Rental.find().sort('title');
    res.send(rentals);
})

module.exports = router;