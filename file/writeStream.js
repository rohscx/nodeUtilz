var fs = require('fs');

module.exports = function writeStream(relativePath, stream) {
  return new Promise((res, rej) => {
    //if (err) rej(err) // make error handler, check for file exist maybe?
    res(stream.pipe(fs.createWriteStream(relativePath)));
  });
};
