process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const request = require("request");
const EventEmitter = require('events');

  
module.exports = function (arrayMac,url,auth,opts) {
  const myEmitter = new EventEmitter();
  const deviceStatus = {alive:[],dead:[]};
  
  function checkNested(obj, level,  ...rest) {
    if (obj === undefined) return false
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true
    return checkNested(obj[level], ...rest)
  }

  myEmitter.on('response', (data, target) => {
    if (checkNested(data,"errorDocument","message")) console.log(data);
    if (checkNested(data,"SearchResult","resources") && data.SearchResult.resources.length != 0) {
        const mresponse  = data.SearchResult.resources.map((d) => {
            const allowed = Object.keys(d); // does nothing, as I do not need a filter option ¯\_(ツ)_/¯
            const filtered = Object.keys(d)
              .filter(key => allowed.includes(key))
              .reduce((obj, key) => {
                obj[key] = d[key];
                return obj;
              }, {});
              const response = filtered;
              return {query :target,response}
            });
            deviceStatus.alive.push(... mresponse);
    } else {
      deviceStatus.dead.push({query :target,response:data});
    }
  });
  

  return new Promise((resolve,reject) => {
    myEmitter.on('finished', (data) => {
      resolve(deviceStatus);
    });
    arrayMac
      .filter((f) => f.length > 0)
      .forEach(function(host, index) {
      counter = 0
      const options = { method: 'GET',
        url: `https://${url}:9060/ers/config/endpoint`,
        qs: 
          { 'filter': `mac.CONTAINS.${host}`,
        },
        headers: 
          { 'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
            Accept: 'application/json'
          } 
        };
      setTimeout(() => {
        request(options, function (error, response, body) {
          let asObj;
          if (error) throw new Error(error);
           try {
            asObj = JSON.parse(response.body);
          } catch(e) {
            reject(response);
          }
            myEmitter.emit('response', asObj, host);
            counter ++;
            if (arrayMac.length == (counter)) myEmitter.emit('finished');
        });
      }, index * 1000);
    });
  })
}