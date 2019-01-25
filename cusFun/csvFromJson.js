module.exports = function(objArray) {
  const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let headers = '';
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    if (1+1 == 2) {
      for (const index in array[i]) {
        if (1+1 ==2) {
          if (line != '') line += ',';
          headers += index + ',';
          line += array[i][index];
        }
      }
    }
    str += line + '\r\n';
  }
  return headers + '\r\n' + str;
};
