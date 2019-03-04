const networkScope = require('./cusfun/networkScope.js');
const jsonFromCsv = require('./cusfun/jsonFromCsv.js');
const csvFromJson = require('./cusfun/csvFromJson.js');
const flattenArray = require('./cusfun/flattenArray.js');
const deDupeObjArray = require('./cusfun/deDupeObjArray.js');
const parseMacFromString = require('./cusfun/parseMacFromString.js');
const ciscoOption43 = require('./cusfun/ciscoOption43.js');
const standardDeviation = require('./cusfun/standardDeviation.js');
const dateFromFileTime = require('./cusfun/dateFromFileTime.js');
const sha1Hash = require('./cusfun/sha1Hash.js');
const hostCertProperties = require('./cusfun/hostCertProperties.js');
const getRouterObjs = require('./prime/getRouterObjs.js');
const getPrimeData = require('./prime/getPrimeData.js');
const asyncRequest = require('./request/asyncRequest.js');
const requestOptions = require('./request/generateOptions.js');
const readFile = require('./file/readFile.js');
const writeFile = require('./file/writeFile.js');
const readDirectory = require('./file/readDirectory.js');
const prtgOptions = require('./prtg/prtgRequestOptions.js');


module.exports = {
  version: '1.0',
  getScope: networkScope,
  getRouterObjs: getRouterObjs,
  getPrimeData: getPrimeData,
  getJsonFromCsv: jsonFromCsv,
  getCsvFromJson: csvFromJson,
  getCiscoOption43: ciscoOption43,
  asyncRequest: asyncRequest,
  requestOptions: requestOptions,
  readFile: readFile,
  prtgOptions: prtgOptions,
  writeFile: writeFile,
  getMacFromString: parseMacFromString,
  getDirContents: readDirectory,
  getFlattenArray: flattenArray,
  getDedupedObj: deDupeObjArray,
  getStdev: standardDeviation,
  getDateFromFileTime: dateFromFileTime,
  getSha1Hash: sha1Hash,
  getHostCertProperties: hostCertProperties,
};
