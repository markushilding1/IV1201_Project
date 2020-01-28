const applicationsService = require('./applications.service');

//Controller to handle submission of an application
exports.submitApplication = (req, res, next) => {
    console.log('From Applications Controller');
    return applicationsService.submitApplication();
};

//Controller to handle get applications
exports.getApplications = async (req, res, next) => {
    try {
        //Get query parameters
        const query = req.query;    
        const result = await applicationsService.getApplications(query);
        return res.send(result);
    } catch(err) {
        console.log('Error reached controller')
        return next(err);
    }
};