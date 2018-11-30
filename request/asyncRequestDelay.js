process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var request = require("request");

module.exports = function asyncRequestDelay (optionsObj,delay) {
  var options = optionsObj;
  // options should b an array of fully formed options
  return new Promise(resolve => {
    Promise.all(
      options.map((d,i) => {
        //console.log(d)
        return new Promise(resolve => {
          setTimeout(() => {
            request(d, function (error, response, body) {
              if (error) throw new Error(error);
              //console.log(body);
              resolve(body);
           });
         },i*delay)
        })
     })
    ).then(t => resolve(t))
 });
}
