const applicationsService = require("./applications.service");

//Controller to handle submission of an application
exports.submitApplication = (req, res, next) => {
  console.log("From Applications Controller");
  return applicationsService.submitApplication();
};

/**
 * @author Philip Romin
 * @description Controller function to handle get route to /applicants
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */
exports.getApplications = async (req, res, next) => {
  try {
    //Get query parameters
    const query = req.query;
    console.log(query);
    const result = await applicationsService.getApplications(query);
    return res.send(result);
  } catch (err) {
    console.log("Error reached controller");
    return next(err);
  }
};
