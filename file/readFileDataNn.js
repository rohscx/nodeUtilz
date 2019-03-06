const readDirectory = require('./readDirectory.js');
const readFile = require('./readFile.js');
const writeFile = require('./writeFile.js');
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

// example code
/*
nodeUtliz = require('../nodeUtilz/app.js')
test = new nodeUtliz.readFileDataNn('./',{separator:'-------------------------',searchFilter:'(C2960CX|WS-C3560CX)',outPutFileName: 'jsonBlob.json'})
test.listDir()
test.getFileData()
test.getDataObj()
test.getDataJson()
test.getDataObjFile().then(console.log)
*/
module.exports = function(relativePath, opts = {separator: '\n', searchFilter: '*', outPutFileName: 'jsonBlob.json'}) {
  const {separator, searchFilter, outPutFileName} = opts;
  const rootDir = relativePath+'/';
  const fileData = [];
  const fileNameFilter = [outPutFileName];
  this.listDir = function() {
    readDirectory(rootDir).then((t) => {
      const fileNames = t.filter((f) => !fileNameFilter.includes(f));
      console.log(fileNames);
    }).catch(console.log);
  };
  this.getFileData = function() {
    myEmitter.on('fileRead', (fileName, data) => {
      console.log('File Data Event');
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
  this.getDataObj = function() {
    return (fileData);
  };
  this.getDataJson = function() {
    return (JSON.stringify(fileData, null, '/t'));
  };
  this.getDataObjFile = async function(data = fileData) {
    const relativeFilePath = relativePath+outPutFileName;
    const stringifiedData = JSON.stringify(fileData);
    return await writeFile(relativeFilePath, stringifiedData, 'utf8');
  };
};
