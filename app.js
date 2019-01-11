const networkScope = require('./cusfun/networkScope.js');
const getRouterObjs = require('./prime/getRouterObjs.js');
exports.apps = new function() {
  this.getScope = networkScope;
  this.getRouterObjs = getRouterObjs;
};
