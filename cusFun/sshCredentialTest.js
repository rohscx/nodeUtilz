const fs = require('fs');
const path = require('path');
const node_ssh = require('node-ssh');
const ssh = new node_ssh();
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

module.exports = function(dataArray,uName,uPassword) {
  const myEmitter = new EventEmitter();
  const hosts = dataArray.filter((f) => f.length > 0);

  return new Promise((resolve) => {
    const pingResult = {alive:[],dead:[]};
    myEmitter.on('response', (data, ip ,state) => {
      const {message, level} = data;
      const msg = state ? 'host ' + ip + ' is alive' : 'host ' + ip + ' is dead' + ' because ' + message;
      console.log(msg);
      if (state) {
        pingResult.alive.push(ip)
      } else {
        pingResult.dead.push(ip)
      };;
      console.log(message, level);
    });
    myEmitter.on('finished', () => {
      resolve(pingResult);
    });
    
    const isAlive = (data) => {
      const {level} = data;
      if (data.message.length > 16) {
        return false;
      } else {
        return true;
      }
    };
    
    hosts.forEach(function(host) {
      counter = 0
      ssh.connect({
        host: host,
        username: uName,
        port: 22,
        password: uPassword,
        tryKeyboard: true,
        onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
            if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
                finish([uPassword])
            }
          }
      }).then((t) => {
          myEmitter.emit('response', t, host, isAlive(c));
          counter ++;
          if (hosts.length == (counter)) myEmitter.emit('finished', t)
      }).catch((c) => {
          myEmitter.emit('response',c, host, isAlive(c));
          counter ++;
          if (hosts.length == (counter)) myEmitter.emit('finished');
      });
    });
  });
};
