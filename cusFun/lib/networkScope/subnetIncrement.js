module.exports = function subnetIncrement (number){
//cheat as it only returns information about the last octent... really
  const key = {
    8:127,
    7:63,
    6:31,
    5:15,
    4:7,
    3:3,
    2:1,
    1:0}
  if (number == 24){
    return 255
  } else if (number > 24) {
    return key[(32 - (number-1))];
  } else if (number > 16) {
    return key[(24 - (number-1))];
  } else if (number > 8) {
    return key[(16 - (number-1))];
  }
}
