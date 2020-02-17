const applicationsService = require('./applications.service');
const { check, validationResult} = require('express-validator');


//Controller to handle submission of an application

exports.submitApplication = async (req, res, next) => {
<<<<<<< HEAD

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

=======
    console.log(req.body);
>>>>>>> submit application done
    const result = await applicationsService.submitApplication(req.body.areaOfExpertise,req.body.date,req.body.uid);
    if(result){
        res.send(result);
    } else {
        res.status(403);
        res.send();
    }
};

//Controller to handle get applications
exports.getApplications = async (req, res, next) => {

    // Validating body params
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        //Get query parameters
        const query = req.query;    
        const result = await applicationsService.getApplications(query);
        return es.send(result);
    } catch(err) {
        console.log('Error reached controller')
        return next(err);
    }
};

/**
 * @author Markus Hilding
 * @description Parameter validation for all controller functions where
 * params are sent via body.
 * @param {str} method Name of controller method to validate. 
 */
exports.validate = (method) => {
    switch (method) {
        case 'getApplications': {
            return [ 
                check('name', 'Parameter ´name´ not provided').exists().isLength({min:2}),
                check('competence', 'Parameter ´competence´ not provided').exists().isLength({min:2}),
                check('fromDate', 'Parameter ´fromDate´ not provided').exists().isLength({min:10}),
                check('toDate', 'Parameter ´toDate´ not provided').exists().isLength({min:10}),
                check('page', 'Parameter ´page´ not provided').exists().isInt(),
                check('dateOrder', 'Parameter ´dateOrder´ not provided').exists().isIn(['asc', 'desc']),  
            ]   
        }

        case 'submitApplication': {
            return [
                check('areaOfExpertise', 'Parameter ´areaOfExpertise´ not provided').exists(),
                check('areaOfExpertise.areaId', 'Parameter ´areaOfExpertise.areaId´ not provided').exists().isInt(),
                check('areaOfExpertise.yearsOfExperience', 'Parameter ´areaOfExpertise.yearsOfExperience´ not provided').exists(),
                check('availabilityPeriod', 'Parameter ´availabilityPeriod´ not provided').exists(),
                check('availabilityPeriod.fromDate', 'Parameter ´availabilityPeriod´ not provided').exists(),
                check('availabilityPeriod.toDate', 'Parameter ´availabilityPeriod´ not provided').exists(),
            ]   
        }

        default:
            return null;
    }
};
