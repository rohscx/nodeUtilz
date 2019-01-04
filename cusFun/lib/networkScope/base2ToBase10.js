module.exports = function base2ToBase10 (data){
  return new Promise ((res) => {
    const base10 = data.reduce((n,o) => {
      const {ip,mask,network,increment} = o;
      const ipBase10 = ip.map(d => (parseInt(d,2).toString(10))).join(".");
      const maskBase10 = mask.map(d => (parseInt(d,2).toString(10))).join(".");
      const networkBase10 = network.map(d => (parseInt(d,2).toString(10))).join(".");
      const lastOct = parseInt(network[3],2).toString(10);
      const range = `${networkBase10} - ${increment + +lastOct}`;
      n.push({ip:ipBase10,mask:maskBase10,network:networkBase10,increment:range})
      return n;
    },[])
    res(base10)
  })
}