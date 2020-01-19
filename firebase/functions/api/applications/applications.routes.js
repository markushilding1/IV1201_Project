const express = require('express');
const router = express.Router();

//Import Controllers
const applicationsController = require('./applications.controller');

//Import middleware
const exampleMiddleware = require('./middlewares/exampleMiddleware');

//Middleware for these specific routes here
/*  Example make sure the client has a valid auth token
    App.use(someAuthorizationMiddleware);
*/

//Setup Controllers
router.post('/submit', exampleMiddleware.isAuthenticated, applicationsController.submitApplication);

router.get('/', exampleMiddleware.isRecruiter, applicationsController.getAllApplications);

module.exports = router;