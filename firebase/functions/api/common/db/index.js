//Import postgresql
const { Client } = require('pg')
const connectionString = "postgres://kehcgpyfmyhjwv:3b48b7924bc552ae528190e7d8c9910693950ffd2d4ef8cf5ec550e571b3f0e5@ec2-54-247-82-14.eu-west-1.compute.amazonaws.com:5432/d52vsqj13b5hgk";


/**
 * @author Markus Hilding
 * @description Initiates database connection and returns
 * it to the caller.
 */
exports.conn = () => {
  const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });

  client.connect();
  return client;
}