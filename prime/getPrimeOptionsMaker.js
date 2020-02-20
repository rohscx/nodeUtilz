module.exports = function optionMaker(url, uri, auth) {
  /**
   * Add two numbers.
   * @param {number} number the page number.
   * @return {object} options for the request.
   */
  function options(number) {
    return {
      method: 'GET',
      url: url + uri,
      qs: { '.full': 'true', '.firstResult': number },
      headers: { 'Cache-Control': 'no-cache', Authorization: auth },
    };
  }
  return options;
};
