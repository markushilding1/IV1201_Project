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

/**
 * @author Philip Romin
 * @description Function to get full information about an application
 * @param id The id of the application.
 */
exports.getApplication = async id => {
  const getSql = `
  SELECT  
    ap.id, 
    p.name, p.surname, p.ssn, 
    ap.status, ap."createdAt", 
    ARRAY_AGG(DISTINCT c.name) as competence, 
    ARRAY_AGG(DISTINCT cp.years_of_experience) as yoe,
    ARRAY_AGG(DISTINCT a.from_date) as fromDate,
    ARRAY_AGG(DISTINCT a.to_date) as toDate
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

  try{
    const results = await client.query(updateQuery);
    return results.rows;
  } catch (err){
    throw new Error("Failed to query applications");
  } finally{
    await client.end();
  }
};

/**
 @author Josef Federspiel
 * @description Adds an application to the database if the user already
 * has one it is updated. Throws error on failure
 *  @param {date,string}
 **/
exports.createApplication = async (date, uid) => {
  const client = db.conn();
  const values = [uid, date];

  return await new Promise(async (resolve, reject) => {
    try{
    const result = await client.query(
      `INSERT INTO application (person,"createdAt")
      VALUES ($1,$2) 
      ON CONFLICT (person) 
      DO UPDATE
      SET "createdAt" = $2;`,
      values);
      resolve(result);
    } catch(err){
      reject(err);
    } finally{
      await client.end();
    }
  });
};

/**
 @author Josef Federspiel
 * @description Adds a to and from dates to the database and
 *  throws an error on a failed attempt.
 *  @param {object} date {
 *    date:({date,date}),
 * }
 * @param {string} uid sting with user id
 **/
exports.submitAvailability = async (date, uid) => {
  const client = db.conn();
  const values = [uid, date.fromDate, date.toDate];

  return await new Promise(async (resolve, reject) => {
    try{
      const result = await client.query(
        `INSERT INTO availability (person,from_date ,to_date) 
        VALUES ($1, $2, $3)`,
        values);
      resolve(result);
    } catch(err){
      reject(err);
    } finally{
      await client.end();
    }
  });
};

/**
 @author Josef Federspiel
 * @description Adds an area of expertise to the database and
 *  throws an error on a failed attempt.
 *  @param {object} areaOfExpertise Example {
 *    areaOfExpertise:(object),
 * }
 *  @param {string} uid user id string
 **/
exports.submitExpertise = async (areaOfExpertise, uid) => {
  const client = db.conn();
  const values = [
    uid,
    areaOfExpertise.areaOfExpertiseId,
    areaOfExpertise.yearsOfExperience
  ];

  return await new Promise(async (resolve, reject) => {
    try{
      const result = await client.query(
        `INSERT INTO competence_profile (person,competence_id ,years_of_experience) 
        VALUES ($1, $2, $3)
        ON CONFLICT (person,competence_id) 
        DO UPDATE
        SET "years_of_experience" = $3;`,
        values);
      resolve(result);
    } catch(err){
      reject(err);
    } finally {
      await client.end();
    }
  });
};

/**
 @author Josef Federspiel
 * @description Gets areas of expertise from the database.
 * throws error on a failure
**/
exports.getAreaOfExpertise = async () => {
  const client = db.conn();

  return await new Promise(async (resolve, reject) => {
    try{
      const result = await client.query("SELECT * FROM competence");
      resolve(result.rows);
    } catch(err){
      reject(err);
    } finally{
      await client.end();
    }
  });
};

/**
 * @description Creates an entry in the table 'competence'
 * @author Markus Hilding
 * @param {name} string Name of competence
 */
exports.createCompetence = async (data) => {
  const client = db.conn();
  return await new Promise(async (resolve, reject) => {
    try{
      const result = await client.query(`
        INSERT INTO competence
        (competence_id, name) 
        VALUES ($1, $2)`
        ,[data.competence_id, data.name]);
      resolve(result);
    } catch(err){
      reject(err);
    } finally{
      await client.end();
    }
  });
};

/**
 * @description Creates an entry in the table 'role'
 * @author Markus Hilding
 * @param {data} object
 *       {
 *          id (number),
 *          name (string)
 *       }
 */
exports.createRole = async (data) => {
  const client = db.conn();
  return await new Promise(async (resolve, reject) => {
    try{
      const result = await client.query(`
        INSERT INTO role
        (role_id, name) 
        VALUES ($1, $2)`
        ,[data.role_id, data.name]); 
      resolve(result);
    } catch(err){
      reject(err);
    } finally{
      client.end();
    }
  });
};

/**
 * @author Markus Hilding
 * @description Creates the initial application row
 * for a person. Used during database migration.
 * @param {object} data
 */
exports.addInitialApplication = async (uid) => {
  const client = db.conn();
  const today = new Date().toISOString().slice(0,10);
  const insertData = [
    uid,
    today,
  ];
  
  return await new Promise( async (resolve, reject) => {
    try{
      const result = await client.query(`
        INSERT INTO application
        (person, "createdAt") 
        VALUES ($1, $2)`
        , insertData);
      resolve(result);
    } catch(err){
      reject(err);
    } finally{
      await client.end();
    }
  });
}