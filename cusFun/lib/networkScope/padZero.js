module.exports = function padZero(n) {
  let newString = '';
  for (let y = 0; y != n; y++) {
    newString = newString + '1';
  }

  do {
    newString = newString + '0';
  } while (newString.length < 8);
  return newString;
};
