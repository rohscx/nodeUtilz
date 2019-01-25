const isIpV4 = require('./isIpV4Address.js');

module.exports = function(data) {
  if (!data) return `Expected array of IpV4 Strings. Or array of cisco Option 64 values with false option. function(['ipV4Strings']) or function(['opt64String'])`;
  if (data.map((d) => d.split('').map((d) => d.search(RegExp(/([0-9]|[aA-fF])/))).every((d)=> d === 0)).every((e)=> e === true)) {
    const split = data.map((d) => d.split(''));
    return split.map((d) => {
      return d.reduce((n, o, i) => {
        if (i > 3) n.push(o);
        return n;
      }, [])
          .join('')
          .match(/.{8,8}/g)
          .map((d) => d.match(/.{1,2}/g).map((d) => parseInt(d, 16)).join('.'));
    });
  }
  const ipArray = data;
  // test all elements in the array are ipV4 addresses
  if (!isIpV4(ipArray)) return `Expected IPV4 Addresses, one or more failed test: ${ipArray}`;
  /*
  Note: TLV values for the Option 43 suboption: Type + Length + Value.
  Type is always the suboption code 0xf1.
  Length is the number of controller management IP addresses times 4 in hex.
  Value is the IP address of the controller listed sequentially in hex.
  For example, suppose there are two controllers with management interface IP addresses,
  192.168.10.5 and 192.168.10.20. The type is 0xf1. The length is 2 * 4 = 8 = 0x08.
  The IP addresses translates to c0a80a05 (192.168.10.5) and c0a80a14 (192.168.10.20).
  When the string is assembled, it yields f108c0a80a05c0a80a14.
  The Cisco IOS command that is added to the DHCP scope is option 43 hex f108c0a80a05c0a80a14.
  */

  const subOptionType = 'f1';
  const subOptionLength = '0' + (ipArray.length * 4).toString();
  const base16IpV4 = ipArray.map((d) => {
    const split = d.split('.');
    const splitToInt = split.map((d) => +d);
    return splitToInt.map((d) => d.toString(16)).map((d) => d.length > 1 ? d : '0'+d).join('');
  });
  return subOptionType + subOptionLength + base16IpV4.join('');
};
