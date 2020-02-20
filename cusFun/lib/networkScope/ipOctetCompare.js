module.exports = function ipOctetCompare(a, b) {
  return parseInt(a, 2) & parseInt(b, 2);
};
