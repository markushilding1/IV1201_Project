const express = require('express');
const router = express.Router();

//Import Controllers
const applicationsController = require('./applications.controller');

//Import middleware
const authMiddleware = require('./../common/middlewares/authentication.js');
const exampleMiddleware = require('./middlewares/exampleMiddleware.js');


//Middleware for all routes here to check if the requests
//Are made from authenticated users with valid token
//router.use(authMiddleware.isAuthenticated);

//Setup Controllers
router.post('/submit', applicationsController.submitApplication);
router.get('/', applicationsController.getAllApplications);

module.exports = router;