const UnauthorizedError = require('../../errors/unauthorizedError');
const verifyIdToken = require('../utils/idTokenValidation').verifyIdToken;

exports.isAuthenticated = async (req, res, next) => {
    // JWT Token
    const idToken = req.headers.authorization;
    // Check if token is valid.
    try {
        const isAuthenticated = await verifyIdToken(idToken);
        console.log(isAuthenticated);
        req.uid = isAuthenticated.uid;
        return next();
    } catch(err) {
        return next(new UnauthorizedError());
    }
};