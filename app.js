const networkScope = require('./cusfun/networkScope.js');

exports.network = new function () {
  this.getScope = networkScope;
};
