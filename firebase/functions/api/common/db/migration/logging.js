const fs = require('fs');


class Logger{

  init(){
    const today = new Date().toISOString();
    fs.writeFile('log.txt', `\n${today}`, (err) => {
      if (err) throw err;
    });
  }

  log(level, content){
    fs.appendFile('log.txt', `\n${level}\t${content}`, (err) => {
      if (err) throw err;
    });
  }

}

exports.Logger = Logger;