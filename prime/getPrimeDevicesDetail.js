module.exports = async function getPrimeDevicesDetail(urlString, uriString, fString, mString) {
  const result = await getPrimeData(urlString, uriString, fString, mString);
  // debug
  // console.log(typeof(result))
  // convert reterned text to object
  const data = JSON.parse(result);
  // console.log(typeof(data))
  // check that this is an object
  if (typeof(data)!== 'object') return Promise.reject(data);
  return Promise.resolve(data);
};
