const request = require('request');

module.exports = function (opts) {
    const options = {
        'method': 'POST',
        'url': opts.url,
        'headers': {
        'Content-Type': 'application/json',
        'Cookie': opts.authCookie
        },
        body: `{\n    \"enterpriseId\": ${opts.enterpriseId},\n    \"edgeId\": ${opts.edgeId},\n    \"with\":${JSON.stringify(opts.modules)}\n}`
        
        }
        console.log(JSON.stringify(options,null,'\t'))
        return new Promise((resolve, reject) => {
            request(options, function (error, response) { 
                if (error) reject(error);
                    resolve({response:JSON.parse(response.body),callBack:opts.callBack});
                });
        });
}