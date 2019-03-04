const crypto = require('crypto');
// takes a string or a buffer and returns a sha1 hash
// note the format of the file when it's read in, use UTF8 for consistency.

/*
nodeUitlz.readFile('./agaprimepr01.fpicore.fpir.pvt.020416.cert.der','utf8')
    .then(t => console.log(nodeUitlz.getSha1Hash(t)))
*/

module.exports = function(cert, debug = {debug: false}) {
  const shasum = crypto.createHash('sha1');
  const der = Buffer.from(cert, 'base64').toString('binary');
  shasum.update(der);
  const sha1Data = {sha1: shasum.digest('hex')};
  if (debug = true) console.log(JSON.stringify(sha1Data));
  return sha1Data;
};
