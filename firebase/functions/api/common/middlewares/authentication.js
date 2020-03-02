const UnauthorizedError = require("../../errors/unauthorizedError");
const verifyIdToken = require("../utils/idTokenValidation").verifyIdToken;
const userRepository = require("../../users/users.repository");

exports.isAuthenticated = async (req, res, next) => {
  // JWT Token
  const idToken = req.headers.authorization;
  // Check if token is valid.
  try {
    const isAuthenticated = await verifyIdToken(idToken);
    console.log(isAuthenticated);
    req.uid = isAuthenticated.uid;
    return next();
  } catch (err) {
    return next(new UnauthorizedError());
  }
};

/**
 * @author Philip Romin
 * @description Checks if the request is coming from a user with the recruiter role
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */
exports.isRecruiter = async (req, res, next) => {
  // JWT Token
  const idToken = req.headers.authorization;
  // Check if token is valid.
  try {
    const isAuthenticated = await verifyIdToken(idToken);
    const role = await userRepository.getUserRole(isAuthenticated.uid);
    if (role.name === "recruit") {
      return next();
    } else {
      return next(new UnauthorizedError());
    }
  } catch (err) {
    console.log(err);
    return next(new UnauthorizedError());
  }
};

/**
 * @author Markus Hilding
 * @description Checks if JWT token sent from client
 * is valid and passes on the person 'uid' if valid. 
 * @throws UnauthorizedError
 */
exports.isAuthorized = async (req, res, next) => {
    // JWT Token
    const idToken = req.headers.authorization;
    
    // Check if token is valid.
    try {
        const isAuthorized = await verifyIdToken(idToken);
        console.log(isAuthorized);
        req.uid = isAuthorized.uid;
        return next();
    } catch(err) {
        return next(new UnauthorizedError());
    }
};
