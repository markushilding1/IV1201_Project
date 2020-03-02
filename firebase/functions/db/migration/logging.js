const fs = require('fs');


class Logger{

  constructor(){

  }

  init(){
    const today = Date.now().toISOString();
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

exports.Logger;