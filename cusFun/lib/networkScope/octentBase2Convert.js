const base10Convert2 = require('./base10Convert2.js');
const base10CidrBase2 = require('./base10CidrBase2.js');
const subnetMask = require('./subnetMask.js');
const availableHosts = require('./availableHosts.js');

module.exports = function octentBase2Convert(data){
  return new Promise ((resolve,reject) => {
    const asBase2 = data.map(({ip,mask}) => {
      const splitIp = ip.split(".");
      const base2Ip = splitIp.map(d => base10Convert2(d));
      const base2Mask = subnetMask(mask);
      const hosts = availableHosts(mask);
      return {ip:base2Ip,mask:base2Mask,hosts:hosts}
    },[])
    resolve(asBase2);
  })
}
