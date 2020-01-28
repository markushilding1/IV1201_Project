const ExampleError = require('../errors/exampleError');
const applicationRepository = require('./applications.repository');

exports.getApplications = (page, limit) => {
    return applicationRepository.getApplications(page, limit);
};

exports.submitApplication = (areaOfExpertise,availPeriods) => {
    return applicationRepository.getApplications(areaOfExpertise,availPeriods);
};