var fs = require('fs');

module.exports = function readFile (relativePath,opts) {
  return new Promise((res, rej) => {
    fs.readFile(relativePath, opts, (err, data) => {
        if (err) rej(err)
        else res(data)
    })
})}
