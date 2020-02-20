process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const request = require('request');

module.exports = function asyncRequestDelay(optionsObj, delay, validator) {
  const options = optionsObj;
  // options should b an array of fully formed options
  return new Promise((resolve, reject) => {
    Promise.all(
      options.map((d, i) => {
        // console.log(d)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            request(d, function(error, response, body) {
              if (error) throw new Error(error);
              // console.log(body);
              if (validator) return validator(body, resolve, reject, d);
              // resolve(body);
            });
          }, i * delay);
        });
      })
    )
      .then(t => resolve(t))
      .catch(c => reject(c));
  });
};
