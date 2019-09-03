module.exports = function base2ToBase10 (data){
  return new Promise ((res) => {
    const base10 = data.reduce((n,o) => {
      const {ip,mask,network,hosts} = o;
      const ipBase10 = ip.map(d => (parseInt(d,2).toString(10))).join(".");
      const maskBase10 = mask.map(d => (parseInt(d,2).toString(10))).join(".");
      const networkBase10 = network.map(d => (parseInt(d,2).toString(10))).join(".");
      const lastOct = parseInt(network[3],2).toString(10);
      const sudoPrefix = mask.reduce((n,o) => {
        const count = parseInt(o,2)
        if (count !== 255 & count !== 0) n = o.split("").map((d) => +d).filter((f) => f===1).reduce((n,o) => n + o,0);
        return n;
      });
      const prefix = mask.reduce((n,o) => {
        const toNumber = o;
        const arrayOfNumbers = [...toNumber.toString().split("").map((d) => +d)];
        n.push(... arrayOfNumbers)
        return n;
      }, []).reduce((n,o) => n + o ,0);
      const range =  Math.pow(2,sudoPrefix) === Infinity ? 1 : Math.pow(2,sudoPrefix);
      
      const subnetMask = [128, 64, 32, 16, 8, 4, 2, 1].reduce((n,o,i) => i+1 <= sudoPrefix ? n+o : n+0,0);
      const subnets = hosts;
      // console.log(" Space")
      // console.log(network)
      // console.log(mask)
      n.push({ip:ipBase10,mask:maskBase10,network:networkBase10, subnets , hosts: hosts - 2, range, prefix})
      return n;
    },[])
    res(base10)
  })
}
