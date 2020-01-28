const ExampleError = require('../errors/exampleError');
const applicationRepository = require('./applications.repository');

exports.getApplications = async (page, limit) => {
    try {
        const result = await applicationRepository.getApplications(page, limit);
        return result;
    } catch(err) {
        console.log('Error reached service')
        throw err;
    }
};

exports.submitApplication = (areaOfExpertise,availPeriods) => {
    return applicationRepository.getApplications(areaOfExpertise,availPeriods);
};