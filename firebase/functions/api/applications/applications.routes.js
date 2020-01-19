const express = require('express');
const router = express.Router();

//Import Controllers
const applicationsController = require('./applications.controller');

//Import middleware
const exampleMiddleware = require('./middlewares/exampleMiddleware');

//Middleware for all routes here to check if the requests
//Are made from authenticated users with valid token
router.use(exampleMiddleware.isAuthenticated);

//Setup Controllers
router.post('/submit', applicationsController.submitApplication);
router.get('/', exampleMiddleware.isRecruiter, applicationsController.getAllApplications);

module.exports = router;