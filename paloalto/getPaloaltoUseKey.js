module.exports = function getPaloaltoUseKey(url, path, apiKey) {
  // 'https://10.16.30.20/api'
  return {method: 'GET',
    url: url,
    qs: {type: 'op', cmd: path, key: apiKey},
    headers: {'cache-control': 'no-cache'},
  };
};
