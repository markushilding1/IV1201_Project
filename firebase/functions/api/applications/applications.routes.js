const express = require('express');
const router = express.Router();

//Import Controllers
const applicationsController = require('./applications.controller');

//Middleware for these specific routes here
/*  Example make sure the client has a valid auth token
    App.use(someAuthorizationMiddleware);
*/

//Setup Controllers
router.post('/submit', applicationsController.submitApplication);

//Middleware for the routes below
/*  Example make sure the client is a recruiter
    App.use(makeSureClientIsRecruiter);
*/
router.get('/', applicationsController.getAllApplications);

module.exports = router;