//Import postgresql
const { Pool, Client } = require("pg");
const db = require("../common/db/index");

/**
 * @author Philip Romin
 * @description Helper function to build query based conditions for postgres.
 * @param searchQuery The search query provided by user.
 */
function buildConditions(searchQuery) {
  //Get search query values: Name, Competence, Availability Dates
  const { name, competence, fromDate, toDate } = searchQuery;

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

  //Workaround because front end sends the string 'undefined'
  if (String(fromDate) !== "undefined" && String(toDate) !== "undefined") {
    conditions.push(
      `(a.from_date, a.to_date) OVERLAPS ($${conditions.length +
        1}::DATE, $${conditions.length + 2}::DATE)`
    );
    values.push(fromDate);
    values.push(toDate);
  }

  return {
    where: conditions.length ? conditions.join(" AND ") : "TRUE",
    values: values
  };
}

/**
 * @author Philip Romin
 * @description Function to get a paginated list of all applications.
 * @param searchQuery The search query provided by user.
 */
exports.getApplications = async searchQuery => {
  const { page = 0, limit = 10, sort } = searchQuery;
  console.log(searchQuery);

  //Initialize conditions, sort , limits and build db query
  const conditions = buildConditions(searchQuery);
  let sorts = "";
  if (sort) {
    sorts = ` ORDER BY "createdAt" ${sort}`;
  }
  const limits = ` LIMIT ${limit} OFFSET ${page * limit}`;
  const sql =
    `
  SELECT DISTINCT ap.id, p.name, p.surname, ap."createdAt" 
  FROM person as p, competence as c, competence_profile as cp, availability as a, application as ap
  WHERE p.person_id = cp.person
  AND p.person_id = ap.person
  AND p.person_id = a.person
  AND cp.competence_id = c.competence_id AND ` +
    conditions.where +
    sorts +
    limits;

  /*
  const sqlTotal =
    `
  SELECT count(*) as total_count
  FROM person as p, competence as c, competence_profile as cp, availability as a, application as ap
  WHERE p.person_id = cp.person
  AND p.person_id = ap.person
  AND p.person_id = a.person
  AND cp.competence_id = c.competence_id AND ` +
    conditions.where +
    sorts;
  */

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
    //const total = await client.query(sqlTotal);
    const results = await client.query(sqlQuery);
    console.table(results.rows);
    //console.table(total.rows);
    return results.rows;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to query applications");
  } finally {
    await client.end();
  }
};

/**
 * @author Philip Romin
 * @description Function to get full information about an application
 * @param id The id of the application.
 */
exports.getApplication = async id => {
  const getSql = `
  SELECT DISTINCT 
    ap.id, 
    p.name, p.surname, p.ssn, 
    ap.status, ap."createdAt", 
    ARRAY_AGG(c.name) as competence, 
    ARRAY_AGG(cp.years_of_experience) as yoe,
    ARRAY_AGG(a.from_date) as fromDate,
    ARRAY_AGG(a.to_date) as toDate
  FROM person as p, competence as c, competence_profile as cp, availability as a, application as ap
  WHERE p.person_id = cp.person
  AND p.person_id = ap.person
  AND p.person_id = a.person
  AND cp.competence_id = c.competence_id
  AND ap.id = $1
  GROUP BY ap.id,
  p.name,
  p.surname,
  p.ssn,
  ap."createdAt",
  ap.status`;

  //Query object for pg-node
  const getQuery = {
    text: getSql,
    values: [id]
  };

  //Connect to database via helper function
  const client = db.conn();

  try {
    const results = await client.query(getQuery);
    console.table(results.rows);
    return results.rows;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to query applications");
  } finally {
    await client.end();
  }
};

/**
 * @author Philip Romin
 * @description Function to update status of an application
 * @param id The id of application to update
 */
exports.updateStatus = async (id, status) => {
  const updateSql = `
  UPDATE application
  SET status = $1
  WHERE id = $2
  RETURNING status`;

  //Query object for pg-node
  const updateQuery = {
    text: updateSql,
    values: [status, id]
  };

  //Connect to database via helper function
  const client = db.conn();

  try {
    //const total = await client.query(sqlTotal);
    const results = await client.query(updateQuery);
    console.log(results);
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
    client.query("SELECT * FROM competence", (err, res) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject();
        throw err;
      }
      console.log(res.rows);
      resolve(res.rows);
      client.end();
    });
  });
};

exports.submitAvailability = async (date, uid) => {
  const client = db.conn();

  const values = [uid, date.fromDate, date.toDate];
  return await new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO availability (person,from_date ,to_date) 
       VALUES ($1, $2, $3)`,
      values,
      (err, res) => {
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject();
          throw err;
        }
        console.log("Profile Created");
        resolve("Profile Created");
        client.end();
      }
    );
  });
};

exports.submitExpertise = async (areaOfExpertise, uid) => {
  const client = db.conn();

  const values = [
    uid,
    areaOfExpertise.areaOfExpertiseId,
    areaOfExpertise.yearsOfExperience
  ];
  //INSERT INTO competence osv
  return await new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO competence_profile (person,competence_id ,years_of_experience) 
    VALUES ($1, $2, $3)`,
      values,
      (err, res) => {
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject();
          throw err;
        }
        console.log("Profile Created");
        resolve("Profile Created");
        client.end();
      }
    );
  });
};
