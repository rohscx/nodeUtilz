process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const request = require('request');
const EventEmitter = require('events');

module.exports = function(endpointIds, url, auth, opts) {
  const myEmitter = new EventEmitter();
  const deviceStatus = { alive: [], dead: [] };

  function checkNested(obj, level, ...rest) {
    if (obj === undefined) return false;
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
    return checkNested(obj[level], ...rest);
  }

  myEmitter.on('response', (data, target) => {
    if (checkNested(data, 'errorDocument', 'message')) console.log(data);
    if (checkNested(data, 'ERSEndPoint') && data) {
      const mresponse = { query: target, response: data };
      deviceStatus.alive.push(mresponse);
    } else {
      deviceStatus.dead.push({ query: target, response: data });
    }
  });

  return new Promise((resolve, reject) => {
    myEmitter.on('finished', data => {
      resolve(deviceStatus);
    });
    endpointIds
      .filter(f => f.length > 0)
      .forEach(function(endpointId, index) {
        counter = 0;
        const options = {
          method: 'GET',
          url: `https://${url}:9060/ers/config/endpoint/${endpointId}`,
          headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
            Accept: 'application/json',
          },
        };
        setTimeout(() => {
          request(options, function(error, response, body) {
            let asObj;
            if (error) throw new Error(error);
            try {
              asObj = JSON.parse(response.body);
            } catch (e) {
              reject(response);
            }
            myEmitter.emit('response', asObj, endpointId);
            counter++;
            if (endpointIds.length == counter) myEmitter.emit('finished');
          });
        }, index * 1000);
      });
  });
};
