const groupItems = require('./groupItems');

module.exports = function(data) {
  const rejection = (data, message, callBack) => {
    console.log(message);
    callBack(data);
  };
  return new Promise((resolve, reject) => {
    // reject if data type is not string
    if (typeof data !== 'string')
      rejection(data, `Data type: ${typeof data}`, reject);
    const splitData = data.match(/.{1,2}/g);
    //Check for type
    const optionType = splitData[0];
    //reject if option type is not f1. https://www.cisco.com/c/en/us/support/docs/wireless-mobility/wireless-lan-wlan/97066-dhcp-option-43-00.html
    if (!optionType === 'f1')
      rejection(splitData, 'Option Type is not F1', reject);
    // coerce to int
    const optionLength = +splitData[1];
    if (optionLength > 16)
      rejection(
        splitData,
        `Cisco option maximum limit of 4 exeeded. Total found in option: ${optionLength /
          4}`,
        reject
      );
    const ipCount = optionLength / 4;
    // filter index 0 and 1;
    const optionValues = splitData.filter((f, i) => {
      if (i === 0 || i === 1) {
        return false;
      } else {
        return true;
      }
    });
    const base10Convert = optionValues.map(d => parseInt(d, 16));
    const groupedBase10Values = groupItems(base10Convert, 4);
    // reject if the exprected total address count does not match the total decoded items
    if (groupedBase10Values.length !== ipCount)
      rejection(
        splitData,
        `Option declared Addresses: ${ipCount} Decoded Addresses: ${groupedBase10Values.length}`,
        reject
      );
    const groupIpV4String = groupedBase10Values.map(d => d.join('.'));
    resolve(groupIpV4String);
  });
};
