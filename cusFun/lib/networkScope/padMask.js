
module.exports = function pad (data,padding=8) {
  const paddded = data.map(d => {
    const coerceString = d.toString();
    if (coerceString.length < padding) {
      const neededPadding = padding - coerceString.length;
      let tempString = "";
      while (tempString.length < (neededPadding)){
        tempString += "0";
      }
      const newString = tempString += coerceString;
      return newString;

    } else {
      return d;
    }
  })
  return paddded;
}
