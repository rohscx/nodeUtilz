const fs = require('fs');

module.exports = function readDirectory(relativePath, opts) {
  return new Promise((res, rej) => {
    fs.readdir(relativePath, opts, (err, files) => {
      if (err) rej(err);
      else res(files);
    });
  });
};
