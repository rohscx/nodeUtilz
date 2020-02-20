module.exports = function getPrimeDeviceType(dataObj, filterKey, filterValue) {
  const filtered = dataObj.filter(f => f.devicesDTO[filterKey] === filterValue);
  return filtered;
};
