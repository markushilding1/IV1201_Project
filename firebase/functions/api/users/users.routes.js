const express = require('express');
const router = express.Router();

//Import Controllers
const usersController = require('./users.controller');

//Import middleware
const authMiddleware = require('./../common/middlewares/authentication.js');

//Middleware for all routes here to check if the requests
//Are made from authenticated users with valid token
router.use(authMiddleware.isAuthenticated);


//Setup Controllers
router.get('/', usersController.getUser);

module.exports = router;