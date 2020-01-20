const express = require('express');
const router = express.Router();

//Import Controllers
const usersController = require('./users.controller');

//Setup Controllers
router.get('/', usersController.getUser);

module.exports = router;