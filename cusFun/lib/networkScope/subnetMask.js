const minusEight = require('./minusEight.js');
const padZero = require('./padZero.js');

module.exports = function subnetMask(number) {
  const n = +number;
  // Using the prefix find the quotoen, remainder and modulus
  const maskPartA = data => {
    const prefix = data;
    if (prefix < 8) return { quotient: 1, remainder: 1, modulus: prefix };
    const octents = 8;
    const rawQuotient = prefix / octents;
    const remainder = rawQuotient % 1;
    const quotient = rawQuotient - remainder;
    const modulus = prefix % octents;
    return { quotient, remainder, modulus };
  };
  const { quotient, remainder, modulus } = maskPartA(n);

  // Generate Octents with available data
  const generateLeftSide = Array.from(Array(quotient)).map(d =>
    Array.from(Array(8))
      .fill(1, 0, 8)
      .join('')
  );
  const generateRightSide = Array(8)
    .fill(1)
    .map((d, i) => (i < modulus ? 1 : 0))
    .join('');
  const generateSides =
    n < 8 ? [generateRightSide] : [...generateLeftSide, generateRightSide];

  // Fill in any empty octents if octent Lenth < 4
  const octentLength = generateSides.length;
  for (var f = octentLength; f < 4; ++f) {
    generateSides.push(
      Array(8)
        .fill(0)
        .join('')
    );
  }
  return generateSides;
  // let emptyArray = [];
  // do {
  //   // code block to be executed
  //   n = minusEight(n);
  //   emptyArray.push("11111111")
  // }
  // while (n > 8);
  // if (n <=  8) {
  //   // janky fix it!!!
  //   emptyArray.push("11111111");
  //   emptyArray.push("00000000");
  // } else {
  //   emptyArray.push(padZero(n))
  // }
  // return emptyArray
};
