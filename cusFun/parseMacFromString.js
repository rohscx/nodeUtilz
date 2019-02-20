// a little slower but works with all data types

module.exports = function(data, options = {}) {
  const macs = (string) => {
    return string.split('\n')
        .map((d) => d.split(' ').filter((f) => f.search(RegExp(/(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9A-Fa-f]{4}[.:-]){2})/)) != -1))
        .filter((f )=> f.length > 0).map((d) => d.join(''));
  };
  const stripDeliminator = (array) => {
    return array.map((d) => d.replace(RegExp(/([-.:])/, 'g'), ''));
  };
  const addDeliminator = (array, ...options) => {
    const [deliminator = ':', spacing = 2] = options;
    if (options) {
      const regExpVar = `.{1,${spacing}}`;
      const regExp = new RegExp(regExpVar, 'g');
      return array.map((d) => d.match(regExp).join(deliminator));
    } else {
      const regExpVar = `.{1,${spacing}}`;
      const regExp = new RegExp(regExpVar, 'g');
      return array.map((d) => d.match(regExp).join(deliminator));
    }
  };
  responses = macs(data);

  if (options.format) console.log(addDeliminator(stripDeliminator(responses), options.format[0], options.format[1]));
  if (options.pretty) console.log(addDeliminator(stripDeliminator(responses)));
  if (Object.keys(options).length === 0) console.log('OPTIONS NOT FOUND: accepts options as {pretty:true} or {format:[":", 4]}');
  return responses;
};
