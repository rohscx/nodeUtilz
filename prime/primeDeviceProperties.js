process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const request = require('request');
const EventEmitter = require('events');

module.exports = function(arrayIp, url, auth, opts) {
  const myEmitter = new EventEmitter();
  const deviceStatus = { alive: [], dead: [] };

  function checkNested(obj, level, ...rest) {
    if (obj === undefined) return false;
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
    return checkNested(obj[level], ...rest);
  }

  myEmitter.on('response', (data, target) => {
    if (checkNested(data, 'errorDocument', 'message')) console.log(data);
    if (checkNested(data, 'queryResponse', 'entity')) {
      if (!opts || !opts.allowed) {
        const mresponse = data.queryResponse.entity.map(d => {
          const allowed = Object.keys(d.devicesDTO);
          const filtered = Object.keys(d.devicesDTO)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
              obj[key] = d.devicesDTO[key];
              return obj;
            }, {});
          const response = filtered;
          return { ip: target, response };
        });
        deviceStatus.alive.push(...mresponse);
      } else {
        const mresponse = data.queryResponse.entity.map(d => {
          const allowed = opts.allowed;
          const filtered = Object.keys(d.devicesDTO)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
              obj[key] = d.devicesDTO[key];
              return obj;
            }, {});
          const response = filtered;
          return { ip: target, response };
        });
        deviceStatus.alive.push(...mresponse);
      }
    } else {
      deviceStatus.dead.push({ ip: target, response: data });
    }
  });

  const ipChecker = (data, index) => {
    if (
      data.search(
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      ) === 0
    ) {
      return true;
    } else {
      console.log(`BAD ADDRESS: ${data} AT INDEX: ${index}`);
      return false;
    }
  };
  return new Promise((resolve, reject) => {
    myEmitter.on('finished', data => {
      resolve(deviceStatus);
    });
    arrayIp
      .filter(f => f.length > 0)
      .filter((f, i) => ipChecker(f, i))
      .forEach(function(host, index) {
        counter = 0;
        const options = {
          method: 'GET',
          url: `https://${url}/webacs/api/v1/data/Devices.json`,
          qs: {
            '.full': 'true',
            '.sort': 'ipAddress',
            ipAddress: `contains(${host})`,
          },
          headers: {
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Accept-Encoding': 'gzip, deflate',
            Cookie:
              'JSESSIONID=DBC7E64581B9AB0BFFA02657D20A88AD; JSESSIONID=9DB6D7D9D54A646D7DA30313963F318A',
            Host: url,
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            Authorization: `Basic ${auth}`,
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
            myEmitter.emit('response', asObj, host);
            counter++;
            if (arrayIp.length == counter) myEmitter.emit('finished');
          });
        }, index * 1000);
      });
  });
};
