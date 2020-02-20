module.exports = function objDedupe(data) {
  return Array.from(new Set(data.map(d => JSON.stringify(d)))).map(d =>
    JSON.parse(d)
  );
};
