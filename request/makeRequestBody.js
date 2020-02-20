module.exports = function makeRequestBody(optionsObj) {
  const body = optionsObj;
  this.getParms = function() {
    return Object.keys(body);
  };
  this.setParms = function(...c) {
    const bodyKeys = Object.keys(body);
    if (bodyKeys.length !== c.length)
      return console.log(`Values please ${bodyKeys}`);
    for (const d of bodyKeys) {
      const index = bodyKeys.indexOf(d);
      body[d] = c[index];
    }
    // console.log(body)
    return body;
  };
};
