// a little slower but works with all data types

module.exports = function(data, options = {}) {
  const ips = (string) => {
    return string.split(/[\n\t\r]/)
        .map((d) => d.split(' ').filter((f) => f.search(new RegExp(/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/)) != -1))
        .filter((f )=> f.length > 0).reduce((n,o) => {
          const data = o;
          console.log(typeof(n))
          if (typeof(o) !== 'object') {
            n.push(o);
          } else {
            n.push(... o);
          }
          return n;
        },[]);
  };

  const responses = ips(data);
  const onlyIp = (data) =>{
    return data.match(new RegExp(/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/,'g'))
  };
  if (Object.keys(options).length === 0) console.log('OPTIONS NOT FOUND: accepts options as {onlyIp:true}');
  // pop() or it returns a nested array
  if (options.format = true) {
    return responses.map((d) => onlyIp(d)).map((d) => d.pop());
  } else {
    return responses;
  }
};
