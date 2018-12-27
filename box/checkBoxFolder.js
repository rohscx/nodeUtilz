const logCapture = require('../debug/logCapture.js');
module.exports = function checkBoxFolder (BoxSDK,boxSecurityObject,boxAppUserId,folderId,callBack) {
  const myLogs = new logCapture();
  const myErrorLogs = new logCapture();

  const sdk = new BoxSDK({
  	clientID: boxSecurityObject.boxAppSettings.clientID,
  	clientSecret: boxSecurityObject.boxAppSettings.clientSecret,
  	appAuth: {
  		keyID: boxSecurityObject.boxAppSettings.appAuth.publicKeyID,
  		privateKey: boxSecurityObject.boxAppSettings.appAuth.privateKey,
  		passphrase: boxSecurityObject.boxAppSettings.appAuth.passphrase
  	}
  });
  const generateFolderObject = (entriesArray) => {
    return entriesArray
    .filter(f => f.type === 'folder')
    .reduce((n,o) => {
      const folderObj = {
        name:o.name,
        id:o.id,
        type:o.type
      };
      n.push(folderObj);
      return n;
    },[])
  }
  // Create auth client
  const appUserClient = sdk.getAppAuthClient('user', boxAppUserId);

  // Get some of that sweet, sweet data!
  appUserClient.users.get(appUserClient.CURRENT_USER_ID, null, function(err, currentUser) {
    if(err) throw err;
    myLogs.addLog('Hello, ' + currentUser.name + '!')
    //console.log('Hello, ' + currentUser.name + '!');
    myLogs.addLog(currentUser)
    //console.log(JSON.stringify(currentUser))
  });
  // Get more of that sweet, sweet data!
  appUserClient.folders.getItems(folderId,{fields:"name,id,created_at"})
  .then(t => {
    //console.log(t.entries)
    //arrayResponse.push(generateFolderObject(t.entries))
    //console.log(arrayResponse);
    callBack(generateFolderObject(t.entries))

  })


};
