const asyncRequest = require('../request/asyncRequest.js');
const getScope = require('../cusFun/networkScope.js');

module.exports = async function(data, callBack) {
  if (!data) {
    return { error: 'no data' };
  }
  const dataCopy = data;
  console.time('totalRequest');
  const keys = Object.keys(dataCopy);
  for (const d of keys) {
    const keys1 = Object.keys(dataCopy[d]);
    for (const d1 of keys1) {
      for (const d2 of dataCopy[d][d1]) {
        console.time('eachRequest');
        const request = await asyncRequest(d2.requestOptions);
        const siteData = d2.siteData;
        console.timeEnd('eachRequest');
        const emptyEmpty = [];

        if (JSON.parse(request).queryResponse.entity[0] === undefined) {
          return console.log(request);
        }
        const routerData = JSON.parse(request).queryResponse.entity[0]
          .inventoryDetailsDTO;
        const {
          summary,
          deviceId,
          ipInterfaces = {
            ipInterface: [{ name: null, network: null, vlan: null }],
          },
          cdpNeighbors = { cdpNeighbor: [] },
          ethernetInterfaces = {
            ethernetInterface: [
              {
                name: null,
                network: null,
                vlan: null,
                speed: null,
              },
            ],
          },
        } = routerData;
        const { ipInterface } = ipInterfaces;
        const { ethernetInterface } = ethernetInterfaces;
        const interfaceSpeeds = ethernetInterface.reduce((n, o) => {
          const { name = null, speed = null } = o;
          if (speed !== null) {
            n[name] =
              typeof speed.longAmount == 'number'
                ? (speed.longAmount / 1000000).toString()
                : 'N/A';
          }

          return n;
        }, {});
        // if (summary.deviceName.search('yuma') != -1)  console.log(interfaceSpeeds,summary.deviceName)
        // console.log(interfaceSpeeds,summary.deviceName)
        // not int he mood, but this should be a for loop
        for (each of ipInterface) {
          const { ipAddress, name, network = ' ', vlan = '1' } = each;
          const filter = new RegExp(/\.\d+/);
          if (name) {
            const ipRegex = new RegExp(/^(\d+(\.\d+){3}\/\d+)$/);
            if (ipAddress.search(ipRegex) !== -1 && ipAddress !== '0.0.0.0/0') {
              const test = await getScope(ipAddress);
              const { ip, mask, network, hosts } = test[0];
              // console.log(increment)
              each.network = network;
              each.hosts = hosts;
              if (name.search(filter) != -1) {
                const split = name.split('.');
                each.vlan = split[1];
              } else {
                each.vlan = vlan;
              }
            } else {
              each.network = network;
              each.vlan = vlan;
            }
          } else {
            each.network = network;
            each.vlan = vlan;
          }
          each.speed =
            interfaceSpeeds[name] === undefined ? 'N/A' : interfaceSpeeds[name];
          emptyEmpty.push(each);
        }

        const { cdpNeighbor } = cdpNeighbors;
        summary['primeId'] = deviceId;
        const deviceData = {
          routerData: summary,
          looBackZero: emptyEmpty.filter(
            f =>
              f.name.toLowerCase().search('loopback') !== -1 &&
              f.operationalStatus.toLowerCase() != 'down'
          ),
          interfaceTunnel: emptyEmpty.filter(
            f =>
              f.name.toLowerCase().search('tu') !== -1 &&
              f.operationalStatus.toLowerCase() != 'down'
          ),
          interfaceGi: emptyEmpty.filter(
            f =>
              f.name.toLowerCase().search('gi') !== -1 &&
              f.operationalStatus.toLowerCase() != 'down'
          ),
          interfaceFe: emptyEmpty.filter(
            f =>
              f.name.toLowerCase().search('fa') !== -1 &&
              f.operationalStatus.toLowerCase() != 'down'
          ),
          interfaceMu: emptyEmpty.filter(
            f =>
              f.name.toLowerCase().search('multi') !== -1 &&
              f.operationalStatus.toLowerCase() != 'down'
          ),
          cdpNeighbors: cdpNeighbor,
          siteData: siteData,
        };
        // console.log(deviceData)
        // if (deviceData.routerData.deviceName.search('yuma') != -1)console.log(deviceData)
        d2['payload'] = deviceData;
      }
    }
  }
  console.timeEnd('totalRequest');
  callBack(dataCopy);
};
