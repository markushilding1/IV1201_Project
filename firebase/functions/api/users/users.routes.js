const express = require('express');
const router = express.Router();

//Import Controllers
const usersController = require('./users.controller');

//Import middleware
const authMiddleware = require('./../common/middlewares/authentication.js');

<<<<<<< HEAD
=======
//Middleware for all routes here to check if the requests
//Are made from authenticated users with valid token
//router.use(authMiddleware.isAuthenticated);


>>>>>>> added api fucntion to get areas of experties
//Setup Controllers
router.get('/:uid', authMiddleware.isAuthenticated, usersController.getUserProfile);
router.post(
  '/', 
  usersController.validate('createUserProfile'),
  usersController.createUserProfile
);

module.exports = router;