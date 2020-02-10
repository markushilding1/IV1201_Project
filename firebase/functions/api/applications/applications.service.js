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

exports.getAreaOfExpertise = async () => {
    await applicationRepository.getAreaOfExpertise();

exports.submitApplication = async (areaOfExpertise,date,uid) => {
    await applicationRepository.submitAvailability(areaOfExpertise,date,uid);
    await applicationRepository.submitExpertise(areaOfExpertise,date,uid);
};

