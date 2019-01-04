
module.exports = function hasCidr (data) {
  const cidrRegExd = new RegExp(/(\/\d+)/);
  const arrayOfBooleans = data.reduce((n,o) => {
    const coerceString = o.toString();
    //debug
    //console.log(coerceString," ",coerceString.search(cidrRegExd))
    if (coerceString.search(cidrRegExd) === -1){
      n.push(false);
    } else {
      n.push(true);
    }
    return n;
  },[])
  //console.log(arrayOfBooleans)
  const isTrue =  (currentValue) => {
    return currentValue === true;
  }
  return arrayOfBooleans.every(isTrue);
}
