const LogCapture = require('../debug/LogCapture.js');
const checkBoxFolder = require('./checkBoxFolder.js');

// this is a shallow search, of one level deep. it returns the folder structure
module.exports = function putBoxFolder(BoxSDK, boxSecurity, boxAppUserId, rootFolderId) {
  // called to check the box folder
  function checkBox(folderId) {
    return new Promise ((res, rej) => {
      checkBoxFolder(BoxSDK, boxSecurity, boxAppUserId, folderId, (d) => res(d))
    })
  }
  // loops over response from root folder
  return checkBox(rootFolderId)
      .then((t) => {
        return new Promise((res) => {
          const someFunction = (myArray) => {
            const promises = myArray.map(async (obj) => {
              const {name, id, type} = obj;
              const subFolder = await checkBox(id);
              return {
                name, id, subFolder: subFolder,
              };
            });
            return Promise.all(promises);
          };
          res(someFunction(t));
        });
      });
};
