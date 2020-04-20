const ipOctetCompare = require('./ipOctetCompare.js');
const base10Convert2 = require('./base10Convert2.js');
const pad = require('./pad.js');

module.exports = function deriveNetwork(data) {
  const sumOctents = (a,b) => {
    const aSplit = a.map((d) => d.split(""));
    const bSplit = b.map((d) => d.split(""));
    return aSplit.map((d, i) => d.map((dd,ii) => +dd + +bSplit[i][ii]).join(""));
  };
  return new Promise((resolve, reject) => {
    const oct = ipOctetCompare;
    const networkData = data.reduce((n, o) => {
      const inverseMask = o.mask.map((d) => d.split("").map((d) => +d === 1 ? 0 : 1).join(""));
      const perfectMask = sumOctents(o.mask,inverseMask);
      const [oA1, oB1, oC1, oD1] = o.ip;
      const [oA2, oB2, oC2, oD2] = o.mask;
      const [oA3, oB3, oC3, oD3] = inverseMask;
      const [oA4, oB4, oC4, oD4] = perfectMask;
      
      console.log()
      const hosts = o.hosts;
      // let tempRelated = {[o]:[]};
      // let tempUnRelated = {[o]:[]};s
      const network = [
        oct(oA1, oA2),
        oct(oB1, oB2),
        oct(oC1, oC2),
        oct(oD1, oD2),
      ];
      
 
      const networkBase2 = network.map(d => base10Convert2(d));
      const [oA5, oB5, oC5, oD5] = sumOctents(pad(networkBase2),inverseMask);
      const lastIp = [
        oct(oA5, oA4),
        oct(oB5, oB4),
        oct(oC5, oC4),
        oct(oD5, oD4),
      ];

      const lastIpBase2 = lastIp.map(d => base10Convert2(d));
      n.push({ ip: o.ip, mask: o.mask, inverseMask, network: pad(networkBase2), lastIp: pad(lastIpBase2), hosts });
      return n;
    }, []);
    for (const d of networkData) {
      const { ip, mask, network } = d;
      const subOfArray = network.reduce((n, o) => n + +o, 0);
      if (subOfArray === 0) return reject(networkData);
    }

    return resolve(networkData);
  });
};
