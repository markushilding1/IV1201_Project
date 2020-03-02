const applicationRepository = require("./applications.repository");

/**
 * @author Philip Romin
 * @description Function to get a paginated list of all applications
 * @param query search query
 */
exports.getApplications = async query => {
  try {
    return await applicationRepository.getApplications(query);
  } catch (err) {
    throw new Error("Failed to get applications");
  }
};

/**
 * @author Philip Romin
 * @description Function to get a single application
 * @param query application id
 */
exports.getApplication = async id => {
  try {
    const result = await applicationRepository.getApplication(id);
    return result;
  } catch (err) {
    throw new Error("Failed to get application " + id);
  }
};

/**
 * @author Philip Romin
 * @description Function to update status of an application
 * @param id id of the application
 * @param status new status
 */
exports.updateStatus = async (id, status) => {
  try {
    const result = await applicationRepository.updateStatus(id, status);
    return result;
  } catch (err) {
    throw new Error(
      "Failed to set status to " + status + " on application " + id
    );
  }
};

/**
 * @author Josef Federspiel
 * @description Function to get areas of expertise
 ***/
exports.getAreaOfExpertise = async () => {
    return await applicationRepository.getAreaOfExpertise();
};

/**
 * @author Josef Federspiel
 * @description Function to get submit application
 * @param {array} areaOfExpertise list of user expertise
 * @param {array} date list of user expertise
 * @param {string} uid user unique id
 * @param {date} todayDate current date
 ***/
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
        return await applicationRepository.createApplication(todayDate, uid);
    } catch(err) {
        throw err;
    }

};

