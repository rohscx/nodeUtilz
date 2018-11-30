var fs = require('fs');

module.exports = function readStream (fileData,callBack) {
  return  new Promise((res, rej) => {
    //if (err) rej(err) // make error handler, check for file exist maybe?
    const buffer = Buffer.from(fileData, 'utf8'); // this takes a string formated as a csv and crates a bufffer.
    console.log(buffer)
    //const stream = fs.createReadStream(buffer); // this acctually creates a buffer out of a locally stored file.
    res(callBack(buffer));
  })
}
