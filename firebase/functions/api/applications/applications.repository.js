//Import postgresql
const { Pool, Client } = require('pg')

//Helper function to build query based on conditions
function buildConditions(searchQuery) {
  //Get search query values: Name, Competence, Availability Dates, Application Date
  const { name, competence, fromDate, toDate, applicationDate } = searchQuery;

  var conditions = [];
  var values = [];

  if (name) {
    conditions.push(`p.name LIKE $${conditions.length+1}`);
    values.push("%" + name + "%");
  }

  if (competence) {
    conditions.push(`c.name = $${conditions.length+1}`);
    values.push(competence);
  }

  return {
    where: conditions.length ? conditions.join(' AND ') : 'TRUE',
    values: values
  };
}

//Function to get a paginated list of all applications. Which information do we want to show?
exports.getApplications = async (searchQuery) => {
  const { page } = searchQuery;
  //Hardcoded limit for pagination, could also be specified by user.
  const limit = 10;

  //Initialize a query
  var conditions = buildConditions(searchQuery);
  var limits = ` LIMIT ${limit} OFFSET ${(page-1)*limit}`
  var sql = `
  SELECT DISTINCT p.name, p.surname
  FROM person as p, competence as c, competence_profile as cp, availability as a
  WHERE p.person_id = cp.person_id::varchar
  AND cp.competence_id = c.competnce_id AND `
  + conditions.where + limits;
  console.log(sql);
  console.log(conditions.values);

  //Initialize client
  const client = new Client({
    //Should probably not be on git, move to a config file
    connectionString: 'postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk',
    ssl: true,
  });

  //Build sql query
  const sqlQuery = {
    text: sql,
    values: conditions.values,
  }

  try {
    await client.connect();
    const results = await client.query(sqlQuery);
    console.table(results.rows);
  } catch (err) {
      console.log(err);
      throw new Error();
  } finally {
      await client.end();
  }
};

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

