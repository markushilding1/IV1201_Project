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

exports.isRecruiter = async (req, res, next) => {
  // JWT Token
  const idToken = req.headers.authorization;
  // Check if token is valid.
  try {
    const isAuthenticated = await verifyIdToken(idToken);
    console.log(isAuthenticated);
    const role = await userRepository.getUserRole(isAuthenticated.uid);
    console.log(role);
    return next();
  } catch (err) {
    console.log(err);
    return next(new UnauthorizedError());
  }
};
