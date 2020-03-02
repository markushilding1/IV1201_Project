const applicationsService = require("./applications.service");
const { check, validationResult } = require("express-validator");



/**
 * @author Josef Federspiel
 * @description //Controller to handle submission of an application
 * @param req The request object
 * @param res The response object
 */
exports.submitApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  console.log(req.body);
  console.log(req.body.uid);
  const result = await applicationsService.submitApplication(
    req.body.areaOfExpertise,
    req.body.date,
    req.body.uid,
    req.body.todayDate
  );
  console.log(result);
  if (result) {
    res.send(result);
  } else {
    res.status(403);
    res.send();
  }
};

/**
 * @author Josef Federspiel
 * @description Controller function to handle get competence areas
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */


exports.getAreaOfExpertise = async (req, res) => {
  const result = await applicationsService.getAreaOfExpertise();
  if (result) {
    res.send(result);
  } else {
    res.status(403);
    res.send();
  }
};

/**
 * @author Philip Romin
 * @description Controller function to handle get request to /applicants
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */
exports.getApplications = async (req, res, next) => {
  // Validating body params
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    //Get query parameters
    const query = req.query;
    console.log(query);
    const result = await applicationsService.getApplications(query);
    return res.send(result);
  } catch (err) {
    return next(err);
  }
};

/**
 * @author Philip Romin
 * @description Controller function to handle get request to /applicants/:id
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */
exports.getApplication = async (req, res, next) => {
  try {
    //Get id parameter
    const id = req.params.id;
    const result = await applicationsService.getApplication(id);
    return res.send(result);
  } catch (err) {
    return next(err);
  }
};

/**
 * @author Philip Romin
 * @description Controller function to handle patch request to /applicants/:id
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */
exports.updateStatus = async (req, res, next) => {
  try {
    //Get id and status from request
    const id = req.params.id;
    const status = req.body.status;

    const result = await applicationsService.updateStatus(id, status);
    return res.send(result);
  } catch (err) {
    return next(err);
  }
};

/**
 * @author Markus Hilding
 * @description Parameter validation for all controller functions where
 * params are sent via body.
 * @param {string} method Name of controller method to validate.
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

    case "submitApplication": {
      return [
        check(
          "areaOfExpertise",
          "Parameter ´areaOfExpertise´ not provided"
        ).exists(),
        check("date", "Parameter ´date´ not provided").exists(),
        check("uid", "Parameter ´uid´ not provided").exists(),
        check('todayDate',
            'Parameter ´todayDate´ not provided')
            .exists().isLength({min:10}),
      ];
    }

    default:
      return null;
  }
};
