// it fast because it generate a hash table. Kinda like the MAC Oui look up thing you made.
module.exports = function objectLength(obj) {
  const keys = Object.keys(obj);
  return keys.length
}
