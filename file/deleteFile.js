var fs = require('fs');

module.exports = function deleteFile (sourceFile) {
  return new Promise((res, rej) => {
    fs.unlink(sourceFile, (err, data) => {
        if (err) rej(err)
        else res(sourceFile)
    })
})}
