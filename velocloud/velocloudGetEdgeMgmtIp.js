const velocloudGetEdgeConfigurationStack = require("./velocloudGetEdgeConfigurationStack");
module.exports = function (edgeData,url,authCookie) {
    const nuData =  edgeData.map((d) => {
        const {id, enterpriseId ,name ,description,modelNumber,serialNumber} = d ;
        return {id, enterpriseId, name, description,modelNumber,serialNumber} ;
    });
    const optionMaker = (data,url,authCookie) => {
        const {id, enterpriseId, name, description,modelNumber,serialNumber} = data;
        return options = {
        "callBack": function (data) {
            console.log("DEBUG Type: ", typeof(data), "\n DEBUG Keys: ", Object.keys(data))
            console.log()
            if (data.error) return data;
            const edgeProfile = data.filter((f) => f.name === "Edge Specific Profile")[0];
            const profileDeviceSettings = edgeProfile.modules.filter((f) => f.name == "deviceSettings" )[0];
            const mgmtIp = profileDeviceSettings.data.lan.management;
            return {id, enterpriseId, name, description,modelNumber,serialNumber, mgmtIp }
        } ,
        "url": url,
        "enterpriseId": enterpriseId,
        "edgeId": id,   
        "modules":["modules"],
        "authCookie":authCookie
         }
      }
    const requestData = nuData.map((d) => optionMaker(d, url, authCookie));
    return Promise.all(requestData.map((d, i) => {
        return new Promise ((resolve,reject) => {
         setTimeout(() => {
          velocloudGetEdgeConfigurationStack(d).then((t) => {
           const callBackResult = t.callBack(t.response);
           resolve(callBackResult)
          }).catch((c) => reject(c))
         },i*2000)
        })
       }));
}