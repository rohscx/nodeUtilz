# nodeUtilz
My NODE .js toolkit

## Installation

    npm install

## Method Utilization Examples

### API VERSION 1
```js
const util = require("./nodeUtilz/app.js");
```

### testSSH:
```js
util.testSSH(["10.76.254.254"],'jSnow',"nedStarkIsNotDead").then(console.log);
```

### nodePing
```js
util.nodePing(["8.8.8.8", "1.1.1.1", "8.8.4.4"]).then(console.log);
```

### macFromString
```js
util.macFromString('cc70.ed27.6781',{format:[":", 2]});
```

### primeDeviceProperties
```js
opts = {
    allowed:[]
};
util.primeDeviceProperties(["11.10.10.10","10.11.11.11"],"primeServer","authToken",opts).then(console.log).catch(console.log);
```

### mergeObjecs
```js
const newObject = util.mergeObjecs([{a:1},{b:2},{c:3}]);
```

### iseDeviceGroups
```js
opts = {
    allowed:[]
};
util.iseDeviceGroups(["homeSwitc","spaceRou"],"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### iseEndpointMacInfo
```js
opts = {
    allowed:[]
};
util.iseEndpointMacInfo(["00:26:CB:3C:18:BC","3C:18:A0:78:5E:D0"],"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### iseEndpointIdInfo
```js
opts = {
    allowed:[]
};
util.iseEndpointIdInfo(["<DEVICE_ID1>","<DEVICE_ID2>"],"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### iseEndpointUpdate
```js
opts = {
    allowed:[]
};
util.iseEndpointUpdate(["<DEVICE_ID1>","<DEVICE_ID2>"],"<GROUP_ID>",<"DESCRIPTION">,"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### filterBadIpV4
```js
util.filterBadIpV4(["1.1.1.1","2.1.1.2","2.3.4.2.1"]);
```
