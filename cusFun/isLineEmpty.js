// it fast because it generate a hash table. Kinda like the MAC Oui look up thing you made.
module.exports = function isLineEmpty(data) {
  const trimmed = data.trim();
  const trimedLength = trimmed.length;
  if (!trimedLength) {
    return true;
  } else {
    return false;
  }
};
