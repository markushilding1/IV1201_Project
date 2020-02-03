const applicationController = require('./applications.repository');
/*
exports.getApplications = (page, limit) => {
    return applicationRepository.getApplications(page, limit);
};

exports.submitApplication = (areaOfExpertise,availPeriods) => {
    return applicationRepository.getApplications(areaOfExpertise,availPeriods);
};*/

exports.getAreaOfExpertise = async () => (
    await applicationController.getAreaOfExpertise()
);
