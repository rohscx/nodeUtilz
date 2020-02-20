// it fast because it generate a hash table. Kinda like the MAC Oui look up thing you made.
module.exports = function daysInMilliseconds(number) {
  const numberCoercion = number + 0; // coercion to number if it's a string
  return numberCoercion * 86400 * 1000;
};
