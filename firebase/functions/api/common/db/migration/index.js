const firebaseAuth = require('../../../../firebaseAdmin.js').firebaseAuth;
const fs = require('fs');

const userRepository = require('../../../users/users.repository');
const applicationsRepository = require('../../../applications/applications.repository');
const wipe = require('./wipe');
const legacyDatabase = require('./legacyDatabase');
const utils = require('./utils');
const logging = require('./logging');


// Init db connection.
const connection = legacyDatabase.connect();

// Init logger
const logger = new logging.Logger();
logger.init();

// Import util functions
const snooze = utils.snooze;

const checkValidPassword = (password) => password && password.length >= 6; 

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    /* eslint-disable no-await-in-loop, callback-return */
    await callback(array[index], index, array);
  }
}

/**
 * @author Markus Hilding
 * @description Creates a user on the firebase cloud.
 * @param {object} data 
 */
const createFirebaseUser = (data) => {
  return new Promise((resolve, reject) => {
    firebaseAuth.createUser({
      email: data.email,
      emailVerified: true,
      password: data.password,
      disabled: false
    })
    .then((userRecord) => {
      return resolve(userRecord);
    })
    .catch((err) => {
      logger.log("ERROR", err);
      reject(err);
    });
  });
};

/**
 * @author Markus Hilding
 * @description Deletes a firebase user from the cloud
 * @param {string} uid User unique id
 */
const deleteFirebaseUser = (uid) => {
  return new Promise ((resolve, reject) => {
    firebaseAuth.deleteUser(uid)
      .then(() => {
        logger.log("INFO", `User with uid:${uid} deleted from firebase auth.`);
        return resolve();
      })
      .catch((err) => {
        logger.log("ERROR", `Firebase: Error deleting user with uid:${uid}, Error: ${err.message}`);
      });
  });
};

/**
 * @author Markus Hilding
 * @description Deletes all firebase user from the cloud.
 */
const removeAllFirebaseUsers = () => {
  return new Promise ((resolve) => {
    firebaseAuth.listUsers()
    .then(async (listUsersResult) => {
      await listUsersResult.users.forEach(async (userRecord) => {
        const user = userRecord.toJSON();
        await deleteFirebaseUser(user.uid);
      });

      logger.log("INFO", `User with uid:${user.uid} deleted from firebase auth.`);
      return resolve(true);
    })
    .catch((err) => {
      logger.log("INFO", `${err.message}`);
      return resolve(false);
    });
  });
}


const migratePersons = () => {
  return new Promise ((resolve, reject) => {
    connection.query('SELECT * from person', async (error, results) => {
      if (error) return reject(error);
      if(!results) return reject(new Error("No users found in the database."));
    
      const addedPersons = [];
    
      await results.forEach( async (row) => {
        if(checkValidPassword(row.password)){
          try{
            const userRecord = await createFirebaseUser(row);
      
            // Add uid to person row data.
            row.uid = userRecord.uid;
            
            // Add user to heroku db.
            const userCreated = await userRepository.createUserProfile({
              uid: userRecord.uid, 
              name: row.name, 
              surname: row.surname, 
              ssn: row.ssn,
              role_id: row.role_id,
            });

            // Add the profile data to added persons object for further migration.
            // * If insert to database was successful 
            if(userCreated && row.uid){
              addedPersons.push(row);
            }
    
          } catch (err) {
            logger.log("ERROR", `Firebase: ${err.message}`);
          }
        } else {
          logger.log("ERROR", `Provided user data with uid:${row.uid} & person_id:${row.person_id} is not valid. User will not be created.`);
          try{
            deleteFirebaseUser(row.uid);
          } catch(err){
            logger.log("ERROR", err.message);
          }
        }
      });
      
      return resolve(addedPersons);
    });
  });
};

/**
 * @author Markus Hilding
 * @description Migrates data from table 'role' in
 * old mysql database to table 'role' in 
 * new Heroku postgres db.
 */
const migrateRoleData = () => {
  return new Promise ((resolve, reject) => {
    connection.query('SELECT * FROM role', async (error, results) => {
      if(error) return reject(error);
      if(!results) return resolve();
      await results.forEach(async (row) => {
        const data = {
          role_id:row.role_id,
          name:row.name,
        };
        try{
          await applicationsRepository.createRole(data);
        } catch (err) {
          console.err;
        }
      });
      resolve();
    });
  })
};

/**
 * @author Markus Hilding
 * @description Migrates data from table 'competence' in
 * old mysql database to table 'competence' in 
 * new Heroku postgres db.
 */
const migrateCompetenceData = () => {
  return new Promise ((resolve, reject) => {
    connection.query('SELECT * FROM competence', async (error, results) => {
      if(error) return reject(error);
      if(!results) return resolve();
      await asyncForEach(results, async (row) => {
        const data = {
          competence_id:row.competence_id,
          name:row.name,
        }

        try{
          const res = await applicationsRepository.createCompetence(data);
          logger.log("INFO", JSON.stringify(res));
        } catch (err) {
          logger.log("ERROR", err);
        } 
      });
      return resolve(true);
    });
  })
};

