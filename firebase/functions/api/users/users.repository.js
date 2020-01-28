
const db = require('../common/db/index.js');

exports.createUserProfile = async (body) => {
  const { uid, name, surname, ssn } = body;
  const values = [uid, name, surname, ssn, 1];
  const client = db.conn();

  return await new Promise((resolve, reject) => {

    client.query(`INSERT INTO person (person_id, name, surname, ssn, role_id)
    VALUES ($1, $2, $3, $4, $5)
    `,
    values, 
    (err, res) => {
      if (err) {
        reject();
        throw err;
      };
      client.end();
      console.log("User created");
      resolve("USER CREATED");
    });
  })
}


exports.getUserProfile = async (uid) => {
  const values = [uid];
  const client = db.conn();

  return await new Promise((resolve, reject) => {
    client.query(`
      SELECT p.name, p.surname, p.person_id, p.ssn, r.name as role
      FROM person as p, role as r 
      WHERE person_id = $1 
      AND p.role_id = r.role_id
      LIMIT 1`,
    values, 
    (err, res) => {
      if (err) {
        reject();
        throw err;
      };
      client.end();
      resolve(res.rows[0]);
    });
  })
}


/*
const dropPersonTable = () => {
  
  const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });

  client.connect();

  //INSERT INTO competence osv
  client.query(`
    DROP TABLE person CASCADE
  `, 
  (err, res) => {
    if (err) throw err;
    console.log(res);
    client.end();
  });

}


const createPersonTable = () => {
  
  const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });

  client.connect();

  //INSERT INTO competence osv
  client.query(`
    CREATE TABLE person (
      person_id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      surname VARCHAR(255),
      ssn VARCHAR(255),
      role_id BIGINT REFERENCES role
    )
  `, 
  (err, res) => {
    if (err) throw err;
    console.log(res);
    client.end();
  });

}

*/