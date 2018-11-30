var fs = require('fs');

module.exports = function writeFile (relativePath,data,opts) {
  return  new Promise((res, rej) => {
        fs.writeFile(relativePath, data, opts, (err) => {
            if (err) rej(err)
            else res(relativePath)
        })
    })
}
