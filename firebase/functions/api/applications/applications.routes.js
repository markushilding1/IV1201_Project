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
router.post('/submit',
  applicationsController.validate('submitApplication'), 
  applicationsController.submitApplication
);
router.get('/',
  applicationsController.validate('getApplications'),
  applicationsController.getApplications
);
router.get('/expertise',applicationsController.getAreaOfExpertise);

module.exports = router;