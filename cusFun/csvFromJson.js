const Json2csvParser = require('json2csv').Parser;

module.exports = function(data, fields, options = {debug:false, unwind:false}) {
  const {debug, unwind} = options;
  return new Promise((resolve, reject) => {
    //const opts = { fields, unwind };
    try {
      const json2csvParser = new Json2csvParser(opts);
      const csv = json2csvParser.parse(data);
      if (debug) console.log(csv);
      resolve(csv);
    } catch (err) {
      if (debug) console.error(err);
      reject(err);
    }
  });
};
