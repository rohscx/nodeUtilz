/* s test in browser
1.1.0.0/16

1.1.1.1/32
1.1.2.1/32
sampleData =`
1.1.1.1/24
   2.2.2.2/24
  1.1.2.1/24
4.4.4.4/24
  4.0.0.0 /8
  6.6.6.6/ 24
  6.6.6.6/ 4
 192.168.1.1/16
192.156.101.1/8
`
splitString(sampleData)
.then(t => {
  validateIPv4(t).then(t => {
    console.log(t)
    if (t.inValid.length > 0) console.log(t,"\ncheck this this are bad")
    octentBase2Convert(t).then(t => {
    console.log(t)
  })
    // const paddedBase2 = base2Padding(octentBase2Convert);
    // const sortedBase2 = paddedBase2.sort();
    // const comparedBase2 = binaryCompare(sortedBase2);
    // console.log(sortedBase2)
    // console.log(paddedBase2)
    // console.log(comparedBase2)
    // return sortedBase2;
  })
})

*/

/*
sameple data2
"10.80.23.253/24\n10.72.202.205/28\n10.72.245.122/30\n…10.80.123.252/24\n67.61.168.114/30\n10.80.23.252/24"
*/

const splitString = require('./lib/networkScope/splitString.js');
const validateIPv4 = require('./lib/networkScope/validateIPv4.js');
const octentBase2Convert = require('./lib/networkScope/octentBase2Convert.js');
const base2Padding = require('./lib/networkScope/base2Padding.js');
const deriveNetwork = require('./lib/networkScope/deriveNetwork.js');
const base2ToBase10 = require('./lib/networkScope/base2ToBase10.js');

module.exports = async function(data) {
  // const split = await splitString(data)
  // const validated = await validateIPv4(split)
  // const convertedBase2 = await octentBase2Convert(validated)
  // const padded = await base2Padding(convertedBase2)
  // const derived = await deriveNetwork(padded)
  // const convertedBase10 = await base2ToBase10(derived)

  const split = await new Promise((res, rej) => {
    splitString(data)
      .then(t => validateIPv4(t))
      .then(t => octentBase2Convert(t))
      .then(t => base2Padding(t))
      .then(t => deriveNetwork(t))
      .then(t => base2ToBase10(t))
      .then(t => res(t))
      .catch(c => rej(c));
  });
  return split;
};

