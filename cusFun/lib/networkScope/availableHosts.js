module.exports = function availableHosts  (number){
//no longer a cheat! thanks https://erikberg.com/notes/networks.html
return ((Math.pow(2,(32 - number))))
}
//test
// [...Array(33).keys()].map(d => ({[d]:subnetIncrement(d)}))
