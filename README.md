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

### deviceProperties
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
