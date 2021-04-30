const express = require('express');
const account = require('./account')
const admin = require('./admin')

const router = express.Router();
router.use('/account', account);
router.use('/', admin);

module.exports = router;
