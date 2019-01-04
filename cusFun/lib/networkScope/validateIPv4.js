
const hasIpV4 = require('./hasIpV4.js');
const hasCidr = require('./hasCidr.js');
const splitIpMask = require('./splitIpMask.js');

module.exports = function validateIPv4 (data){
  return new Promise ((resolve,reject) => {

    if (!Array.isArray(data) || typeof(data) !== "object") {
      return reject(data);
    } else if (data.length === 0){
      return reject(data);
    }
    const ipCheckResult = hasIpV4(data);
    if (!ipCheckResult) return reject(data);
    const cidrCheckResult = hasCidr(data);
    if (!cidrCheckResult) return reject(data);
    const splitIpMaskResult = splitIpMask(data);
    //if (keyHasValue(splitIpMaskResult)) return reject(splitIpMaskResult)
    return resolve(splitIpMaskResult);
  })
}
