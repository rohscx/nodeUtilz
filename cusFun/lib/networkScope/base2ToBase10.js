module.exports = function base2ToBase10(data) {
  return new Promise(res => {
    const base10 = data.reduce((n, o) => {
      const { ip, mask, network, hosts, lastIp, inverseMask } = o;
      const ipBase10 = ip.map(d => parseInt(d, 2).toString(10)).join('.');
      const maskBase10 = mask.map(d => parseInt(d, 2).toString(10)).join('.');
      const networkBase10 = network
        .map(d => parseInt(d, 2).toString(10))
        .join('.');
      const lastIpBase10 = lastIp.map(d => parseInt(d, 2).toString(10)).join('.');
        
      const lastOct = parseInt(network[3], 2).toString(10);
      // not needed as it is not caculated int the prior promise
      // const wildMaskBase10 = mask
      //   .map(d => 255 - parseInt(d, 2).toString(10))
      //   .join('.');
      const inverseMaskBase10 = inverseMask.map(d => parseInt(d, 2).toString(10)).join('.');
      const sudoPrefix = mask.reduce((n, o) => {
        const count = parseInt(o, 2);
        if ((count !== 255) & (count !== 0))
          n = o
            .split('')
            .map(d => +d)
            .filter(f => f === 1)
            .reduce((n, o) => n + o, 0);
        return n;
      });
      const prefixToBits = mask.reduce(
        (n, o) => {
          const asNumber = o;
          const networkBits = [
            ...asNumber
              .toString()
              .split('')
              .map(d => +d)
              .filter(f => f === 1),
          ];
          const hostBits = [
            ...asNumber
              .toString()
              .split('')
              .map(d => +d)
              .filter(f => f === 0)
              .map(d => d + 1),
          ];
          n.networkBits.push(...networkBits);
          n.hostBits.push(...hostBits);
          return n;
        },
        { networkBits: [], hostBits: [] }
      );
      const bits = Object.keys(prefixToBits).map(d => ({
        [d]: prefixToBits[d].reduce((n, o) => n + o, 0),
      }));
      const { networkBits } = bits[0];
      const { hostBits } = bits[1];
      const range =
        Math.pow(2, sudoPrefix) === Infinity ? 1 : Math.pow(2, sudoPrefix);

      const subnetIncrement = [128, 64, 32, 16, 8, 4, 2, 1]
        .filter((f, i) => ++i == networkBits % 8)
        .pop();
      const subnets = hosts;
      n.push({
        ip: ipBase10,
        mask: maskBase10,
        inverseMask: inverseMaskBase10,
        network: networkBase10,
        lastIp: lastIpBase10,
        subnets,
        hosts: hosts - 2,
        subnetIncrement: subnetIncrement === undefined ? 0 : subnetIncrement,
        range,
        networkBits,
        hostBits,
      });
      return n;
    }, []);
    res(base10);
  });
};
