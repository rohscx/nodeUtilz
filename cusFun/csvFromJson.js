const Json2csvParser = require('json2csv').Parser;

module.exports = function(data, fields, unwind) {
  return new Promise((resolve, reject) => {
    const opts = { fields, unwind };
    try {
      const json2csvParser = new Json2csvParser(opts);
      const csv = json2csvParser.parse(data);
      console.log(csv);
      resolve(csv);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
