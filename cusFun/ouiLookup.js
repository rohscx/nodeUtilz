const https = require('https')
const hashTable = require('./hashTable.js')
const hashFunction = require('./getHash.js')


module.exports = function (data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'gitlab.com',
            port: 443,
            path: '/wireshark/wireshark/-/raw/master/manuf',
            method: 'GET'
          }
        const sourceMacAddresses = data
        const makeHasTable = (data) => {
            hTable = new hashTable(hashFunction, (data.length / 4))
            data.map((data) => hTable.add(data[0],`${data.slice(1,data.length).join(" ")}`))
            // console.log(hTable.print())
            return hTable
        }
        const ouiFilter = (data) => {
            const rePattern = new RegExp('([0-9A-Fa-f]{2}:)+')
            if (data.match(rePattern)) {
                return true
            } else {
                return false
            }
        }
        const createObj = (data) => {
            data = Buffer.concat(data).toString()
            splitOnNewLine = data.split('\n')
            filterOnOui =  splitOnNewLine.filter((data) =>  ouiFilter(data))
            splitOnTab = filterOnOui.map((data) => data.split("\t"))
            hashedOuis = makeHasTable(splitOnTab)
            lookupResults = sourceMacAddresses.map((data) => {
                oui = data.slice(0,8)
                result = hashedOuis.lookup(oui)
                return {mac:data,oui:oui,result:result}
            })
            resolve(lookupResults)
        }
    
        const req = https.request(options, res => {
            const data = []
            console.log(`statusCode: ${res.statusCode}`)
          
            res
            .on('data', d => {
                data.push(d)
            })
            .on('end', () => {
                console.log("end")
                return createObj(data)
        
              })
          })
          
          req.on('error', error => {
            reject(error)
            console.error(error)
          })
    
          req.end()
    })

};
