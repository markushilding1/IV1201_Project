const db = require("../common/db/index.js");

exports.createUserProfile = async body => {
  const { uid, name, surname, ssn } = body;
  const values = [uid, name, surname, ssn, 1];
  const client = db.conn();

  return await new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO person (person_id, name, surname, ssn, role_id)
    VALUES ($1, $2, $3, $4, $5)
    `,
    values, 
    (err, res) => {
      if (err) {
        reject(err);
        throw err;
      }
      client.end();
      resolve(true);
    });
  })
}


exports.getUserProfile = async uid => {
  const values = [uid];
  const client = db.conn();

  return await new Promise((resolve, reject) => {
    client.query(
      `
      SELECT p.name, p.surname, p.person_id, p.ssn, r.name as role
      FROM person as p, role as r 
      WHERE person_id = $1 
      AND p.role_id = r.role_id
      LIMIT 1`,
      values,
      (err, res) => {
        if (err) {
          reject(err);
          throw err;
        }
        client.end();
        resolve(res.rows[0]);
      }
    );
  });
};

/**
 * @author Philip Romin
 * @description Function to update status of an application
 * @param id The id of application to update
 */
exports.getUserRole = async uid => {
  //Query object for pg-node
  const query = {
    text: `
    SELECT role.name 
    FROM role, person
    WHERE person.role_id = role.role_id
    AND person.person_id = $1
    `,
    values: [uid]
  };

  //Connect to database via helper function
  const client = db.conn();

  try {
    const results = await client.query(query);
    return results.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Failed to query database");
  } finally {
    await client.end();
  }
};
