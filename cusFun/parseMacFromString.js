// a little slower but works with all data types

module.exports = function(data, options = {}) {
  const macs = string => {
    return string
      .split(/[\s,\n]/)
      .map(d =>
        d
          .split(' ')
          .filter(
            f =>
              f.search(
                RegExp(
                  /(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9A-Fa-f]{4}[.:-]){2}|([0-9A-Fa-f]{6}[.-][0-9A-Fa-f]{6}){1}|([0-9A-Fa-f]{12}))/
                )
              ) != -1
          )
      )
      .filter(f => f.length > 0)
      .map(d => d.join(''));
  };
  const stripDeliminator = array => {
    return array.map(d => d.replace(RegExp(/([-.:])/, 'g'), ''));
  };
  const addDeliminator = (array, ...options) => {
    const [deliminator = ':', spacing = 2] = options;
    if (options) {
      const regExpVar = `.{1,${spacing}}`;
      const regExp = new RegExp(regExpVar, 'g');
      return array.map(d => d.match(regExp).join(deliminator));
    } else {
      const regExpVar = `.{1,${spacing}}`;
      const regExp = new RegExp(regExpVar, 'g');
      return array.map(d => d.match(regExp).join(deliminator));
    }
  };

  const arrayDedupe = data => {
    const newData = new Set(data);
    const newArray = Array.from(newData);
    return newArray;
  };
  /* 
    responses is britle, drop the [0] and it returns too much, send an invalid man and it will fail
    [0] << drop that and write a check to return valid results...  
  */

  responses = macs(data).map(
    d =>
      d.match(
        new RegExp(
          /([0-9a-fA-F][0-9a-fA-F][:.-]){5}([0-9a-fA-F][0-9a-fA-F]){1}|([0-9A-Fa-f]{4}[.:-]){2}([0-9A-Fa-f]){4}|([0-9A-Fa-f]{6}[.-][0-9A-Fa-f]{6}){1}|([0-9A-Fa-f]{12})/
        )
      )[0]
  );

  if (options.format) {
    //console.log(addDeliminator(stripDeliminator(responses), options.format[0], options.format[1]));
    if (options.case) {
      if (options.case == 'upper') {
        return arrayDedupe(
          addDeliminator(
            stripDeliminator(responses),
            options.format[0],
            options.format[1]
          ).map(d => d.toUpperCase())
        );
      } else if (options.case == 'lower') {
        return arrayDedupe(
          addDeliminator(
            stripDeliminator(responses),
            options.format[0],
            options.format[1]
          ).map(d => d.toLowerCase())
        );
      }
    } else {
      return arrayDedupe(
        addDeliminator(
          stripDeliminator(responses),
          options.format[0],
          options.format[1]
        )
      );
    }
  }
  if (options.pretty) {
    //console.log(addDeliminator(stripDeliminator(responses)));
    return addDeliminator(stripDeliminator(responses));
  }
  if (Object.keys(options).length === 0)
    console.log(
      'OPTIONS NOT FOUND: accepts options as {pretty:true} or {format:[":", 4]}'
    );
  return arrayDedupe(responses);
};
