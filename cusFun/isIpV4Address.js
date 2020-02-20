module.exports = function(data) {
  /**
   * Adds two numbers together.
   * @param {string} currentValue The first number.
   * @return {boolean} The sum of the all boolean values.
   */
  function isTrue(currentValue) {
    return currentValue === true;
  }
  return data
    .map(d => {
      const trimed = d.trim();
      if (trimed.search(RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) != -1) {
        return true;
      } else {
        return false;
      }
    })
    .every(isTrue);
};
