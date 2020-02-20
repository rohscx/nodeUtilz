// processes very large files one line at a time. Paused between lines,
const isLineEmpty = require('./isLineEmpty.js');
const logCapture = require('../debug/logCapture.js');
const fs = require('fs');

module.exports = function() {
  this.line = function(dataPath, eventStream, accum) {
    return new Promise((resolve, reject) => {
      const myLogs = new logCapture();
      const myErrorLogs = new logCapture();
      let lineNr = 0;
      let s = fs
        .createReadStream(dataPath)
        .pipe(eventStream.split())
        .pipe(
          eventStream
            .mapSync(function(line) {
              // pause the readstream
              s.pause();
              lineNr += 1;
              // process line here and call s.resume() when rdy
              // function below was for logging memory usage
              // logMemoryUsage(lineNr);
              if (isLineEmpty(line)) {
                //console.log("******",line,"&&&&&&&&&&")
                accum.process();
                accum.clear();
              } else {
                accum.add(line);
              }

              // resume the readstream, possibly from a callback
              s.resume();
            })
            .on('error', function(err) {
              myErrorLogs.addLog(`Error while reading file. \n ${err}`);
              myErrorLogs.getLogs();
              reject(err);
            })
            .on('end', function() {
              myLogs.addLog(
                `Read entire file. \n Total Lines streamed: ${lineNr} \n Total Writes to Disk: ${accum.getCounter()}`
              );
              myLogs.getLogs();
              resolve("My God, it's full of stars!");
            })
        );
    });
  };
};
