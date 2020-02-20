const getParamNames = require('../string/getParamNames');
const LogCapture = require('../debug/LogCapture.js');
module.exports = function boxFolders(
  BoxSDK,
  boxSecurityObject,
  boxAppUserId,
  folderId,
  days,
  callBack
) {
  const myLogs = new LogCapture();
  // check for missing options
  [BoxSDK, boxSecurityObject, boxAppUserId, folderId, days, callBack].map(
    (d, i) => {
      const errorMessage = `missing options: ${getParamNames(boxFolders)[i]}`;
      // console.log(typeof(d))
      if (!d) {
        myLogs.addLog(errorMessage);
        // console.log(errorMessage);
        return myLogs.getLogs();
        // return errorMessage;
      }
    }
  );

  function daysInMiliseconds(number) {
    const numberCoercion = number + 0; // coercion to number if it's a string
    return numberCoercion * 86400 * 1000;
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
  appUserClient.users.get(appUserClient.CURRENT_USER_ID, null, function(
    err,
    currentUser
  ) {
    if (err) throw err;
    myLogs.addLog('\n' + 'Hello, ' + currentUser.name + '!');
    // console.log('Hello, ' + currentUser.name + '!');
    myLogs.addLog(currentUser);
    // console.log(JSON.stringify(currentUser))
  });
  // Get more of that sweet, sweet data! '52891540087' ACA NAC Data
  appUserClient.folders
    .getItems(folderId, { fields: 'name,id,created_at' })
    .then(rootFolder => {
      const todayEpoch = new Date().getTime();
      const iseExports = rootFolder.entries.filter(f => {
        const fileAgeLimit = todayEpoch - daysInMiliseconds(days); // 5 days in miliseconds
        const fileEpoch = new Date(f.created_at);
        if (fileEpoch > fileAgeLimit) {
          // console.log(f.created_at)
          return true;
        } else {
          return false;
        }
      });
      myLogs.addLog(
        `\nfile Names identified, total files: \n${iseExports
          .map(d => d.name)
          .join('\n')}`
      );
      // console.log(`file Names identified, total files: \n${iseExports.map(d => d.name).join('\n')}`);
      const iseReports = Promise.all(
        iseExports.map((d, i) => {
          const chunks = [];
          return new Promise(function(res, rej) {
            appUserClient.files.getReadStream(d.id, null, function(
              error,
              stream
            ) {
              stream.on('data', function(chunk) {
                chunks.push(chunk);
                // console.log(chunk)
              });
              stream.on('end', function() {
                const chunksToBuffer = Buffer.concat(chunks);
                const bufferToString = chunksToBuffer.toString('utf8');
                // console.log(Buffer.concat(chunks));
                myLogs.addLog(`\nFile ${d.name} downloaded to memory\n`);
                // console.log(`File ${d.name} downloaded to memory`);
                myLogs.getLogs('Reset');
                res(bufferToString);
              });
            });
          });
        })
      ).then(t => callBack(t));
    });
};
