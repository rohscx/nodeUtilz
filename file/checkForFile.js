const fs = require('fs');
const logCapture = require('../debug/logCapture.js');

//check, if a file or directory exists
module.exports = function readFile(relativePath, callBack) {
  const myLogs = new logCapture();
  return new Promise((res, rej) => {
    if (fs.existsSync(path)) {
      // Do something if it does not e
      myLogs.addLog(fs.existsSync(path));
      myLogs.getLogs('FgRed');
    } else {
      res(callBack());
    }
  });
};
