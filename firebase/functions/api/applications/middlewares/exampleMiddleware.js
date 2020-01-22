const UnauthorizedError = require('../../errors/unauthorizedError');

exports.isRecruiter = (req, res, next) => {
    //Check token to see if the request is made from a recruiter account
    const isRecruiter = false;

    if(isRecruiter) {
        return next();
    } else {
        throw new UnauthorizedError();
    }
};
