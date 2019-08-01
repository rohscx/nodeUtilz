# nodeUtilz
My NODE .js toolkit

## Installation

    npm install
    
## Method Utilization Examples

### postTestSSH:
```js
const app = require("./nodeUtilz/app.js");
app.postTestSSH(["10.76.254.254"],'jSnow',"nedStarkIsNotDead").then((t) => console.log(t));
```

### postNodePing
```js
const app = require("./nodeUtilz/app.js");
app.postNodePing(["8.8.8.8"]).then((t) => console.log(t));
```
