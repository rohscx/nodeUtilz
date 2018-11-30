// it fast because it generate a hash table. Kinda like the MAC Oui look up thing you made.
const daysInMilliseconds = require('./daysInMilliseconds.js');
module.exports = function getDateFunc (time){
  return function (data) {
    const todayEpoch = new Date().getTime();
    const fileAgeLimit = todayEpoch - daysInMilliseconds(time);
    const dateRegex = new RegExp(/.*/)
    const split = data.split(" ");
    const date = split.reduce((n,o,i) => {
      if (i <= 2) {
        n.push(o);
      }
      return n;
    },[]).join(" ")
    const standardDate = new Date(date);
    if (standardDate.getTime() > fileAgeLimit){
      //console.log(standardDate.toLocaleDateString(),standardDate.toLocaleTimeString())
      return true;
    } else {
      return false;
    }
  }
}
