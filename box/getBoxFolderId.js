const getParamNames = require('../string/getParamNames');
const LogCapture = require('../debug/LogCapture.js');
module.exports = function boxFolders(BoxSDK, boxSecurityObject, boxAppUserId, folderId, callBack) {
  const myLogs = new LogCapture();
  // check for missing options


  const checkForSubFolders = (response) => {
    if (response.length > 0) {
      const basicFolderData = response.reduce((n, o) => {
        const {name, id, type} = o;
        n.push({name, id, type});
        return n;
      }, []);
      callBack(basicFolderData); // return folder information to the callBack
      // console.log(response.map(({name,id,type}) => [id,type,name]).join("\n"));
      response
          .map((d) => appUserClient.folders.getItems(d.id, {fields: "name,id,created_at"})
              .then((t) => {
                checkForSubFolders(generateFolderObject(t.entries));
              }));
    } else {
      callBack(response);
    }
  };
  const generateFolderObject = (entriesArray) => {
    return entriesArray
        .filter((f) => f.type === 'folder')
        .reduce((n, o) => {
          const folderObj = {
            name: o.name,
            id: o.id,
            type: o.type,
          };
          n.push(folderObj);
          return n;
        }, []);
  };
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
  appUserClient.folders.getItems(folderId, {fields: 'name,id,created_at'})
      .then((t) => {
        // console.log(t.entries)
        // arrayResponse.push(generateFolderObject(t.entries))
        //  console.log(arrayResponse);
        checkForSubFolders(generateFolderObject(t.entries));
      });
};
