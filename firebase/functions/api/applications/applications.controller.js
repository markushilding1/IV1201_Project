const applicationsService = require("./applications.service");
const { check, validationResult } = require("express-validator");

//Controller to handle submission of an application
<<<<<<< HEAD

exports.submitApplication = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    console.log(req.body);
    console.log(req.body.uid);
    const result = await applicationsService.submitApplication(req.body.areaOfExpertise,req.body.date,req.body.uid);
    console.log(result)
    if(result){
        res.send(result);
    }
    else {
        res.status(403);
        res.send();
    }
};

exports.getAreaOfExpertise = async (req,res,next)=> {
    const result = await applicationsService.getAreaOfExpertise();

    if(result){
        res.send(result);
    } else {
        res.status(403);
        res.send();
    }
=======
exports.submitApplication = (req, res, next) => {
  // Validating body params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  console.log("From Applications Controller");
  return applicationsService.submitApplication();
>>>>>>> now fetching applicants from our database
};

/**
 * @author Philip Romin
 * @description Controller function to handle get route to /applicants
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */
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
    return res.send(result);
  } catch (err) {
    console.log("Error reached controller");
    return next(err);
  }
};

/**
 * @author Markus Hilding
 * @description Parameter validation for all controller functions where
 * params are sent via body.
<<<<<<< HEAD
 * @param {string} method Name of controller method to validate.
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
                check('date', 'Parameter ´date´ not provided').exists(),
                check('uid', 'Parameter ´uid´ not provided').exists(),
            ]
        }
=======
 * @param {str} method Name of controller method to validate.
 */
exports.validate = method => {
  switch (method) {
    case "getApplications": {
      return [
        check("name", "Parameter ´name´ not provided")
          .exists()
          .isLength({ min: 2 }),
        check("competence", "Parameter ´competence´ not provided")
          .exists()
          .isLength({ min: 2 }),
        check("fromDate", "Parameter ´fromDate´ not provided")
          .exists()
          .isLength({ min: 10 }),
        check("toDate", "Parameter ´toDate´ not provided")
          .exists()
          .isLength({ min: 10 }),
        check("page", "Parameter ´page´ not provided")
          .exists()
          .isInt(),
        check("dateOrder", "Parameter ´dateOrder´ not provided")
          .exists()
          .isIn(["asc", "desc"])
      ];
    }
>>>>>>> now fetching applicants from our database

    case "submitApplication": {
      return [
        check(
          "areaOfExpertise",
          "Parameter ´areaOfExpertis´ not provided"
        ).exists(),
        check(
          "areaOfExpertise.areaId",
          "Parameter ´areaOfExpertis.areaId´ not provided"
        )
          .exists()
          .isInt(),
        check(
          "areaOfExpertise.yearsOfExperience",
          "Parameter ´areaOfExpertis.yearsOfExperience´ not provided"
        ).exists(),
        check(
          "availabilityPeriod",
          "Parameter ´availabilityPeriod´ not provided"
        ).exists(),
        check(
          "availabilityPeriod.fromDate",
          "Parameter ´availabilityPeriod´ not provided"
        ).exists(),
        check(
          "availabilityPeriod.toDate",
          "Parameter ´availabilityPeriod´ not provided"
        ).exists()
      ];
    }
<<<<<<< HEAD
=======

    default:
      return null;
  }
>>>>>>> now fetching applicants from our database
};
