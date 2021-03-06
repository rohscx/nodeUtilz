const LogCapture = require('../debug/LogCapture.js');
module.exports = function putBoxFolder(
  BoxSDK,
  boxSecurityObject,
  boxAppUserId,
  folderId,
  folderName,
  callBack
) {
  const myLogs = new LogCapture();
  const myErrorLogs = new LogCapture();

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
  appUserClient.users.get(appUserClient.CURRENT_USER_ID, null, function(
    err,
    currentUser
  ) {
    if (err) throw err;
    myLogs.addLog('Hello, ' + currentUser.name + '!');
    // console.log('Hello, ' + currentUser.name + '!');
    myLogs.addLog(currentUser);
    // console.log(JSON.stringify(currentUser))
  });
  // Get more of that sweet, sweet data!
  return new Promise((res, rej) => {
    appUserClient.folders.create(folderId, folderName).then(t => {
      callBack(t);
      console.log(t);
      res(t);
    });
  });
};
