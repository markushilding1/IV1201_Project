/**
 * @author Philip Romin
 * @description Controller function to handle user visiting non existing route
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */
exports.get404 = (req, res, next) => {
  res.status(404).json({ msg: "Route does not exist" });
};

/**
 * @author Philip Romin
 * @description Controller function for error handling
 * @param error The error object being thrown by another function
 * @param req The request object
 * @param res The response object
 * @param next Function to pass through to next middleware
 */
exports.errorHandler = (error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Server Error";
  res.status(statusCode).json({ message: message });
};
