const applicationsService = require('./applications.service');

//Controller to handle submission of an application
exports.submitApplication = (req, res, next) => {
    console.log('From Applications Controller');
    return applicationsService.submitApplication();
};

//Controller to handle get applications
exports.getAllApplications = (req, res, next) => {
    return applicationsService.getAllApplications();
};