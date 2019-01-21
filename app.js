const networkScope = require('./cusFun/networkScope.js');
const getRouterObjs = require('./prime/getRouterObjs.js');
const getPrimeData = require('./prime/getPrimeData.js');

module.exports = {
  version: '1.0',
  getScope: networkScope,
  getRouterObjs: getRouterObjs,
  getPrimeData: getPrimeData,
};
