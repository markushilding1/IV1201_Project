//Import postgresql
const { Pool, Client } = require('pg')

//Optional connectionString, if we want to connect via string instead of config
const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

//Function to get a paginated list of all applications. Which information do we want to show?
exports.getApplications = async (page, limit) => {
  //Get search query values: Time period, application date, competence, name

  //Initialize a query

  //Check if search queries exist, if so add WHERE clause to query

  
  const client = new Client({
    //Should probably not be on git, move to a config file
    connectionString: 'postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk',
    ssl: true,
  });
  
  client.connect();
  
  client.query(`  
    LIMIT ${limit} OFFSET ${(page - 1) * limit}
  `, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
};

exports.getAreaOfExpertise = async () => {
  const client = new Client({
    connectionString: 'postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk',
    ssl: true,
  });

  client.connect();

  return await new Promise((resolve, reject) => {
    client.query('SELECT *\n' +
        '      FROM competence',
        (err, res) => {
          if (err) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject();
            throw err;
          }
          client.end();
          resolve(res.rows);
        });
  })
};

exports.submitAvailability = async (areaOfExpertise,date,uid) => {
  const client = new Client({
    connectionString: 'postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk',
    ssl: true,
  });
  client.connect();
  const from_date = date[0];
  const to_date = date[1];
  console.log(date[0]);
  console.log(date[1]);

  return await new Promise((resolve, reject) => {
    client.query(`INSERT INTO availability (availability_id,person_id,from_date ,to_date) 
      VALUES(3,2,${from_date}::text::date,${to_date}::text::date)`, (err, res) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject();
        throw err;
      }
      client.end();
      resolve("Profile Created");
    });
  });
};

  exports.submitExpertise = async (areaOfExpertise,date,uid) => {
  const client = new Client({
    connectionString: 'postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk',
    ssl: true,
  });
  
  client.connect();
  //INSERT INTO competence osv
  return await new Promise((resolve, reject) => {
    console.log(areaOfExpertise);
    console.log(date);
    console.log(uid);
    client.query(`INSERT INTO competence_profile (Competence_profile_id,Person_id,Competence_id ,Years_of_experience) 
    VALUES(6,${uid},2,4)`, (err, res) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject();
        throw err;
      }
      client.end();
      resolve("Profile Created");
    });
  });
};