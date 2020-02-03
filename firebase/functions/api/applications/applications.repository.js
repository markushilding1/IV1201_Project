//Import postgresql
const { Pool, Client } = require("pg");
const db = require("../common/db/index");

/**
 * @author Philip Romin
 * @description Helper function to build query based conditions for postgres.
 * @param searchQuery The search query provided by user.
 */
function buildConditions(searchQuery) {
  //Get search query values: Name, Competence, Availability Dates, Application Date
  const { name, competence, fromDate, toDate, applicationDate } = searchQuery;

  var conditions = [];
  var values = [];

  if (name) {
    conditions.push(`p.name LIKE $${conditions.length + 1}`);
    values.push("%" + name + "%");
  }

  if (competence) {
    conditions.push(`c.name = $${conditions.length + 1}`);
    values.push(competence);
  }

  return {
    where: conditions.length ? conditions.join(" AND ") : "TRUE",
    values: values
  };
}

/**
 * @author Philip Romin
 * @description Function to get a paginated list of all applications. Which information do we want to show?
 * @param searchQuery The search query provided by user.
 */
exports.getApplications = async searchQuery => {
  const { page = 1, limit = 10 } = searchQuery;

  //Initialize conditions, limits and build db query
  const conditions = buildConditions(searchQuery);
  const limits = ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
  const sql =
    `
  SELECT DISTINCT p.name, p.surname
  FROM person as p, competence as c, competence_profile as cp, availability as a
  WHERE p.person_id = cp.person_id::varchar
  AND cp.competence_id = c.competence_id AND ` +
    conditions.where +
    limits;

  console.log(sql);
  console.log(conditions.values);

  //Query object for pg-node
  const sqlQuery = {
    text: sql,
    values: conditions.values
  };

  //Connect to database via helper function
  const client = db.conn();

  try {
    const results = await client.query(sqlQuery);
    console.table(results.rows);
    return results.rows;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to query applications");
  } finally {
    await client.end();
  }
};

exports.submitApplication = async () => {

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
            reject();
            throw err;
          }
          client.end();
          resolve(res.rows);
        });
  })
}

exports.submitApplication = async (areaOfExpertise,availPeriods) => {
  const client = new Client({
    connectionString: 'postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk',
    ssl: true,
  });
  
  client.connect();
  
  //INSERT INTO competence osv
  areaOfExpertise.forEach(item =>
      client.query(`INSERT INTO competence (competence_id , name) 
      VALUES(${item.id},${item.name}`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
  }));
  availPeriods.forEach(item =>
      client.query(`INSERT INTO competence (competence_id , name) 
      VALUES(${item.availability_id},${item.from_date},${item.person_id}, ${item.to_date}`, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
  }));
  client.end();

};
