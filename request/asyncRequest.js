process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const request = require('request');

module.exports = function(optionsObj) {
  const options = optionsObj;
  return new Promise(resolve => {
    request(options, function(error, response, body) {
      // if there is an error wait 5 seconds and retry the request. Poor mans retry
      if (error.message.code === 'ETIMEDOUT') {
        return setTimeout(() => {
          request(options, function(error, response, body) {
            if (error)
              //console.log(body);
              resolve(body);
          });
        }, 5000);
      } else {
        throw new Error(error);
      }
      // console.log(body);
      resolve(body);
    });
  });
};
