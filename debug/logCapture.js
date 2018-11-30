const consoleColors = require("./consoleColors")

function logCapture () {
  const dataArray = [];
  function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  };
  function prettyJson (data) {
    return JSON.stringify(data, null, '\t');
  };
  this.addLog = function (data) {
    return new Promise ((resolve,reject) => {
      if (typeof(data) == "object" || typeof(data) == "string") {
        if (isJsonString(data)) {
          dataArray.push(prettyJson(data));
          resolve({true:typeof(data)});
        } else {
          dataArray.push(data);
          resolve({true:typeof(data)});
        }
      } else {
        reject({false:typeof(data)})
      }
    })
  };
  this.getLogs = function (color) {
    for (const d of dataArray) {
      if (color){
        console.log(consoleColors(color),d);
        // reset colors
        console.log(consoleColors("Reset"));
      } else {
        console.log(d);
      }
    }
  }
}

module.exports = logCapture;
