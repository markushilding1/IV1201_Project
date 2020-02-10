
const applicationController = require('./applications.repository');
/*
exports.getApplications = (page, limit) => {
    return applicationRepository.getApplications(page, limit);
};
*/
exports.submitApplication = async (areaOfExpertise,date,uid) => {
    await applicationController.submitAvailability(areaOfExpertise,date,uid);
    await applicationController.submitExpertise(areaOfExpertise,date,uid);
};

exports.getAreaOfExpertise = async () => (
    await applicationController.getAreaOfExpertise()
);
