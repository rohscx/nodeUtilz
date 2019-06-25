const networkScope = require('./cusFun/networkScope.js');
const jsonFromCsv = require('./cusFun/jsonFromCsv.js');
const csvFromJson = require('./cusFun/csvFromJson.js');
const flattenArray = require('./cusFun/flattenArray.js');
const deDupeObjArray = require('./cusFun/deDupeObjArray.js');
const parseMacFromString = require('./cusFun/parseMacFromString.js');
const parseIpFromString = require('./cusFun/parseIpFromString.js');
const reverseIpLookup = require('./cusFun/reverseIpLookup.js');
const ciscoOption43 = require('./cusFun/ciscoOption43.js');
const standardDeviation = require('./cusFun/standardDeviation.js');
const dateFromFileTime = require('./cusFun/dateFromFileTime.js');
const sha1Hash = require('./cusFun/sha1Hash.js');
const hostCertProperties = require('./cusFun/hostCertProperties.js');
const readFileDataNn = require('./cusFun/readFileDataNn.js');
const nodePing = require('./cusFun/nodePing.js');
const getRouterObjs = require('./prime/getRouterObjs.js');
const getPrimeData = require('./prime/getPrimeData.js');
const asyncRequest = require('./request/asyncRequest.js');
const requestOptions = require('./request/generateOptions.js');
const readFile = require('./file/readFile.js');
const writeFile = require('./file/writeFile.js');
const fileStats = require('./file/fileStats.js');
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
  getFileStats: fileStats,
  getMacFromString: parseMacFromString,
  getIpFromString: parseIpFromString,
  getReverseLookup: reverseIpLookup,
  getDirContents: readDirectory,
  getFlattenArray: flattenArray,
  getDedupedObj: deDupeObjArray,
  getStdev: standardDeviation,
  getDateFromFileTime: dateFromFileTime,
  getSha1Hash: sha1Hash,
  getHostCertProperties: hostCertProperties,
  readFileDataNn: readFileDataNn,
  postNodePing: nodePing,
};
