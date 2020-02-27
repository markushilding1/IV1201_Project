const firebaseAuth = require('./../../firebaseAdmin.js').firebaseAuth;
const mysql        = require('mysql');

const userRepository = require('./../../api/users/users.repository');
const applicationsRepository = require('./../../api/applications/applications.repository');
const wipe = require('./../../common/db/wipe');

// mysql config
const oldDbConfig = {
  host:'localhost',
  user:'root',
  pass:'mysql_dev',
  database:'amusement_park',
};

// Connection to old database (locally)
var connection = mysql.createConnection({
  host     : oldDbConfig.host,
  user     : oldDbConfig.user,
  password : oldDbConfig.pass,
  database : oldDbConfig.database,
});

// Init db connection.
connection.connect();


const checkEmailValid = (email) => {
  return true;
}

const checkSSNValid = (ssn) => {
  return ssn && ssn.length === 13;
}

const checkValidPassword = (password) => password && password.length >= 6; 

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
    .catch((error) => {
      reject(error);
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
    .then((listUsersResult) => {
      listUsersResult.users.forEach(async (userRecord) => {
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
    
      const addedPersons = {};
    
      await results.forEach( async (row) => {
        if(checkEmailValid(row.email) && checkSSNValid(row.ssn) && checkValidPassword(row.password)){
          try{
            const userRecord = await createFirebaseUser(row);
    
            // Add uid to person row data.
            row.uid = row;
            
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
              addedPersons[row.person_id] = row;
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
    connection.query('SELECT * FROM role', async (error, results, fields) => {
      if(error) return reject(error);
      if(!results) return resolve();
      await results.forEach(async (row) => {
        const data = {
          id:row.id,
          name:row.name,
        };
        try{
          await applicationsRepository.createRole(data);
        } catch (err) {
          console.err;
        }
      });
      resolve(true);
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
    connection.query('SELECT * FROM competence', async (error, results, fields) => {
      if(error) return reject(error);
      if(!results) return resolve();
      await results.forEach(async (row) => {
        try{
          await applicationsRepository.createCompetence(row.name);
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
  return new Promise ((resolve, reject) => {
    addedPersons.forEach(async (person) => {
      connection.query('SELECT * FROM availability WHERE person = ?', [person.uid],async (error, results, fields) => {
        if(error) return reject(error);
        if(!results){
          console.log("No results availability");
          return null;
        } //return reject(new Error("No results in table 'availability"));

        // add to heroku db.
        await results.forEach((row) => {
          applicationsRepository.submitAvailability({
            date:{
              toDate: row.toDate,
              fromDate: row.fromDate,
            },
            uid: person.uid,
          });
        });
      }); 
    });

    resolve(true);
  })
};

/**
 * @description Migrates data from table 'competence_profile' in
 * old mysql database to table 'competence_profile' in 
 * new Heroku postgres db.
 * @param {object} addedPersons 
 */
const migrateCompetenceProfiles = (addedPersons) => {
  return new Promise ((resolve, reject) => {
    addedPersons.forEach(async (person) => {
      connection.query('SELECT * FROM competence_profile', async (error, results, fields) => {
        if(error) return reject(error);
        if(!results) return reject(new Error("No results in table 'competence_profile"));

        await results.forEach((row) => {
          console.log(row);
          /*
          const data = {
            areaOfExpertise,
            uid: person.uid,
          };
          
          applicationsRepository.submitExpertise(data);
          */
        });
      }); 
    });

    resolve(true);
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
const addApplications = (addedPersons) => {
  return new Promise ((resolve) => {
    addedPersons.forEach(async (person) => {
      try{
        await applicationsRepository.addInitialApplication(person.uid);
      } catch (err) {
        console.err;
      }
    });
    resolve();
  });
};


const migrate = async () => {
  
  try {

    // Wipe heroku postgres db
    await wipe.fullWipe();

    // Remove all users from firebase cloud.
    await removeAllFirebaseUsers();

    // Migrate static data
    await migrateRoleData();
    await migrateCompetenceData();

    // Migrating to 'person' table
    const addedPersons = await migratePersons();

    console.log(addedPersons);
    if(addedPersons && Object.keys(addedPersons).length){
      await migrateAvailability(addedPersons);
      await migrateCompetenceProfiles(addedPersons);
      await addApplications(addedPersons);
    } else {
      console.log("No new person data to migrate.");
    }

  } catch (err) {
    throw err;
  }

  connection.end();
};




migrate();


