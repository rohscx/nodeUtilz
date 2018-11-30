process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var request = require("request");

module.exports = function asyncRequest (optionsObj) {
  var options = optionsObj;

  return new Promise(resolve => {
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      //console.log(body);
      resolve(body)
   });

 });

}