/**
 * @author Markus Hilding
 * @description Migrates data from table 'availability' in
 * old mysql database to table 'availability' in 
 * new Heroku postgres db.
 * @param {object} addedPersons 
 */
const migrateAvailability = (addedPersons) => {
  logger.log("INFO", "\n\nMigrating availability...");
  const personIds = addedPersons.map((person) => person.person_id);
  return new Promise ((resolve, reject) => {
    connection.query('SELECT * FROM availability', async (error, results) => {
      if(error) return reject(error);
      if(!results){
        console.log("No results availability");
        return null;
      }
      
      // add to heroku db.
      //await results.forEach(async (row) => {
      await asyncForEach(results, async (row) => {
        if(personIds.includes(row.person_id)){
          await snooze(1000);
          const uid = addedPersons.find((person) => person.person_id === row.person_id).uid;
          const date = {
              toDate: row.to_date,
              fromDate: row.from_date,
            };
          
          try {
            const result = await applicationsRepository.submitAvailability(date, uid);
            logger.log("INFO", JSON.stringify(result));
          } catch(err){
            logger.log("ERROR", err);
          }
        }
      });
      
      resolve();
    });
  })
};

/**
 * @description Migrates data from table 'competence_profile' in
 * old mysql database to table 'competence_profile' in 
 * new Heroku postgres db.
 * @param {object} addedPersons 
 */
const migrateCompetenceProfiles = async (addedPersons) => {
  logger.log("INFO", "Migrating competence profiles...");
  const personIds = addedPersons.map((person) => person.person_id);
  return await new Promise (async (resolve, reject) => {
  
    connection.query('SELECT * FROM competence_profile', async (error, results) => {
      if(error) return reject(error);
      if(!results) return reject(new Error("No results in table 'competence_profile"));

      // add to heroku db.
      await asyncForEach(results, async (row) => {
        if(personIds.includes(row.person_id)){
          await snooze(1000);
          const uid = addedPersons.find((person) => person.person_id === row.person_id).uid;
          const areaOfExpertise = {
            areaOfExpertiseId: row.competence_id,
            yearsOfExperience: row.years_of_experience,
          }
          
          try {
            const result = await applicationsRepository.submitExpertise(areaOfExpertise, uid);
            logger.log("INFO", JSON.stringify(result));
          } catch(err){
            logger.log("ERROR", err);
          }
        }
      });
      resolve();
    }); 
  })
};

/**
 * @author Markus Hilding
 * @description For each added person during the migration, it
 * adds a initial state for the persons application, which includes
 * status about how the application has been handled (unhandled/accepted/rejected)
 * and which day it was submitted. As data is not present in old database, 
 * the date is set to today's date. 
 * @param {object} addedPersons 
 */
const addApplications = async (addedPersons) => {
  logger.log("INFO", "Adding initial rows to application table...");
  
  return await new Promise (async (resolve) => {
    await asyncForEach(addedPersons, async (person) => {
      await snooze(1000);
      try{
        const result = await applicationsRepository.addInitialApplication(person.uid);
        logger.log("INFO", JSON.stringify(result));
      } catch (err) {
        logger.log("ERROR", err);
      }
    });
    resolve();
  });
};



const migrate = async () => {
  
  try {

    // Wipe heroku postgres db
    console.log("\nWiping postgres database.");
    await wipe.fullWipe();

    // Remove all users from firebase cloud.
    await snooze(1000);
    console.log("\nWiping firebase users...");
    await removeAllFirebaseUsers();

    // Migrate static data
    await snooze(1000);
    console.log("\nMigrating role table...");
    await migrateRoleData();

    await snooze(1000);
    console.log("\nMigrating competence table...");
    await migrateCompetenceData();

    // small sleep as it was noticed that firebase cloud takes some extra time
    // to delete a user totally.
    await snooze(2000);

    // Migrating to 'person' table
    console.log("\nMigrating persons...");
    const addedPersons = await migratePersons();

    await snooze(2000);

    if(addedPersons.length){

      await snooze(3000);
      console.log("\nMigrating availability...");
      await migrateAvailability(addedPersons);
      
      await snooze(3000);
      console.log("\nMigrating competence profiles...");
      await migrateCompetenceProfiles(addedPersons);
      
      await snooze(3000);
      console.log("\nAdding data to application table...");
      await addApplications(addedPersons);
      
      console.log("\nMigration done.");
    } else {
      console.log("No new person data to migrate.");
    }

  } catch (err) {
    logger.log("ERROR", err);
  } finally{
    connection.end();
    process.exit();
  }
};

migrate();


