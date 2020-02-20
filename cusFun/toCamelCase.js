module.exports = function(data, splitOn = ' ') {
  const splitString = data.split(splitOn);
  if (splitString.length > 0) {
    return splitString.reduce((n, o, i) => {
      const lowerCaseString = o.toLowerCase();
      if (i === 0) {
        n = lowerCaseString;
      } else {
        const camelString = lowerCaseString
          .split('')
          .map((d, i) => (i === 0 ? d.toUpperCase() : d.toLowerCase()))
          .join('');
        n = n + camelString;
      }
      return n;
    }, '');
  } else {
    return data.toLowerCase;
  }
};
