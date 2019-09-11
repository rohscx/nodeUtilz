const dns = require('dns');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// exmaple
/*
nodeUtliz.getReverseLookup(['10.16.3.60','213.46.228.196']).then(console.log)
*/
module.exports = function(ipArray) {
  return new Promise((resolve) =>{
    const response = [];
    const responseError = [];
    myEmitter.on('response', (data) => {
      response.push(data);
    });
    myEmitter.on('responseError', (data) => {
      responseError.push(data);
    });
    myEmitter.on('finished', (data) => {
      resolve(data);
    });
    const outPut = ipArray.map((d, i) => {
      dns.reverse(d, function(err, domains) {
        if (err!=null || domains == undefined) return myEmitter.emit('responseError', err? err : domains);
        domains.forEach(function(domain) {
          dns.lookup(domain, function(err, address, family) {
            const lookupResponse = {[address]: domain};
            myEmitter.emit('response', lookupResponse);
            const dataCount = i + 1;
            if (ipArray.length == dataCount) myEmitter.emit('finished', [response, responseError]);
          });
        });
      });
    });
    return outPut;
  });
};
