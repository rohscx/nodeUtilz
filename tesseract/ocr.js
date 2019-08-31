const Tesseract = require('tesseract.js');



module.exports = async function (data){
    const { TesseractWorker } = Tesseract;
    const worker = new TesseractWorker();

    return new Promise ((resolve, reject) => {
        worker
        .recognize(data)
        .progress((p) => {
            // debug
            //console.log('progress', p);
        })
        .then(({ text }) => {
            // debug
            //console.log(text);
            resolve(text);
            worker.terminate();
        });
    });
}