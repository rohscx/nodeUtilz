module.exports = function base10Convert2(data) {
  const coerceInt = +data;
  if (isNaN(coerceInt)) false; // do better error checking
  const coerceIntBase2 = coerceInt.toString(2);
  return coerceIntBase2;
};
