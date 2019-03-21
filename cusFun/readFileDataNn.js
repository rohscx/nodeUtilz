const readDirectory = require('.././file/readDirectory.js');
const readFile = require('.././file/readFile.js');
const writeFile = require('.././file/writeFile.js');
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

// example code
/*
nodeUtliz = require('../nodeUtilz/app.js');
test = new nodeUtliz.readFileDataNn('./import/',{separator:'-------------------------',searchFilter:'(C2960CX|WS-C3560CX)',outPutPath: './export/', outPutFileName: 'jsonBlob.json'});
test.listDir()
test.getFileData()
test.getDataObj()
test.getDataJson()
test.getDataObjFile().then(console.log)
*/
module.exports = function(relativePath, opts = {separator: '\n', searchFilter: '*', outPutPath: './', outPutFileName: 'jsonBlob.json'}) {
  const {separator ='\n', searchFilter = '*', outPutPath = './', outPutFileName = 'jsonBlob.json'} = opts;
  const rootDir = relativePath+'/';
  const fileData = [];
  const fileNameFilter = [outPutFileName];
  this.getListDir = function() {
    readDirectory(rootDir).then((t) => {
      const fileNames = t.filter((f) => !fileNameFilter.includes(f));
      console.log(fileNames);
    }).catch(console.log);
  };
  this.getDataObj = function() {
    return (fileData);
  };
  this.getDataStringify = function() {
    return (JSON.stringify(fileData, null, '/t'));
  };
  this.putDirData = function() {
    // delete arrayData / clear arraData
    this.deleteDataObj();
    myEmitter.on('fileRead', (fileName, data) => {
      console.log(`Data Load Event: ${fileName}`);
      const splitData = data.split(separator)
          .filter((f) => f.length > 1)
          .filter((f) => f.toLowerCase().search(new RegExp(searchFilter.toLowerCase())) != -1)
          .map((d) => d.split('\n')
              .map((d) => d.trim())
              .filter((f) => f.length > 1));
      if (splitData.length > 0) fileData.push({[fileName]: splitData});
    });
    readDirectory(rootDir)
        .then((files) => {
          const fileNames = files.filter((f) => !fileNameFilter.includes(f));
          for (const fileName of fileNames) {
            readFile(relativePath+fileName, 'utf8').then((data) => {
              myEmitter.emit('fileRead', fileName, data);
            }).catch(console.log);
          }
        })
        .catch(console.log);
  };
  this.postCombinedJson = function() {
    myEmitter.on('fileRead', (fileName, data) => {
      console.log(`Data Load Event: ${fileName} `);
      const parsedJson = JSON.parse(data);
      if (typeof(parsedJson) == 'object') {
        fileData.push({[fileName]: parsedJson});
      } else {
        console.log('JSON Test Failed. Rejected:', fileName, typeof(parsedJson));
        fileData.push({[fileName]: `rejected: ${typeof(parsedJson)}`});
      }
    });
    readDirectory(rootDir)
        .then((files) => {
          const fileNames = files.filter((f) => !fileNameFilter.includes(f));
          for (const fileName of fileNames) {
            readFile(relativePath+fileName, 'utf8').then((data) => {
              myEmitter.emit('fileRead', fileName, data);
            }).catch(console.log);
          }
        })
        .catch(console.log);
  };
  this.postWriteDataToDir = async function(data = fileData) {
    const relativeFilePath = outPutPath+outPutFileName;
    const stringifiedData = JSON.stringify(fileData);
    return await writeFile(relativeFilePath, stringifiedData, 'utf8');
  };
  this.deleteDataObj = function() {
    fileData.length = 0;
  };
};
