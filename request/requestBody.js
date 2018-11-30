
module.exports = function requestBody (arrayObj) {
  if (arrayObj.length > 3) {
    return arrayObj.reduce((n,o) => {
      const replaceUniterable = o.map(d => {
        if (d === undefined || d === null) {
          return d = "";
        } else {
          return d;
        }
      })
      for (const d of replaceUniterable) {
        const [a,b,c] = d;
        n[c] = b;
      }
      return n;
    },{})
  } else {
    const replaceUniterable = arrayObj.map(d => {
      if (d === undefined || d === null) {
        return d = "";
      } else {
        return d;
      }
    })
    const [a,b,c] = replaceUniterable;
    return {
      [c]:b
    };
  }

}
