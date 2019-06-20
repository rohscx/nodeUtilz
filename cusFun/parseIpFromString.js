// a little slower but works with all data types

module.exports = function(data, options = {}) {
  const ips = (string) => {
    return string.split('\n')
        .map((d) => d.split(' ').filter((f) => f.search(RegExp(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/)) != -1))
        .filter((f )=> f.length > 0).map((d) => d.join(''));
  };

  const responses = ips(data);

  if (options.format) console.log(addDeliminator(stripDeliminator(responses), options.format[0], options.format[1]));
  if (options.pretty) console.log(addDeliminator(stripDeliminator(responses)));
  if (Object.keys(options).length === 0) console.log('OPTIONS NOT FOUND: accepts options as {pretty:true} or {format:[":", 4]}');
  return responses;
};