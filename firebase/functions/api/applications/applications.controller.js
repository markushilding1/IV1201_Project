const applicationsService = require('./applications.service');

//Controller to handle submission of an application

exports.submitApplication = async (req, res, next) => {
    const result = await applicationsService.submitApplication(req.body.areaOfExpertise,req.body.date,req.body.uid);
    if(result){
        res.send(result);
    } else {
        res.status(403);
        res.send();
    }
};
/*
//Controller to handle get applications
exports.getApplications = (req, res, next) => {
    //Get page nr from body or params?
    const page = req.body.page;
    //Limit is hardcoded for now, could also come from client
    const limit = 20;
    
    return applicationsService.getApplications(page, limit);
};*/
exports.getAreaOfExpertise = async (req,res,next)=> {
    const result = await applicationsService.getAreaOfExpertise();
    if(result){
        res.send(result);
    } else {
        res.status(403);
        res.send();
    }
};