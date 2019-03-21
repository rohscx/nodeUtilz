const fs = require('fs');
// retrieve the last modified date of a file
// sameple output, mtime is the last modified time.
/*
{ dev: 2049
, ino: 305352
, mode: 16877
, nlink: 12
, uid: 1000
, gid: 1000
, rdev: 0
, size: 4096
, blksize: 4096
, blocks: 8
, atime: '2009-06-29T11:11:55Z'
, mtime: '2009-06-29T11:11:40Z'
, ctime: '2009-06-29T11:11:40Z'
}
*/


module.exports = function readFile(relativePath, callBack) {
  return new Promise((res, rej) => {
    fs.stat(relativePath, (err, stats) => {
      if (err) rej(err);
      else res(stats);
    });
  });
};
