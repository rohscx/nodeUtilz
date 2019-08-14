# nodeUtilz
My NODE .js toolkit

## Installation

    npm install

## Method Utilization Examples

### API VERSION 1
```js
const utilz = require(".././nodeUtilz/app.js");
```

### testSSH:
```js
utilz.testSSH(["10.76.254.254"],'jSnow',"nedStarkIsNotDead").then(console.log);
```

### nodePing
```js
utilz.nodePing(["8.8.8.8", "1.1.1.1", "8.8.4.4"]).then(console.log);
```

### macFromString
```js
utilz.macFromString('cc70.ed27.6781',{format:[":", 2]});
```

### primeDeviceProperties
```js
opts = {
    allowed:[]
};
utilz.primeDeviceProperties(["11.10.10.10","10.11.11.11"],"primeServer","authToken",opts).then(console.log).catch(console.log);
```

### mergeObjecs
```js
const newObject = utilz.mergeObjecs([{a:1},{b:2},{c:3}]);
```

### iseDeviceGroups
```js
opts = {
    allowed:[]
};
utilz.iseDeviceGroups(["homeSwitc","spaceRou"],"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### iseEndpointMacInfo
```js
opts = {
    allowed:[]
};
utilz.iseEndpointMacInfo(["00:26:CB:3C:18:BC","3C:18:A0:78:5E:D0"],"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### iseEndpointIdInfo
```js
opts = {
    allowed:[]
};
utilz.iseEndpointIdInfo(["<DEVICE_ID1>","<DEVICE_ID2>"],"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### iseEndpointUpdate
```js
opts = {
    allowed:[]
};
utilz.iseEndpointUpdate(["<DEVICE_ID1>","<DEVICE_ID2>"],"<GROUP_ID>",<"DESCRIPTION">,"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### filterBadIpV4
```js
utilz.filterBadIpV4(["1.1.1.1","2.1.1.2","2.3.4.2.1"]);
```

### ciscoOption43
```js
utilz.ciscoOption43(["1.1.1.1","2.1.1.2","2.3.4.2.1"]);
```

### ciscoDecodeOption43
```js
utilz.ciscociscoDecodeOption43("f108c0a80a05c0a80a14");
```

### velocloudGetEdgeConfigurationStack
```js
options = {
  "callBack": function(data) {console.log("doSomethingWith", data)},
  "url": "https://<cloudOrchestratorUrl>/portal/rest/edge/getEdgeConfigurationStack",
  "enterpriseId": 567,
  "edgeId": 1234,
  "modules":["modules"],
  "authCookie":"velocloud.session=17afa8fa3e6f30a976d2e12..."
};

utilz.velocloudGetEdgeConfigurationStack(options).then((t) => t.callBack(Object.keys(t.response))).catch(console.log);
```

### velocloudGetEdgeMgmtIp
```js
options = {
  "readPath": "./response.json",
  "writePath": "./loopbacks.json",
  "veloUrl": "https://<cloudOrchestratorUrl>/portal/rest/edge/getEdgeConfigurationStack",
  "veloAuthCookie":"velocloud.session=17afa8fa3e6f30a976d2e12..."
};

utilz.readFile(options.readPath,"utf8").then((t) => data = JSON.parse(t));
utilz.velocloudGetEdgeMgmtIp(data,options.veloUrl,options.veloAuthCookie).then((t) => utilz.writeFile("./loopbacks.json",JSON.stringify(t,null,"\t"),"utf8").catch(console.log));
```
