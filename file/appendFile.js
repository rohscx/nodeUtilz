const fs = require('fs');

module.exports = function appendFile(relativePath, data, opts) {
  return new Promise((res, rej) => {
    fs.appendFile(relativePath, data, opts, err => {
      if (err) rej(err);
      else res(relativePath);
    });
  });
};
