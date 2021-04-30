const express = require('express');
const review = require('./review');

const router = express.Router();
router.use('/', review);

module.exports = router;
