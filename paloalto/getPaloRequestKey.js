module.exports = function getPaloRequestKey(url, userName, userPassword) {
  // 'https://10.16.30.20/api'
  return {method: 'GET',
    url: url,
    qs: {type: 'keygen', user: userName, password: userPassword},
    headers: {'cache-control': 'no-cache'},
  };
};
