module.exports =  function availableNetworks(a,b) {
  // a is always the larger. Divide the larger network by the smaller one. 32 - n vs 32 - m
  // how many /21 network fit into a /17
  const aA = 32 - a;
  const bB = 32 - b;
  return (Math.pow(2,(32-aA)) / Math.pow(2,(32-bB)))
}
