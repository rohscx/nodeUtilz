var fs = require('fs');

module.exports = function copyFile(source, destination) {
  return new Promise((res, rej) => {
    fs.copyFile(source, destination, (err, data) => {
      if (err) rej(err);
      else res(destination);
    });
  });
};
