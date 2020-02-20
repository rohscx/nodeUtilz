module.exports = function(data) {
  const fileTime = +data; // coerce to interger
  if (typeof fileTime != 'number') return null; // make sure its an integer
  const asUnixEpoch = fileTime / 1e4 - 1.16444736e13; // convert to UNIX time
  const date = new Date(asUnixEpoch);
  return date.toString();
};
