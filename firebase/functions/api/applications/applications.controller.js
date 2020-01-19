const applicationsService = require('./applications.service');

//Controller to handle submission of an application
exports.submitApplication = (req, res, next) => {
    console.log('From Applications Controller');
    res.send('From Applications Controller POST SUBMIT');
};

//Controller to handle get applications
exports.getAllApplications = (req, res, next) => {
    res.send('From Applications Controller GET');
};