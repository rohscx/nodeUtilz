const fs = require("fs");
const zlib = require("zlib");

// this can be made better
module.exports = function gzipFile (srcFilename,dstFilename,callBack) {
  return new Promise((resolve) => {
    const compress = zlib.createGzip(); // compress
    const decompress = zlib.createGunzip(); // decompress
    const readstream = fs.createReadStream(srcFilename);

    function compressfile(srcFilename,dstFilename,callBack){
        let chunks = []; // holds zip file chunks
        const newsrcFilename = dstFilename+".gz";
        const writestream = fs.createWriteStream(newsrcFilename);
        readstream.pipe(compress).pipe(writestream);
        readstream.on("data", (data)=>{
          chunks.push(data)
        })
        readstream.on("end", (data)=>{
          zlib.gzip(Buffer.concat(chunks).toString("utf8"), function (error, result) {
             if (error) throw error;
             if (callBack) callBack(result)
             resolve(newsrcFilename);
            //console.log(result);
          })
        })

        // readstream.pipe(compress).on('finish', (err,result) => {
        //   if (err) return reject(err);
        //   else {
        //     if (callBack) console.log(result)// callBack(result)
        //     resolve(newsrcFilename);
        //   }
        // })
    }
    function decompressfile(srcFilename,dstFilename,callBack){
        let chunks = []; // holds zip file chunks
        let newsrcFilename = dstFilename.replace(".gz","");
        const writestream = fs.createWriteStream(newsrcFilename);
        readstream.pipe(decompress).pipe(writestream);
        readstream.on("data", (data)=>{
          chunks.push(data)
        })
        readstream.on("end", (data)=>{
          console.log("end")
          if (callBack) {
            // return unzipped buffer
            const zipBufferData=Buffer.concat(chunks)
            zlib.gunzip(zipBufferData,function(err,data){
              callBack(data)
            })
          }
          resolve(newsrcFilename);
          // zlib.gzip(Buffer.concat(chunks).toString("utf8"), function (error, result) {
          //    if (error) throw error;
          //    if (callBack) callBack(result)
          //    resolve(newsrcFilename);
          //   //console.log(result);
          // })
        })
    }
    if(/.gz$/i.test(srcFilename)==true){
        decompressfile(srcFilename,dstFilename,callBack)
    }
    else {
        compressfile(srcFilename,dstFilename,callBack);
    }

  })

}
