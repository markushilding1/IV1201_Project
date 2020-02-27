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
    const result = await applicationRepository.getAreaOfExpertise();
    return result;
}

exports.submitApplication = async (areaOfExpertise,date,uid,todayDate) => {
   for(let i = 0; i < date.length; i++){
        // eslint-disable-next-line no-await-in-loop
        await applicationRepository.submitAvailability(date[i], uid);
    }
    for(let i = 0; i < areaOfExpertise.length; i++){
        // eslint-disable-next-line no-await-in-loop
        await applicationRepository.submitExpertise(areaOfExpertise[i], uid);
    }
    try {
        const result = await applicationRepository.createApplication(todayDate,uid);
        return result;
    } catch(err) {
        console.log('Error reached service')
        throw err;
    }
};

