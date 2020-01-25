const ExampleError = require('../errors/exampleError');
const applicationRepository = require('./applications.repository');

exports.getApplications = (page, limit) => {
    return applicationRepository.getApplications(page, limit);
};

exports.submitApplication = (req, res, next) => {
    throw new ExampleError();
};