# nodeUtilz
My NODE .js toolkit

## Installation

    npm install

## Method Utilization Examples

### API VERSION 1
```js
const util = require("./nodeUtilz/app.js");
```

### postTestSSH:
```js
util.postTestSSH(["10.76.254.254"],'jSnow',"nedStarkIsNotDead").then(console.log);
```

### postNodePing
```js
util.postNodePing(["8.8.8.8", "1.1.1.1", "8.8.4.4"]).then(console.log);
```

### getMacFromString
```js
util.getMacFromString('cc70.ed27.6781',{format:[":", 2]});
```

### getPrimeDeviceProperties
```js
opts = {
    allowed:[]
};
util.getPrimeDeviceProperties(["11.10.10.10","10.11.11.11"],"primeServer","authToken",opts).then(console.log).catch(console.log);
```
