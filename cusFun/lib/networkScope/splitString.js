module.exports = function splitString(data, splitOn = '\n') {
  return new Promise((resolve, reject) => {
    const splitString = data.split(splitOn);
    const trimString = splitString.map(d => {
      return d.trim();
    });
    const dataString = trimString.filter(f => f.length > 0);
    if (dataString.length === 0) return reject(dataString);
    return resolve(dataString);
  });
};
