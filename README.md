# nodeUtilz

My NODE .js toolkit

## Installation

    npm install nodeutilz

## Method Utilization Examples

### API VERSION 1

```js
const nU = require('nodeUtilz');
```

### testSSH:

```js
utilz
  .testSSH(['10.76.254.254'], 'jSnow', 'nedStarkIsNotDead')
  .then(console.log);
```

### pingV4Nn

```js
utilz.pingV4Nn(['8.8.8.8', '1.1.1.1', '8.8.4.4']).then(console.log);
```

### macFromString

```js
options = {
  string: 'f834.41e7.82a9 \n 10f1.f22a.7728 \n a018.2894.6aa0 0010.4918.33dc',
  options: {
    format: [':', 2],
    case: 'lower',
  },
};

utilz.macFromString('cc70.ed27.6781', options);
```

### primeDeviceProperties

```js
opts = {
  allowed: [],
};
utilz
  .primeDeviceProperties(
    ['11.10.10.10', '10.11.11.11'],
    'primeServer',
    'authToken',
    opts
  )
  .then(console.log)
  .catch(console.log);
```

### mergeObjecs

```js
const newObject = utilz.mergeObjecs([{ a: 1 }, { b: 2 }, { c: 3 }]);
```

### iseDeviceGroups

```js
opts = {
  allowed: [],
};
utilz
  .iseDeviceGroups(['homeSwitc', 'spaceRou'], 'iseServer', 'authToken', opts)
  .then(console.log)
  .catch(console.log);
```

### iseEndpointMacInfo

```js
opts = {
  allowed: [],
};
utilz
  .iseEndpointMacInfo(
    ['00:26:CB:3C:18:BC', '3C:18:A0:78:5E:D0'],
    'iseServer',
    'authToken',
    opts
  )
  .then(console.log)
  .catch(console.log);
```

### iseEndpointIdInfo

```js
opts = {
  allowed: [],
};
utilz
  .iseEndpointIdInfo(
    ['<DEVICE_ID1>', '<DEVICE_ID2>'],
    'iseServer',
    'authToken',
    opts
  )
  .then(console.log)
  .catch(console.log);
```

### iseEndpointUpdate

```js
opts = {
    allowed:[]
};

utilz.iseEndpointUpdate(["<DEVICE_ID1>","<DEVICE_ID2>"],"<GROUP_ID>",<"DESCRIPTION">,"iseServer","authToken",opts).then(console.log).catch(console.log);
```

### filterBadIpV4

```js
options = { onlyIp: true };

utilz.filterBadIpV4(['1.1.1.1', '2.1.1.2', '2.3.4.2.1'], options);
```

### ciscoOption43

```js
utilz.ciscoOption43(['1.1.1.1', '2.1.1.2', '2.3.4.2.1']);
```

### ciscoDecodeOption43

```js
utilz.ciscociscoDecodeOption43('f108c0a80a05c0a80a14');
```

### velocloudGetEdgeConfigurationStack

```js
options = {
  callBack: function(data) {
    console.log('doSomethingWith', data);
  },
  url:
    'https://<cloudOrchestratorUrl>/portal/rest/edge/getEdgeConfigurationStack',
  enterpriseId: 567,
  edgeId: 1234,
  modules: ['modules'],
  authCookie: 'velocloud.session=17afa8fa3e6f30a976d2e12...',
};

utilz
  .velocloudGetEdgeConfigurationStack(options)
  .then(t => t.callBack(Object.keys(t.response)))
  .catch(console.log);
```

### velocloudGetEdgeMgmtIp

```js
options = {
  readPath: './response.json',
  writePath: './loopbacks.json',
  veloUrl:
    'https://<cloudOrchestratorUrl>/portal/rest/edge/getEdgeConfigurationStack',
  veloAuthCookie: 'velocloud.session=17afa8fa3e6f30a976d2e12...',
};

utilz.readFile(options.readPath, 'utf8').then(t => (data = JSON.parse(t)));
utilz
  .velocloudGetEdgeMgmtIp(data, options.veloUrl, options.veloAuthCookie)
  .then(t =>
    utilz
      .writeFile('./loopbacks.json', JSON.stringify(t, null, '\t'), 'utf8')
      .catch(console.log)
  );
```

### csvFromJson

```js
unwind = ["key1","key2"...];

utilz.csvFromJson(object,objectKeys,unwind).then(console.log).catch(console.log)
```

### checkOscp

```js
(async () => {
  const certificateBuffer = await utilz.readFile('./bogusCert.crt');
  const rootCertificateBuffer = await utilz.readFile('./bogusCertCA.crt');

  utilz
    .checkOscp(certificateBuffer, rootCertificateBuffer)
    .then(console.log)
    .catch(console.log);
})();
```

### qrCode

```js
const data = 'I am just a man who...';
// if options is used resolves to a uri encoded string for browsers. Else attempts to print image to console.
// output options [uri, htmlCanvas]
const options = { output: 'uri', qrOptions: {} };

utilz.qrCode(data).then(console.log);
```

### writeFile

```js
const filePath = './myFile.txt';
const fileData = 'OSPF Anatomy of an INternet Routing Protocol....';
const encoding = 'utf8';

utilz
  .writeFile(filePath, fileData, encoding)
  .then(console.log)
  .catch(console.log);
```

### primeData

```js
const serverUrl = 'https://cisciPrimeServer2915199441233.replace.this.net';
const serverUri =
  '/webacs/api/v1/data/Devices.json?.full=true&.sort=ipAddress&deviceName=contains(marsOne)&deviceType=contains(29xx)';
const serverAuth = 'Basic madeUpBasicAuthPassword';

// URI can be used to filter results
const requestOptions = utilz.primeRequestOptions(
  serverUrl,
  serverUri,
  serverAuth
);
// Do some work on the data
utilz
  .primeData(requestOptions)
  .then(console.log)
  .catch(console.log);
```

### hashTable

```js
const {hashFunction} = require('nodeutilz');
const hashTableSize = 50; // The size of the hash table impacts how fast data is recalled. Choose wisely
const someData = [{really:1,badExample:2}];
const hashable = utilz.newHashTable(hashFunction,hashTableSize);

// Example
const {really, badExample} = someData[0]:
hashable.add(really,badExample);
const lookup = hashable.lookup(really);
console.log(lookup) // 2

// Methods
hashable.add
hashable.lookup
hashable.remove
hashable.print
```