//
//
// //cleanData oldName
// function splitString (data, splitOn = "\n"){
//   return new Promise ((resolve,reject) => {
//     const splitString = data.split(splitOn);
//     const trimString = splitString.map(d => {
//       return d.trim()
//     })
//     const dataString = trimString.filter(f => f.length > 0);
//     if (dataString.length === 0) return reject(dataString);
//     return resolve(dataString);
//   })
// }
//
// function octentBase2Convert(data){
//   return new Promise ((resolve,reject) => {
//     const asBase2 = data.map(({ip,mask}) => {
//       const splitIp = ip.split(".");
//       const base2Ip = splitIp.map(d => base10Convert2(d));
//       const base2Mask = base10CidrBase2(mask);
//       return {ip:base2Ip,mask:base2Mask}
//     },[])
//     resolve(asBase2);
//   })
// }
//
//
// function base10CidrBase2 (data) {
//   return [8,16,24,32].reduce((n,o,i) => {
//     const allZero = "00000000";
//     const allOne = "11111111";
//     const cidr = data === "8" ? "255" : data;
//     const base2Cidr = base10Convert2(cidr);
//     if (n.includes(base2Cidr)) {
//       n.push(allZero)
//     } else if (cidr <= o){
//       n.push(base2Cidr)
//     } else {
//       n.push(allOne)
//     }
//     return n;
//   },[])
// }
//
// function splitIpMask (data) {
//   const splitData = data.reduce((n,o)=>{
//   const [i,m] = o.split("/").map(d=> d.trim());
//   n.push({ip:i,mask:m});
//   return n;
//   },[])
//   return splitData;
// }
//
//
// function hasIpV4 (data) {
//   //const ipRegEx = new RegExp(/(\d+.\d+.\d+.\d+$)/);
//   const ipRegEx = new RegExp(/((^\d{1,3}\.)(\d{1,3}\.)(\d{1,3}\.)(\d{1,3}))/);
//   const arrayOfBooleans = data.map(d => {
//     const coerceString = d.toString();
//     // debug
//     //console.log(coerceString," ",coerceString.search(ipRegEx))
//     if (coerceString.search(ipRegEx) === -1){
//       return false; // has a problem
//     } else {
//       return true; // has no problem
//     }
//   })
//   // debug
//   //console.log(arrayOfBooleans)
//   const isTrue =  (currentValue) => {
//     return currentValue === true;
//   }
//   return arrayOfBooleans.every(isTrue);
// }
//
// function hasCidr (data) {
//   const cidrRegExd = new RegExp(/(\/\d+)/);
//   const arrayOfBooleans = data.reduce((n,o) => {
//     const coerceString = o.toString();
//     //debug
//     //console.log(coerceString," ",coerceString.search(cidrRegExd))
//     if (coerceString.search(cidrRegEx) === -1){
//       n.push(false);
//     } else {
//       n.push(true);
//     }
//     return n;
//   },[])
//   //console.log(arrayOfBooleans)
//   const isTrue =  (currentValue) => {
//     return currentValue === true;
//   }
//   return arrayOfBooleans.every(isTrue);
// }
//
// function keyHasValue (data) {
//   const test = data.map(d => {
//     // if all is good this should return an empty array.
//     return Object.keys(d).filter(f => d[f] === undefined || !d[f].length)
//   });
//   if (test.length > 0) {
//     return false; // there is a problem
//   } else {
//     return true; // there is no problem
//   }
// }
//
// function validateIPv4 (data){
//   return new Promise ((resolve,reject) => {
//
//     if (!Array.isArray(data) || typeof(data) !== "object") {
//       return reject(data);
//     } else if (data.length === 0){
//       return reject(data);
//     }
//     const ipCheckResult = hasIpV4(data);
//     if (!ipCheckResult) return reject(data);
//     const cidrCheckResult = hasCidr(data);
//     if (!cidrCheckResult) return reject(data);
//     const splitIpMaskResult = splitIpMask(data);
//     //if (keyHasValue(splitIpMaskResult)) return reject(splitIpMaskResult)
//     return resolve(splitIpMaskResult);
//   })
// }
//
// // testing in browser
//
// function pad (data,padding=8) {
//   const paddded = data.map(d => {
//     const coerceString = d.toString();
//     if (coerceString.length < padding) {
//       const neededPadding = padding - coerceString.length;
//       let tempString = "";
//       while (tempString.length < (neededPadding)){
//         tempString += "0";
//       }
//       const newString = tempString += coerceString;
//       return newString;
//
//     } else {
//       return d;
//     }
//   })
//   return paddded;
// }
//
// function base2Padding(data) {
//   return new Promise((resolve,reject) => {
//     const padMe = data.reduce((n,o) => {
//       const {ip,mask} = o;
//       const padIp = pad(ip)
//       const padMask = pad(mask)
//       n.push({ip:padIp,mask:padMask});
//       return n;
//     },[])
//     resolve(padMe);
//   })
// }
//
//
// function base10Convert2 (data) {
//   const coerceInt = +data;
//   if (isNaN(coerceInt)) false // do better error checking
//   const coerceIntBase2 = coerceInt.toString(2);
//   return coerceIntBase2;
// }
// // type of theorpy/treatment EMDR. Trama theorypy, over active limic system "fight or flight". Subconious physoclogical trama.
// // triggered by memories. Sensory. Less time, less
//
// // Battery of assesment is a type of assement towards something. Towards Diganosis recomendations for treatment, what are you trying to understand about the persons personality.
// // can be done in a way that is theoputic, if you engage with questions. more time and energy. More Achodemic stuff
//
// function ipOctetCompare (a,b){
//   return (parseInt(a,2) & parseInt(b,2));
// }
//
// function binaryCompare (data) {
//   const compare = data.reduce((n,o)=>{
//     const [oA1,oB1,oC1,oD1] = o; // this might not be needed but it's nice to have
//     let tempRelated = {[o]:[]};
//     let tempUnRelated = {[o]:[]};
//     for (const ip of data) {
//       const [oA2,oB2,oC2,oD2] = ip; // this might not be needed but it's nice to have
//       const oct = ipOctetCompare;
//       const result = [oct(oA1,oA2),oct(oB1,oB2),oct(oC1,oC2),oct(oD1,oD2)];
//       if (result.reduce((n,o)=> n+o,0) === 0) {
//         tempUnRelated[o].push(result)
//       } else {
//         tempRelated[o].push(result)
//       }
//     }
//     n.related.push(tempRelated);
//     n.unRelated.push(tempUnRelated);
//     return n;
//   },{related:[],unRelated:[]});
//   return compare;
// }
//
// function deriveNetwork (data) {
//   return new Promise((resolve,reject) => {
//     const oct = ipOctetCompare;
//     const networkData = data.reduce((n,o)=>{
//       const [oA1,oB1,oC1,oD1] = o.ip;
//       const [oA2,oB2,oC2,oD2] = o.mask;
//
//       let tempRelated = {[o]:[]};
//       let tempUnRelated = {[o]:[]};
//       const network = [oct(oA1,oA2),oct(oB1,oB2),oct(oC1,oC2),oct(oD1,oD2)]
//       const networkBase2 = network.map(d=>base10Convert2(d));
//       // debug
//       // console.log(o.ip,o.mask,networkBase2)
//       n.push({ip:o.ip,mask:o.mask,network:pad(networkBase2)})
//       return n;
//     },[]);
//     for (const d of networkData) {
//       const {ip,mask,network} = d;
//       const subOfArray = network.reduce((n,o) => n + +o,0);
//       if (subOfArray === 0) return reject(networkData)
//     }
//     return resolve(networkData);
//   })
// }
//
// function subnetMask (number){
//   let n = number;
//   let emptyArray = [];
//   do {
//     // code block to be executed
//     n = minusEight(n);
//     emptyArray.push("11111111")
//   }
//   while (n > 8);
//   emptyArray.push(padZero(n))
//   return emptyArray
// }
//
// function padZero (n){
//   let newString=""
//   for (let y = 0 ; y!=n; y++) {
//     newString =  newString+"1"
//   }
//
//
//   do {
//     newString = newString + "0";
//   } while (newString.length < 8)
//   return newString;
// }
