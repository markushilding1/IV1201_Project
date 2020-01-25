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
}

exports.submitApplication = async () => {
  const client = new Client({
    connectionString: 'postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk',
    ssl: true,
  });
  
  client.connect();
  
  //INSERT INTO competence osv
  client.query('CREATE TABLE role (role_id BIGINT PRIMARY KEY, name VARCHAR(255));', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}