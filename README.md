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
