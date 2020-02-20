const ipOctetCompare = require('./ipOctetCompare.js');

module.exports = function binaryCompare(data) {
  const compare = data.reduce(
    (n, o) => {
      const [oA1, oB1, oC1, oD1] = o; // this might not be needed but it's nice to have
      let tempRelated = { [o]: [] };
      let tempUnRelated = { [o]: [] };
      for (const ip of data) {
        const [oA2, oB2, oC2, oD2] = ip; // this might not be needed but it's nice to have
        const oct = ipOctetCompare;
        const result = [
          oct(oA1, oA2),
          oct(oB1, oB2),
          oct(oC1, oC2),
          oct(oD1, oD2),
        ];
        if (result.reduce((n, o) => n + o, 0) === 0) {
          tempUnRelated[o].push(result);
        } else {
          tempRelated[o].push(result);
        }
      }
      n.related.push(tempRelated);
      n.unRelated.push(tempUnRelated);
      return n;
    },
    { related: [], unRelated: [] }
  );
  return compare;
};
