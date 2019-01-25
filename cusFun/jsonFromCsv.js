/*
 * Convert a CSV String to JSON
 */
module.exports = function(csvString) {
  const json = [];
  const csvArray = csvString.split('\n');

  // Remove the column names from csvArray into csvColumns.
  // Also replace single quote with double quote (JSON needs double).
  const csvColumns = JSON
      .parse('[' + csvArray.shift().replace(/'/g, '"') + ']');

  csvArray.forEach(function(csvRowString) {
    const csvRow = csvRowString.split(',');

    // Here we work on a single row.
    // Create an object with all of the csvColumns as keys.
    jsonRow = {};
    for ( let colNum = 0; colNum < csvRow.length; colNum++) {
      // Remove beginning and ending quotes since stringify will add them.
      const colData = csvRow[colNum].replace(/^['"]|['"]$/g, '');
      jsonRow[csvColumns[colNum]] = colData;
    }
    json.push(jsonRow);
  });
  return json;
};
