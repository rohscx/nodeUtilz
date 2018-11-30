function getGroups(c) {
  //console.log(c,"Ahhh real monsters")
  const fileData = c.reduce((n,o) => {
    n += o;
    return n;
  },"");
  const d3Data = d3.csvParse(fileData);
  //console.log(d3Data)
  const result = d3Data.reduce((n,o) => {
    const idenityGroup = o["'IDENTITY_GROUP'"].length === 2  ? "'noIdentityGroup'" : o["'IDENTITY_GROUP'"]
    const deviceNameSplit = o["'NETWORK_DEVICE_NAME'"].split("-");
    const acaName = deviceNameSplit[0];
    const branchName = deviceNameSplit[1];
    if (o["'USER_NAME'"] !== "'radius-test'") {
      if (!n[acaName]){
        n[acaName] = {[branchName]: {[idenityGroup]: 1}}
      } else if (!n[acaName][branchName]) {
        n[acaName][branchName] = {[idenityGroup]: 1}
      } else if (!n[acaName][branchName][idenityGroup]) {
        n[acaName][branchName][idenityGroup] = 1
      } else {
        n[acaName][branchName][idenityGroup] += 1
      }
    }
    return n;
  },{})
    //console.log(Object.keys(c))
  console.log(result)
  jsonexport(result,function(err, csv){
    writeFile(`./export/test.csv`,csv,'utf8')
  })
}

module.exports.getGroups = getGroups;
