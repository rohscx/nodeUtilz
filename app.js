const networkScope = require('./cusFun/networkScope.js');
const jsonFromCsv = require('./cusFun/jsonFromCsv.js');
const csvFromJson = require('./cusFun/csvFromJson.js');
const flattenArray = require('./cusFun/flattenArray.js');
const deDupeObjArray = require('./cusFun/deDupeObjArray.js');
const parseMacFromString = require('./cusFun/parseMacFromString.js');
const parseIpFromString = require('./cusFun/parseIpFromString.js');
const reverseIpLookup = require('./cusFun/reverseIpLookup.js');
const ciscoOption43 = require('./cusFun/ciscoOption43.js');
const ciscoDecodeOption43 = require('./cusFun/ciscoDecodeOption43.js');
const standardDeviation = require('./cusFun/standardDeviation.js');
const primeDeviceProperties = require('./prime/primeDeviceProperties.js');
const dateFromFileTime = require('./cusFun/dateFromFileTime.js');
const filterBadIpV4 = require('./cusFun/filterBadIpV4.js');
const sha1Hash = require('./cusFun/sha1Hash.js');
const hostCertProperties = require('./cusFun/hostCertProperties.js');
const readFileDataNn = require('./cusFun/readFileDataNn.js');
const nodePing = require('./cusFun/nodePing.js');
const sshCredentialTest = require('./cusFun/sshCredentialTest.js');
const groupItems = require('./cusFun/groupItems.js');
const mergeObjects = require('./cusFun/mergeObjects.js');
const xmlToJson = require('./cusFun/xmlToJson.js');
const standardizedArrayFromString = require('./cusFun/standardizedArrayFromString.js');
const getRouterObjs = require('./prime/getRouterObjs.js');
const getPrimeData = require('./prime/getPrimeData.js');
const iseDeviceGroups = require('./ise/iseDeviceGroups.js');
const iseEndpointMacInfo = require('./ise/iseEndpointMacInfo.js');
const iseEndpointUpdate = require('./ise/iseEndpointUpdate.js');
const iseEndpointIdInfo = require('./ise/iseEndpointIdInfo.js');
const velocloudGetEdgeConfigurationStack = require('./velocloud/velocloudGetEdgeConfigurationStack.js');
const velocloudGetEdgeMgmtIp = require('./velocloud/velocloudGetEdgeMgmtIp.js');
const amznConnectReqirements = require('./amazon/amznConnectReqirements.js');
const tesseractOcr = require('./tesseract/ocr.js');
const asyncRequest = require('./request/asyncRequest.js');
const requestOptions = require('./request/generateOptions.js');
const readFile = require('./file/readFile.js');
const writeFile = require('./file/writeFile.js');
const fileStats = require('./file/fileStats.js');
const readDirectory = require('./file/readDirectory.js');
const deleteFile = require('./file/deleteFile.js');
const prtgOptions = require('./prtg/prtgRequestOptions.js');
const checkOscp = require('./oscp/checkOscp');
const qrCode = require('./qrcode/qrCode');
const btoa = require('btoa');


module.exports = {
  version: '1.0',
  networkScope: networkScope,
  primeRouterObjs: getRouterObjs,
  primeData: getPrimeData,
  jsonFromCsv: jsonFromCsv,
  csvFromJson: csvFromJson,
  ciscoOption43: ciscoOption43,
  asyncRequest: asyncRequest,
  requestOptions: requestOptions,
  readFile: readFile,
  deleteFile: deleteFile,
  prtgOptions: prtgOptions,
  writeFile: writeFile,
  fileStats: fileStats,
  macFromString: parseMacFromString,
  ipFromString: parseIpFromString,
  reverseLookup: reverseIpLookup,
  dirContents: readDirectory,
  flattenArray: flattenArray,
  dedupedObj: deDupeObjArray,
  stdev: standardDeviation,
  dateFromFileTime: dateFromFileTime,
  sha1Hash: sha1Hash,
  hostCertProperties: hostCertProperties,
  readFiles: readFileDataNn,
  pingV4Nn: nodePing,
  basicAuthString: btoa,
  testSSH: sshCredentialTest,
  primeDeviceProperties: primeDeviceProperties,
  groupItems: groupItems,
  mergeObjects: mergeObjects,
  filterBadIpV4: filterBadIpV4,
  iseDeviceGroups: iseDeviceGroups,
  iseEndpointMacInfo: iseEndpointMacInfo,
  iseEndpointUpdate: iseEndpointUpdate,
  iseEndpointIdInfo: iseEndpointIdInfo,
  xmlToJson: xmlToJson,
  ciscoDecodeOption43: ciscoDecodeOption43,
  velocloudGetEdgeConfigurationStack: velocloudGetEdgeConfigurationStack,
  velocloudGetEdgeMgmtIp: velocloudGetEdgeMgmtIp,
  standardizedArrayFromString: standardizedArrayFromString,
  amznConnectReqirements: amznConnectReqirements,
  tesseractOcr: tesseractOcr,
  checkOscp: checkOscp,
  qrCode: qrCode,
};
