const express = require('express');
const router = express.Router();

//Import Controllers
const errorController = require('./errors/errors.controller');

//Import Routes
const applicationsRoutes = require('./applications/applications.routes');
const userRoutes = require('./users/users.routes');

//Mount Routes
router.use('/applications', applicationsRoutes);
router.use('/users', userRoutes);

//404 Middleware 
router.use(errorController.get404);

//Error Handler Middleware KEEP LAST
router.use(errorController.errorHandler);

module.exports = router;