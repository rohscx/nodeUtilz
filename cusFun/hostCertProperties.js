const https = require('https');
const Agent = require('https').Agent;

// disabling session cache means performing certificate handshake on every request.
// The Agent constructor takes a maxCachedSessions property. We’ll set it to 0 to prevent caching.
/*
nodeUitlz.getHostCertProperties('agaiseadpr01.fpicore.fpir.pvt')
  .then(console.log)
*/
module.exports = function(host, debug = { logKeys: false }) {
  return new Promise(resolve => {
    const options = {
      host: host,
      port: 443,
      method: 'GET',
      rejectUnauthorized: false,
      // Disable session caching
      agent: new Agent({
        maxCachedSessions: 0,
      }),
    };
    const req = https.request(options, function(res) {
      if (debug.logKeys === true)
        console.log(Object.keys(res.connection.getPeerCertificate()));
      resolve(res.connection.getPeerCertificate());
    });
    req.end();
  });
};
