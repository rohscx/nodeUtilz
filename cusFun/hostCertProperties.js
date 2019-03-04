const https = require('https');

/*
nodeUitlz.getHostCertProperties('agaiseadpr01.fpicore.fpir.pvt')
  .then(console.log)
*/
module.exports = function(host, debug = {debug: false}) {
  return new Promise((resolve) => {
    const options = {
      host: host,
      port: 443,
      method: 'GET',
      rejectUnauthorized: false,
    };
    const req = https.request(options, function(res) {
      resolve(res.connection.getPeerCertificate());
      if (debug = true) console.log(Object.keys(res.connection.getPeerCertificate()));
    });
    req.end();
  });
};
