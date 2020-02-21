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

exports.getAreaOfExpertise = async () => {
  const client = db.conn();

  return await new Promise((resolve, reject) => {
    client.query('SELECT * FROM competence',
        (err, res) => {
          if (err) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject();
            throw err;
          }
          console.log(res.rows);
          resolve(res.rows);
          client.end();
        });
  })
};

exports.submitAvailability = async (date,uid) => {
  const client = db.conn();

  const values = [uid,date.fromDate,date.toDate];
  return await new Promise((resolve, reject) => {
    client.query(`INSERT INTO availability (person,from_date ,to_date) 
       VALUES ($1, $2, $3)` ,values, (err, res) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject();
        throw err;
      }
      console.log("Profile Created");
      resolve("Profile Created");
      client.end();
    });
  });
};

exports.submitExpertise = async (areaOfExpertise,uid) => {
  const client = db.conn();

  const values = [uid,areaOfExpertise.areaOfExpertiseId,areaOfExpertise.yearsOfExperience,]
  //INSERT INTO competence osv
    return await new Promise((resolve, reject) => {
    client.query(`INSERT INTO competence_profile (person,competence_id ,years_of_experience) 
    VALUES ($1, $2, $3)`,values ,(err, res) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject();
        throw err;
      }
      console.log("Profile Created");
      resolve("Profile Created");
      client.end();
    });
  });
};
