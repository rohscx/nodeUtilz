const QRCode = require('qrcode');

module.exports = function (data, options = {output:'terminal',qrOptions:{}}) {
    return new Promise((resolve, reject) => {
        const {output, qrOptions} = options;
        const htmlGenerator = (htmlElement) => {
            return `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>qrCode</title>
                    </head>
                <body>
                <img src=${htmlElement} />
                </body>
                </html>
            `;

        };
        switch (output) {
            case "terminal":
                QRCode.toString(data, {type:'terminal'})
                .then(url => {
                    // debug
                    //console.log(url)
                    resolve(url)
                })
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
                break;
            case "html":
                    QRCode.toDataURL(data, qrOptions)
                    .then(url => {
                        // debug
                        //console.log(url)
                        resolve(htmlGenerator(url))
                    })
                    .catch(err => {
                        console.error(err)
                        reject(err)
                    })
                    break;
        
            default:
                QRCode.toDataURL(data, qrOptions)
                .then(url => {
                    // debug
                    //console.log(url)
                    resolve({url})
                })
                .catch(err => {
                    console.error(err)
                    reject(err)
                })
                break;
        }

    })
}

