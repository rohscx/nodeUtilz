module.exports = function keyHasValue (data) {
  const test = data.map(d => {
    // if all is good this should return an empty array.
    return Object.keys(d).filter(f => d[f] === undefined || !d[f].length)
  });
  if (test.length > 0) {
    return false; // there is a problem
  } else {
    return true; // there is no problem
  }
}
