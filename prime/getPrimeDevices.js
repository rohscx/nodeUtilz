const primeApi = require('../api/primeApi.js');

module.exports = async function getPrimeDevices(
  urlString,
  uriString,
  fString,
  mString
) {
  const result = await primeApi.requestAsyncPrimeData(
    urlString,
    uriString,
    fString,
    mString
  );
  // debug
  console.log(typeof result);
  // convert reterned text to object
  const data = JSON.parse(result);
  console.log(typeof data);
  // check that this is an object
  if (typeof data !== 'object') return Promise.reject(data);
  firstItem = +data.queryResponse['@first'];
  lastItem = +data.queryResponse['@last'];
  itemCount = +data.queryResponse['@count'];
  console.log(firstItem, lastItem, itemCount);
  return Promise.resolve(data);
};
