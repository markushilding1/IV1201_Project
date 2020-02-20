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

  if (fromDate !== "undefined" && toDate !== "undefined") {
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
 * @description Function to get a paginated list of all applications. Which information do we want to show?
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
  SELECT DISTINCT p.name, p.surname, ap."createdAt" , count(*) over(PARTITION BY p.name) as total_count
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

exports.submitApplication = async () => {
  const client = new Client({
    connectionString:
      "postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk",
    ssl: true
  });

  client.connect();

  //INSERT INTO competence osv
  client.query(
    "CREATE TABLE role (role_id BIGINT PRIMARY KEY, name VARCHAR(255));",
    (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    }
  );
};
