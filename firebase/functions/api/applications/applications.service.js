const ExampleError = require('../errors/exampleError');
const applicationRepository = require('./applications.repository');

exports.getApplications = async (page, limit) => {
    try {
        const result = applicationRepository.getApplications(page, limit);
    } catch(err) {
        console.log('Error reached service')
        throw err;
    }
};

exports.submitApplication = (req, res, next) => {
    throw new ExampleError();
};