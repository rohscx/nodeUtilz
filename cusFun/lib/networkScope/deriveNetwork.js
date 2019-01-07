const ipOctetCompare = require('./ipOctetCompare.js');
const base10Convert2 = require('./base10Convert2.js');
const pad = require('./pad.js');

module.exports = function deriveNetwork (data) {
  return new Promise((resolve,reject) => {
    const oct = ipOctetCompare;
    const networkData = data.reduce((n,o)=>{
      const [oA1,oB1,oC1,oD1] = o.ip;
      const [oA2,oB2,oC2,oD2] = o.mask;
      const hosts = o.hosts;
      let tempRelated = {[o]:[]};
      let tempUnRelated = {[o]:[]};
      const network = [oct(oA1,oA2),oct(oB1,oB2),oct(oC1,oC2),oct(oD1,oD2)]

      const networkBase2 = network.map(d=>base10Convert2(d));
      n.push({ip:o.ip,mask:o.mask,network:pad(networkBase2),hosts})
      return n;
    },[]);
    for (const d of networkData) {
      const {ip,mask,network} = d;
      const subOfArray = network.reduce((n,o) => n + +o,0);
      if (subOfArray === 0) return reject(networkData)
    }

    return resolve(networkData);
  })
}
