// returns only the desired object properties

module.exports = function(data, allowedKeys) {
  return new Promise((resolve, reject) => {
    if (!data | !allowedKeys | (typeof allowedKeys !== 'object'))
      reject({ rejected: ['nodeUtil', 'bad data in Parameter'] });
    const filterFunction = (d, a) => {
      const result = Object.keys(d)
        .filter(key => a.includes(key))
        .reduce((obj, key) => {
          obj[key] = d[key];
          return obj;
        }, {});
      return result;
    };
    if (Array.isArray(data)) {
      const filteredArray = data.map(d => filterFunction(d, allowedKeys));
      resolve(filteredArray);
    } else {
      const filteredObject = filterFunction(data, allowedKeys);
      resolve(filteredObject);
    }
  });
};
