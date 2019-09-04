const PDFParser = require("pdf2json");

module.exports = function(dataPath) {
    const pdfParser = new PDFParser();
 
    return new Promise((resolve,reject) => {
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError) );
        pdfParser.on("pdfParser_dataReady", pdfData => {
            resolve(pdfData);
        });
        pdfParser.loadPDF(dataPath);
  });
}

