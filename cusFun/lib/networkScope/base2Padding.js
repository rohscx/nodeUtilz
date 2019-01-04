const pad = require('./pad.js');

module.exports = function base2Padding(data) {
  return new Promise((resolve,reject) => {
    const padMe = data.reduce((n,o) => {
      const {ip,mask,increment} = o;
      const padIp = pad(ip)
      const padMask = pad(mask)
      n.push({ip:padIp,mask:padMask,increment});
      return n;
    },[])
    resolve(padMe);
  })
}
