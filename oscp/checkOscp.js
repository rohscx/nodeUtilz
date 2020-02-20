const ocsp = require('ocsp');

/*
    Takes a certificate and a root as buffers and checks if its failing the OSCP check.
    The Online Certificate Status Protocol (OCSP) is an Internet protocol used to determine the state of an identified certificate.
*/

module.exports = function(certificateBuffer, rootCertificateBuffer) {
  const cB = certificateBuffer;
  const rCb = rootCertificateBuffer;
  return new Promise((resolve, reject) => {
    if (!Buffer.isBuffer(cB) || !Buffer.isBuffer(rCb))
      reject({ cBtype: typeof cB, rCbType: typeof rCb });
    ocsp.check(
      {
        cert: cB,
        issuer: rCb,
      },
      function(err, res) {
        if (err) {
          return reject({ OCSPstatus: err.message.split(' ')[2] });
        }
        //console.log(res);
        return resolve({ OCSPstatus: res.type });
      }
    );
  });
};
