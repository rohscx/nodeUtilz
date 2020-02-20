module.exports = function getRequestOptions(method, url, uri, qs, auth, body) {
  if (body) {
    return {
      method: method,
      url: url + uri,
      qs: qs,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: body,
      json: true,
    };
  } else {
    return {
      method: method,
      url: url + uri,
      qs: qs,
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: auth,
      },
    };
  }
};
