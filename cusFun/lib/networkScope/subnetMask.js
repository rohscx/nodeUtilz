const minusEight = require('./minusEight.js');
const padZero = require('./padZero.js');

module.exports = function subnetMask (number){
  let n = number;
  let emptyArray = [];
  do {
    // code block to be executed
    n = minusEight(n);
    emptyArray.push("11111111")
  }
  while (n > 8);
  if (n ===  8) {
    // janky fix it!!!
    emptyArray.push("11111111");
    emptyArray.push("00000000");
  } else {
    emptyArray.push(padZero(n))
  }
  return emptyArray
}
