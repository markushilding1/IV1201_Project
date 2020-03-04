/**
 * @description Module with functions to wipe 
 * all the data from the Heroku postgres database.
 */

const db = require("./../index");

/**
 * @author Markus Hilding
 * @description Deletes all tables from Heroku postgres db
 */
exports.fullWipe = () => {
  return new Promise (async (resolve, reject) => {
    try{
      await wipeCompetenceProfile();
      await wipeAvailability();
      await wipeApplications();
      await wipePerson();
      await wipeRole();
      await wipeCompetence();
      
      return resolve();
    } catch (err) {
      return reject(err);
    }
  });
};

/**
 * @author Markus Hilding
 * @description Deletes all rows from table 'person'
 */
const wipePerson = () => {
  client = db.conn();
  return new Promise ((resolve, reject) => {
    client.query('DELETE FROM person', async (error, results) => {
      if (error) return reject(error);
      if(!results) return reject(new Error("Could not delete from person."));
      return resolve();
    });
  });
};

/**
 * @author Markus Hilding
 * @description Deletes all rows from table 'application'
 */
const wipeApplications = () => {
  client = db.conn();
  return new Promise ((resolve, reject) => {
    client.query('DELETE FROM application', async (error, results) => {
      if (error) return reject(error);
      if(!results) return reject(new Error("Could not delete from application."));
      return resolve();
    });
  });
};

/**
 * @author Markus Hilding
 * @description Deletes all rows from table 'role'
 */
const wipeRole = () => {
  client = db.conn();
  return new Promise ((resolve, reject) => {
    client.query('DELETE FROM role', async (error, results) => {
      if (error) return reject(error);
      if(!results) return reject(new Error("Could not delete from role."));
      return resolve();
    });
  });
};

/**
 * @author Markus Hilding
 * @description Deletes all rows from table 'competence'
 */
const wipeCompetence = () => {
  client = db.conn();
  return new Promise ((resolve, reject) => {
    client.query('DELETE FROM competence', async (error, results) => {
      if (error) return reject(error);
      if(!results) return reject(new Error("Could not delete from competence."));
      return resolve();
    });
  });
};

/**
 * @author Markus Hilding
 * @description Deletes all rows from table 'competence_profile'
 */
const wipeCompetenceProfile = () => {
  client = db.conn();
  return new Promise ((resolve, reject) => {
    client.query('DELETE FROM competence_profile', async (error, results) => {
      if (error) return reject(error);
      if(!results) return reject(new Error("Could not delete from competence_profile."));
      return resolve();
    });
  });
};

/**
 * @author Markus Hilding
 * @description Deletes all rows from table 'availability'
 */
const wipeAvailability = () => {
  client = db.conn();
  return new Promise ((resolve, reject) => {
    client.query('DELETE FROM availability', async (error, results) => {
      if (error) return reject(error);
      if(!results) return reject(new Error("Could not delete from availability."));
      return resolve();
    });
  });
};
