//Import postgresql
const { Pool, Client } = require('pg')

//Optional connectionString, if we want to connect via string instead of config
const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

//Function to get all applications
exports.getAllApplication = async () => {

    //Use either client or pool, not sure which one is best
    const pool = new Pool({config});
    pool.connect();

    const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
    const values = ['brianc', 'brian.m.carlson@gmail.com'];

    try {
        const res = await pool.query(text, values)
        console.log(res.rows[0])
      } catch (err) {
        console.log(err.stack)
      }
}