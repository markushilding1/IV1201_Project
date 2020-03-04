const mysql        = require('mysql');

// mysql config
const oldDbConfig = {
  host:'localhost',
  user:'root',
  pass:'mysql_dev',
  database:'amusement_park',
};

// Connection to old database (locally)
exports.connect = () => {
  try{
    return mysql.createConnection({
      host     : oldDbConfig.host,
      user     : oldDbConfig.user,
      password : oldDbConfig.pass,
      database : oldDbConfig.database,
    });
  } catch(err){
    return process.exit(err);
  }
}