// it fast because it generate a hash table. Kinda like the MAC Oui look up thing you made.
module.exports = function DataAccumulator(func, callBackDiskWrite) {
  const procFunc = func;
  let accumString = '';
  function counter(start) {
    let s = start;
    return function(callBack) {
      s = s + 1;
      return callBack(s);
    };
  }
  let counter0 = counter(0);

  this.add = function(data) {
    accumString += data + '\n';
  };
  this.clear = function() {
    accumString = '';
  };
  this.getCounter = function() {
    return counter0(d => d - 1);
  };
  this.process = function() {
    if (procFunc(accumString)) {
      counter0(d => {
        if (d % 1000 === 0) console.log(`count ${d} \n ${accumString}`);
      });
      accumString += '\r\n';
      callBackDiskWrite(accumString);
    }
  };
  this.fileSystem = function(callBack) {
    return callBack();
  };
};
