module.exports = function(data) {
  const obj = Object.assign(
    ...Array.from(new Set(...data.map(d => Object.keys(d)))).map(d => ({
      [d]: [],
    }))
  );
  return data.reduce((n, o) => {
    const oKeys = Object.keys(o);
    for (const oKey of oKeys) {
      if (o[oKey].length > 0) n[oKey].push(o[oKey]);
    }
    return n;
  }, obj);
};
