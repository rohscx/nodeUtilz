module.exports = function generateOptions (qsFunction) {
  this.requests = [];
  this.qs = qsFunction;
  this.update = function (result,method,url,uri,auth,callBack) {
    this.requests.push(callBack(method,url,uri,this.qs(result),auth));
  }
};
