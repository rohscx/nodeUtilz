// returns only the desired object properties

module.exports = function (data, allowedKeys){
    return new Promise((resolve, reject) => {
        if (!data | !allowedKeys | typeof(allowedKeys) !== "object") reject({rejected: ["nodeUtil","bad data in Parameter"]})
        const filtered =  Object.keys(data)
        .filter(key => allowedKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
        resolve(filtered)
    })
}