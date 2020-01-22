const ExampleError = require('../errors/exampleError');
const applicationRepository = require('./applications.repository');

exports.getAllApplications = (req, res, next) => {
    applicationRepository.getAllApplications();
};

exports.submitApplication = (req, res, next) => {
    throw new ExampleError();
};