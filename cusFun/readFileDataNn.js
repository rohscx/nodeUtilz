const readDirectory = require('.././file/readDirectory.js');
const readFile = require('.././file/readFile.js');
const writeFile = require('.././file/writeFile.js');
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

// example code
/*
nodeUtliz = require('../nodeUtilz/app.js');
test = new nodeUtliz.readFileDataNn('./import/',{separator:'-------------------------',searchFilter:'(C2960CX|WS-C3560CX)',outPutPath: './export/', outPutFileName: 'jsonBlob.json'});
test.listDirFiles() // list the dir. Show files before loaded
test.readDirFiles() // load file data from disk
test.getDataObj() // generate an object
test.getDataJson()
saveDataFile()
test.getDataObjFile().then(console.log)
*/
module.exports = function(relativePath, opts = {separator: '\n', searchFilter: '*', outPutPath: './', outPutFileName: 'jsonBlob.json', debug: false}) {
  const {separator , searchFilter , outPutPath , outPutFileName , debug} = opts;
  const rootDir = relativePath+'/';
  const fileData = [];
  const fileNameFilter = [outPutFileName];
  const dataLoaded = {ready:false};
  myEmitter.on('fileRead', (fileName, data, metaData) => {
    const {counter, fileCount} = metaData;
    if (debug) console.log(`Data Load Event: ${fileName} `);
    const parsedJson = JSON.parse(data);
    if (typeof(parsedJson) == 'object') {
      fileData.push({[fileName]: parsedJson});
    } else {
      if (debug) console.log('JSON Test Failed. Rejected:', fileName, typeof(parsedJson));
      fileData.push({[fileName]: `rejected: ${typeof(parsedJson)}`});
    }
    if (counter === fileCount) dataLoaded.ready = true;
  });
  this.listDirFiles = function() {
    readDirectory(rootDir).then((t) => {
      const fileNames = t.filter((f) => !fileNameFilter.includes(f));
      if (debug) console.log(fileNames);
      return fileNames;
    }).catch(console.log);
  };
  this.getDataObject = function() {
    return (fileData);
  };
  this.getStringifiedDataObject = function() {
    return (JSON.stringify(fileData, null, '/t'));
  };
  this.readDirFiles = function() {
    // delete arrayData / clear arraData
    this.deleteDataObj();
    myEmitter.on('fileRead', (fileName, data) => {
      if (debug) console.log(`Data Load Event: ${fileName}`);
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
          let counter = 1;
          for (const fileName of fileNames) {
            readFile(relativePath+fileName, 'utf8').then((data) => {
              const fileCount = fileNames.length;
              console.log(counter,fileCount)
              counter ++;
              myEmitter.emit('fileRead', fileName, data,{counter,fileCount});
            }).catch(console.log);
          }
        })
        .catch(console.log);
  };
  this.saveDataObjectToFile = async function(data = fileData) {
    const relativeFilePath = outPutPath+outPutFileName;
    const stringifiedData = JSON.stringify(fileData);
    return await writeFile(relativeFilePath, stringifiedData, 'utf8');
  };
  this.deleteDataObj = function() {
    fileData.length = 0;
  };
  this.dataReady = function (){
    return dataLoaded;
  }
};
