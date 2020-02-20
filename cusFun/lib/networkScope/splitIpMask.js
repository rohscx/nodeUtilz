module.exports = function splitIpMask(data) {
  const splitData = data.reduce((n, o) => {
    const [i, m] = o.split('/').map(d => d.trim());
    n.push({ ip: i, mask: m });
    return n;
  }, []);
  return splitData;
};
