module.exports = function getPrimeStackedSwitches (dataArray,filterKey,filterValue) {
  return dataArray
  .filter(f => f.devicesDTO[filterKey] === filterValue)
  .reduce((n,o) => {
    if (o.devicesDTO.manufacturerPartNrs){
      if (o.devicesDTO.manufacturerPartNrs.manufacturerPartNr) {
        if (o.devicesDTO.manufacturerPartNrs.manufacturerPartNr.length > 1) {
          n.push(o)
        }
      }
    }
    return n;
  },[])
}
