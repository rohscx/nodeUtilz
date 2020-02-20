module.exports = function responseWorker(emmiter, stateObj, responseObj, ...s) {
  this.dataState = stateObj;
  // put a thing here to hold the data, takes an object
  this.data = responseObj;
  this.updateAndCheck = function(objectKey) {
    this.dataState[objectKey] = true;
    console.log(this.dataState);
    const newState = Object.keys(this.dataState).map(d => this.dataState[d]);
    console.log(newState, `<== Data state. Data state change by ${objectKey}`);
    if (newState.every(e => e === true)) {
      emmiter.emit(...s, this.data);
    }
  };
};
