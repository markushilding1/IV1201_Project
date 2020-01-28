const express = require('express');
const router = express.Router();

//Import Controllers
const usersController = require('./users.controller');

//Import middleware
const authMiddleware = require('./../common/middlewares/authentication.js');

//Setup Controllers
router.get('/:uid', authMiddleware.isAuthenticated, usersController.getUserProfile);
router.post('/', usersController.createUserProfile);

module.exports = router;