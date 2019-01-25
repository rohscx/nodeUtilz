const daysInMilliseconds = require('./daysInMilliseconds.js');
module.exports = function getDateFunc(time) {
  return function(data) {
    const todayEpoch = new Date().getTime();
    const fileAgeLimit = todayEpoch - daysInMilliseconds(time);
    const split = data.split(' ');
    const date = split.reduce((n, o, i) => {
      if (i <= 2) {
        n.push(o);
      }
      return n;
    }, []).join(' ');
    const standardDate = new Date(date);
    if (standardDate.getTime() > fileAgeLimit) {
      // console.log(standardDate.getTime(),fileAgeLimit)
      return true;
    } else {
      return false;
    }
  };
};
