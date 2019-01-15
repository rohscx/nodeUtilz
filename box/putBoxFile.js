const LogCapture = require('../debug/logCapture.js');
module.exports = function putBoxFile(BoxSDK, boxSecurityObject, boxAppUserId, folderId, fileName, stream) {
  const myLogs = new LogCapture();
  const myErrorLogs = new LogCapture();

  /**
   * sends file to box.
   * @param {obj} fileData file data object.
   * @param {string} fileName name of the file.
   * @return {int} The sum of the two numbers.
   */
  function getFileId(fileData, fileName) {
    let fileId = '';
    for (file in fileData) {
      if (fileData[file].hasOwnProperty(fileName)) {
        const fileObject = fileData[file];
        fileId = fileObject[fileName];
      }
    }
    return fileId;
  }


  const sdk = new BoxSDK({
    clientID: boxSecurityObject.boxAppSettings.clientID,
    clientSecret: boxSecurityObject.boxAppSettings.clientSecret,
    appAuth: {
      keyID: boxSecurityObject.boxAppSettings.appAuth.publicKeyID,
      privateKey: boxSecurityObject.boxAppSettings.appAuth.privateKey,
      passphrase: boxSecurityObject.boxAppSettings.appAuth.passphrase,
    },
  });
  // Create auth client
  const appUserClient = sdk.getAppAuthClient('user', boxAppUserId);

  // Get some of that sweet, sweet data!
  appUserClient.users.get(appUserClient.CURRENT_USER_ID, null, function(err, currentUser) {
    if (err) throw err;
    myLogs.addLog('Hello, ' + currentUser.name + '!');
    // console.log('Hello, ' + currentUser.name + '!');
    myLogs.addLog(currentUser);
    // console.log(JSON.stringify(currentUser))
  });
  // Get more of that sweet, sweet data!
  appUserClient.folders.getItems(folderId, {fields: 'name,id,created_at'}).then((t) => {
    const directoryFilesObj = t.entries.map(({name, id}) => ({[name]: id}));
    const directoryFilesObjKeys = directoryFilesObj.map((d) => Object.keys(d));
    const directoryFileNames = [].concat(...directoryFilesObjKeys);
    if (directoryFilesObj) {
      // const direcotryFilesKeys = Object.keys(directoryFilesObj);
      // drops error if file already exists
      if (directoryFileNames.includes(fileName)) {
        myErrorLogs.addLog(`\n\n File already exsists in Box folder! FileName: ${fileName} ID: ${getFileId(directoryFilesObj, fileName)} \n\n`);
        appUserClient.files.uploadNewFileVersion(getFileId(directoryFilesObj, fileName), stream).then((t) => {
          myLogs.addLog(`Successfully Up Loaded New Version of file: ${fileName} to box:\n`);
          myLogs.addLog(t);
          // console.log(`Uploaded to box:\n${JSON.stringify(t)}`)
          return myLogs.getLogs('Reset');
        });
        return myErrorLogs.getLogs('FgRed');
      }
    }
    // continues if the file does not exsist
    appUserClient.files.uploadFile(folderId, fileName, stream).then((t) => {
      myLogs.addLog(`Successfully Uploaded to box:\n`);
      myLogs.addLog(t);
      // console.log(`Uploaded to box:\n${JSON.stringify(t)}`)
      return myLogs.getLogs('Reset');
    });
  });
};
