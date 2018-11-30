module.exports =  function responseErrorChecker (responseArray,error) {
  return responseArray.map(d => {
    //coercion to JSON if responseArray is a string
    if (typeof(d) === "string") d = JSON.parse(d);
    if (d[error]) {
      console.log(`Error found in reponse: ${JSON.stringify(d, null, '\t')}`);
      return true;
    } else {
      return false
    }
  });
}
