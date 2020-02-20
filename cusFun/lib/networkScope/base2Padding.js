const pad = require('./pad.js');

module.exports = function base2Padding(data) {
  return new Promise((resolve, reject) => {
    const padMe = data.reduce((n, o) => {
      const { ip, mask, hosts } = o;
      const padIp = pad(ip);
      const padMask = pad(mask);
      n.push({ ip: padIp, mask: padMask, hosts });
      return n;
    }, []);
    resolve(padMe);
  });
};
