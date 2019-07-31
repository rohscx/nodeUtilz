const ping = require('ping');
const EventEmitter = require('events');

// example
// nodeUtilz.postNodePing(["10.16.2.8", "10.16.2.12", "10.16.2.36", "10.16.2.60", "10.16.2.70"]).then(console.log)

/**
  * Parsed response
  * @param {string[]} dataArray - data, target(s) to ping
  * @typedef {object} PingResponse
  * @param {string} host - The input IP address or HOST
  * @param {string} numeric_host - Target IP address
  * @param {boolean} alive - True for existed host
  * @param {string} output - Raw stdout from system ping
  * @param {number} time - Time (float) in ms for first successful ping response
  * @param {string} min - Minimum time for collection records
  * @param {string} max - Maximum time for collection records
  * @param {string} avg - Average time for collection records
  * @param {string} stddev - Standard deviation time for collected records
  */

module.exports = function(dataArray) {
  const myEmitter = new EventEmitter();
  const hosts = dataArray.filter((f) => f.length > 0);

  return new Promise((resolve) => {
    const pingResult = {alive:[],dead:[]};
    myEmitter.on('response', (data, state) => {
      const {alive,numeric_host} = data;
      const msg = alive ? 'host ' + numeric_host + ' is alive' : 'host ' + numeric_host + ' is dead';
      if (state) {
        pingResult.alive.push(numeric_host)
      } else {
        pingResult.dead.push(numeric_host)
      };;
      console.log(msg);
    });
    myEmitter.on('finished', (data) => {
      resolve(pingResult);
    });
    
    const isAlive = (data) => {
      const {alive} = data;
      return alive;
    };
    
    hosts.forEach(function(host, index) {
      counter = 0
      ping.promise.probe(host)
          .then(function(res) {
            const pingState = isAlive(res);
            myEmitter.emit('response', res, pingState);
            counter ++;
            if (hosts.length == (counter)) myEmitter.emit('finished', pingResult);
          });
    });
  });
};
