const networkScope = require('./cusfun/networkScope.js');
const jsonFromCsv = require('./cusfun/jsonFromCsv.js');
const csvFromJson = require('./cusfun/csvFromJson.js');
const ciscoOption43 = require('./cusfun/ciscoOption43.js');
const getRouterObjs = require('./prime/getRouterObjs.js');
const getPrimeData = require('./prime/getPrimeData.js');

module.exports = {
  version: '1.0',
  getScope: networkScope,
  getRouterObjs: getRouterObjs,
  getPrimeData: getPrimeData,
  getJsonFromCsv: jsonFromCsv,
  getCsvFromJson: csvFromJson,
  getCiscoOption43: ciscoOption43,
};
