const base10Convert2 = require('./base10Convert2.js');
module.exports = function base10CidrBase2 (data) {
  return [8,16,24,32].reduce((n,o,i) => {
    const allZero = "00000000";
    const allOne = "11111111";
    const cidr = data === "8" ? "255" : data;
    const base2Cidr = base10Convert2(cidr);
    if (n.includes(base2Cidr)) {
      n.push(allZero)
    } else if (cidr <= o){
      n.push(base2Cidr)
    } else {
      n.push(allOne)
    }
    return n;
  },[])
}
