module.exports = function(data) {
  if (typeof data !== 'object') {
    console.log('type error' + typeof data);
    return null;
  }
  const coerceInt = data.map(d => +d);
  /**
   * Adds two numbers together.
   * @param {int} data a number, or should be one.
   * @return {boolean} True or False.
   */
  function isTypeNumber(data) {
    if (typeof data === 'number') {
      return true;
    } else {
      return false;
    }
  }
  if (!coerceInt.every(isTypeNumber)) {
    console.log('dirty data error' + coerceInt);
    return null;
  }
  const length = coerceInt.length;
  // there is an accuacy issue which should be fixed...
  return +Number.parseFloat(
    Math.sqrt(
      Number.parseFloat(
        coerceInt
          .map(d =>
            Math.pow(d - coerceInt.reduce((a, b) => a + b, 0) / length, 2)
          )
          .reduce((a, b) => a + b, 0) / length
      ).toPrecision(4)
    )
  ).toPrecision(3);
};
