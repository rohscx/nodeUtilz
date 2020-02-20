module.exports = function(data) {
  return new Promise((resolve, reject) => {
    if (typeof data !== 'string') reject(data);
    if (typeof data === undefined) reject(undefined);
    const stringObject = data
      .replace(/,/g, '')
      .replace(/(\[|\])/g, '')
      .split(' ')
      .filter(f => f.length > 0);
    let arrayObject;
    try {
      stringifiedArrayObject = JSON.stringify(stringObject);
    } catch (error) {
      return reject(stringObject);
    }
    return resolve(arrayObject);
  });
};
