const ExampleError = require('../errors/exampleError');

exports.getAllApplications = (req, res, next) => {
    throw new ExampleError();
};

exports.submitApplication = (req, res, next) => {
    throw new ExampleError();
};