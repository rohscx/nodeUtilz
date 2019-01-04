
module.exports = function hasIpV4 (data) {
  //const ipRegEx = new RegExp(/(\d+.\d+.\d+.\d+$)/);
  const ipRegEx = new RegExp(/((^\d{1,3}\.)(\d{1,3}\.)(\d{1,3}\.)(\d{1,3}))/);
  const arrayOfBooleans = data.map(d => {
    const coerceString = d.toString();
    // debug
    //console.log(coerceString," ",coerceString.search(ipRegEx))
    if (coerceString.search(ipRegEx) === -1){
      return false; // has a problem
    } else {
      return true; // has no problem
    }
  })
  // debug
  //console.log(arrayOfBooleans)
  const isTrue =  (currentValue) => {
    return currentValue === true;
  }
  return arrayOfBooleans.every(isTrue);
}
