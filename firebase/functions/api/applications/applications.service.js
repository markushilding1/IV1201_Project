
const applicationController = require('./applications.repository');
/*
exports.getApplications = (page, limit) => {
    return applicationRepository.getApplications(page, limit);
};
*/
exports.submitApplication = async (areaOfExpertise,date,uid) => {
    for(let i = 0; i < date.length; i++){
        await applicationController.submitAvailability(date[0],uid);
    }
    for(let i = 0; i < areaOfExpertise.length; i++){
        await applicationController.submitExpertise(areaOfExpertise[0],uid);
    }

};

exports.getAreaOfExpertise = async () => (
    await applicationController.getAreaOfExpertise()
);
