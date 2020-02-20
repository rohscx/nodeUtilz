const parseString = require('xml2js').parseString;

// Changes XML to JSON
module.exports = function(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, function(err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};
