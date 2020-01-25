const applicationsService = require('./applications.service');

//Controller to handle submission of an application
exports.submitApplication = (req, res, next) => {
    console.log('From Applications Controller');
    return applicationsService.submitApplication();
};

//Controller to handle get applications
exports.getApplications = (req, res, next) => {
    //Get page nr from body or params?
    const page = req.body.page;
    //Limit is hardcoded for now, could also come from client
    const limit = 20;
    
    return applicationsService.getApplications(page, limit);
};