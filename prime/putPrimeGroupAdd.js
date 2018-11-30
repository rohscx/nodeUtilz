const getPrimeData = require('./getPrimeData.js');
const getPrimeOptionsMaker = require('./getPrimeOptionsMaker.js');
const getPrimeDeviceType = require('./getPrimeDeviceType.js');
const getRequestOptions = require('./getRequestOptions.js');
const asyncRequest = require('../request/asyncRequest.js');
const readFile = require('../file/readFile.js');



module.exports =  function putPrimeGroupAdd (targetGroupName,apiAuth,filterKey,filterValue,localFilePath,callBack,debug) {
  async function makePrimeIseSwitchList (targetGroupName,apiAuth,filterKey,filterValue,localFilePath,callBack,debug) {
    const url = "https://agaprimepr01.fpicore.fpir.pvt";
    const uri = "/webacs/api/v1/data/Devices.json";
    const addUrl = "https://agaprimepr01.fpicore.fpir.pvt";
    const addUri = "/webacs/api/v2/op/groups/groupDevices.json";
    const addQs = { groupPath: 'User Defined/'+targetGroupName };
    const auth = apiAuth //securityFile().prime00.primeAppSettings.Authorization;
    const optionsFunction = getPrimeOptionsMaker(url,uri,auth);
    const primeData = await getPrimeData(optionsFunction);
    const primeDeviceFilter = getPrimeDeviceType(primeData,filterKey,filterValue); //"deviceType","Cisco Catalyst 29xx Stack-able Ethernet Switch"
    const localFile0 =  await readFile(localFilePath,"utf8"); //"./import/BerniesTargetSwitchNames"

    // gi global replace
    const regEx0 = /'/gi;
    // make the last one a reduce
    const deviceNameIp = (deviceArray,filterKey) => {
      return deviceArray
      .filter(f => f.devicesDTO.deviceName.search(filterKey)!= -1)
      .reduce((n,o) => {
        const deviceObj = {
          name: o.devicesDTO.deviceName,
          address: o.devicesDTO.ipAddress,
          id: o.devicesDTO.deviceId
        };

        n = deviceObj;
        return n;
      },{})
    }
    const cleanLocalFileData = localFile0.replace(regEx0,"").split("\r\n").filter(f => f.length !== 0).map(d => d.split("-"));
    const acaObj = cleanLocalFileData.reduce((n,o) => {
      const acaName = o[0].toLowerCase();
      const branchName = o[1].toLowerCase();
      const filter = new RegExp(acaName+".*"+branchName);
      // if the aca does not exist create it the branch and first data array
      if (!n[acaName]){
        n[acaName] = {[branchName]:[deviceNameIp(primeDeviceFilter,filter)]}
      } else if (!n[acaName][branchName]) {
        //if the branch does not exit create it and the data array
        n[acaName][branchName] = [deviceNameIp(primeDeviceFilter,filter)]
      } else {
        // if the branch exists push additional data into the branch array
        n[acaName][branchName].push(deviceNameIp(primeDeviceFilter,filter))
      }
      return n;
    },{})
    //console.log(Object.keys(acaObj))
    const targetDeviceIpAddresses = Object.keys(acaObj).reduce((n,o) => {
      const keys = Object.keys(acaObj[o]);
      keys.map(d => acaObj[o][d].map(({address}) => n.push(address)))
      return n;
    },[]);
    const targetDeviceIds = Object.keys(acaObj).reduce((n,o) => {
      const keys = Object.keys(acaObj[o]);
      keys.map(d => acaObj[o][d].map(({id}) => n.push(id)))
      return n;
    },[]);
    const targetDeviceNames = Object.keys(acaObj).reduce((n,o) => {
      const keys = Object.keys(acaObj[o]);
      keys.map(d => acaObj[o][d].map(({name}) => n.push(name)))
      return n;
    },[]);
    if (debug) return debug([JSON.stringify(acaObj,null, '\t'),targetDeviceIpAddresses,targetDeviceIds,targetDeviceNames])
    const postBody = {
      groupDevicesDTO : {
        deviceIds : {
          deviceId : targetDeviceIds
        }
      }
    };
    const addDevicesToPrimeGroup = getRequestOptions("PUT",addUrl,addUri,addQs,auth,postBody);
    asyncRequest(addDevicesToPrimeGroup)
    .then(t => console.log(t))
    .catch(c => console.log(c));
  }

  return makePrimeIseSwitchList(targetGroupName,apiAuth,filterKey,filterValue,localFilePath,callBack,debug)

}
