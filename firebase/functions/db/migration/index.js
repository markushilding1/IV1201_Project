const firebaseAuth = require('./../../firebaseAdmin.js').firebaseAuth;
const fs = require('fs');

const userRepository = require('./../../api/users/users.repository');
const applicationsRepository = require('./../../api/applications/applications.repository');
const wipe = require('./../../api/common/db/wipe');
const legacyDatabase = require('./legacyDatabase');
const utils = require('./utils');


// Init db connection.
const connection = legacyDatabase.connect();

// Import util functions
const snooze = utils.snooze;

const checkEmailValid = (email) => {
  return true;
}

const checkSSNValid = (ssn) => {
  return true //ssn && ssn.length === 13;
}

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
      console.err;
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
        return resolve();
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
  });
};

/**
 * @author Markus Hilding
 * @description Deletes all firebase user from the cloud.
 */
const removeAllFirebaseUsers = () => {
  return new Promise ((resolve) => {
    // List batch of users, 1000 at a time.
    firebaseAuth.listUsers()
    .then(async (listUsersResult) => {
      await listUsersResult.users.forEach(async (userRecord) => {
        const user = userRecord.toJSON();
        await deleteFirebaseUser(user.uid);
      });
      console.log("Users deleted from firebase.");
      return resolve(true);
    })
    .catch((error) => {
      console.log('Error listing users:', error);
      return resolve(false);
    });
  });
}


const migratePersons = () => {
  return new Promise ((resolve, reject) => {
    connection.query('SELECT * from person', async (error, results, fields) => {
      if (error) return reject(error);
      if(!results) return reject(new Error("No users found in the database."));
    
      const addedPersons = [];
    
      await results.forEach( async (row) => {
        if(checkEmailValid(row.email) && checkSSNValid(row.ssn) && checkValidPassword(row.password)){
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
            });

            // Add the profile data to added persons object for further migration.
            // * If insert to database was successful 
            if(userCreated){
              addedPersons.push(row);
            }
    
          } catch (err) {
            console.log(`Firebase: `, err.message);
          }
        } else {
          console.log("User data not valid");
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
      await results.forEach(async (row) => {
        const data = {
          competence_id:row.competence_id,
          name:row.name,
        }
        try{
          await applicationsRepository.createCompetence(data);
        } catch (err) {
          console.err;
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
  const personIds = addedPersons.map((person) => person.person_id);
  return new Promise ((resolve, reject) => {
    connection.query('SELECT * FROM availability', async (error, results) => {
      if(error) return reject(error);
      if(!results){
        console.log("No results availability");
        return null;
      } //return reject(new Error("No results in table 'availability"));
      
      // add to heroku db.
      //await results.forEach(async (row) => {
      await asyncForEach(results, async (row) => {
        if(personIds.includes(row.person_id)){
          await snooze(500);
          const uid = addedPersons.find((person) => person.person_id === row.person_id).uid;
          const date = {
              toDate: row.to_date,
              fromDate: row.from_date,
            };
          
          try {
            await applicationsRepository.submitAvailability(date, uid);
          } catch(err){
            console.log("error");
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
const migrateCompetenceProfiles = (addedPersons) => {
  return new Promise (async (resolve, reject) => {
    await asyncForEach(addedPersons, async (person) => {
      connection.query('SELECT * FROM competence_profile WHERE person_id = ?', [person.person_id], async (error, results) => {
        if(error) return reject(error);
        if(!results) return reject(new Error("No results in table 'competence_profile"));

        // add to heroku db.
        await asyncForEach(results, async (row) => {
          
          await snooze(500);
          const uid = person.uid;
          const areaOfExpertise = {
            areaOfExpertiseId: row.competence_id,
            yearsOfExperience: row.years_of_experience,
          }
          
          try {
            await applicationsRepository.submitExpertise(areaOfExpertise, uid);
          } catch(err){
            console.err;
          }
        });
      }); 
    });

    resolve();
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
  return await new Promise (async (resolve) => {
    await addedPersons.map(async (person) => {
      try{
        await applicationsRepository.addInitialApplication(person.uid);
      } catch (err) {
        console.log(err);
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
    console.log("\nWiping firebase users...");
    await removeAllFirebaseUsers();

    // Migrate static data
    console.log("\nMigrating role table...");
    await migrateRoleData();

    console.log("\nMigrating competence table...");
    await migrateCompetenceData();

    // small sleep as it was noticed that firebase cloud takes some extra time
    // to delete a user totally.
    await snooze(5000);

    // Migrating to 'person' table
    console.log("\nMigrating persons...");
    const addedPersons = await migratePersons();

    await snooze(5000);

    console.log(addedPersons);
    if(addedPersons.length){

      console.log("\nMigrating availability...");
      await migrateAvailability(addedPersons);
      
      console.log("\nMigrating competence profiles...");
      await migrateCompetenceProfiles(addedPersons);
      
      console.log("\nAdding data to application table...");
      await addApplications(addedPersons);

    } else {
      console.log("No new person data to migrate.");
    }

  } catch (err) {
    console.err;
  } finally{
    connection.end();
    process.exit();
  }
};




migrate();


