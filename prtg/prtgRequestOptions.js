module.exports = {
  getPausedSensors: function(sensorId, deviceId, userName, userPassword, url, uri = '/api/table.json') {
    return {method: 'GET',
      url: url+uri, // 'https://prtgServerPath.pvt/api/table.json',
      qs:
       {content: 'sensors',
         output: 'json',
         columns: 'objid,device,sensor',
         filter_status: '7',
         username: userName,
         passhash: userPassword},
      headers:
       {'cache-control': 'no-cache'}};
  },
  putResumeSensor: function(sensorId, userName, userPassword, url, uri = '/api/pause.htm') {
    return {method: 'GET',
      url: url+uri, // 'https://prtgServerPath.pvt/api/pause.htm',
      qs:
       {id: sensorId,
         action: '1',
         username: userName,
         passhash: userPassword},
      headers:
       {'cache-control': 'no-cache'}};
  },
  getDevices: function(userName, userPassword, url, uri= '/api/table.json') {
    return {method: 'GET',
      url: url+uri, // 'https://prtgServerPath.pvt/api/table.json',
      qs:
       {content: 'devices',
         output: 'json',
         columns: 'objid,probe,group,device,host',
         count: '1000',
         username: userName,
         passhash: userPassword},
      headers:
       {'cache-control': 'no-cache'}};
  },
  getDeviceSensors: function(deviceId, userName, userPassword, url, uri = '/api/table.json') {
    return {method: 'GET',
      url: url+uri, // 'https://prtgServerPath.pvt/api/table.json',
      qs:
       {content: 'sensors',
         output: 'json',
         columns: 'objid,device,sensor,status',
         count: '1000',
         id: deviceId,
         username: userName,
         passhash: userPassword},
      headers:
       {'cache-control': 'no-cache'}};
  },
  deleteDeviceSensor: function(sensorId, userName, userPassword, url, uri = '/api/deleteobject.htm') {
    return {method: 'GET',
      url: url+uri, // 'https://prtgServerPath.pvt/api/deleteobject.htm',
      qs:
       {id: sensorId,
         approve: '1',
         username: userName,
         passhash: userPassword},
      headers:
       {'cache-control': 'no-cache'}};
  },
  getSensors: function(userName, userPassword, url, uri = '/api/table.json') {
    return {method: 'GET',
      url: url+uri, // 'https://prtgServerPath.pvt/api/deleteobject.htm',
      qs:
      {content: 'sensors',
        output: 'json',
        columns: 'objid,device,sensor,status',
        username: userName,
        count: '5000',
        passhash: userPassword},
      headers:
       {'cache-control': 'no-cache'}};
  },
  getDetailsSensor: function(sensorId, count = '10', userName, userPassword, url, uri = '/api/table.json') {
    return {method: 'GET',
      url: url+uri, // 'https://prtgServerPath.pvt/api/deleteobject.htm',
      qs:
      {content: 'values',
        columns: 'datetime,value_',
        sortby: '-datetime',
        count: count,
        id: sensorId,
        usecaption: 'true',
        username: userName,
        passhash: userPassword},
      headers:
       {'cache-control': 'no-cache'}};
  },
};
