const express = require('express');
const router = express.Router();

//Import Controllers
const errorController = require('./errors/errors.controller');

//Import Routes
const applicationsRoutes = require('./applications/applications.routes');

//Mount Routes
router.use('/applications', applicationsRoutes);

//404 Middleware 
router.use(errorController.get404);

//Error Handler Middleware KEEP LAST
router.use(errorController.errorHandler);

module.exports = router;