module.exports = function(data, headerFilter) {
  return new Promise((resolve, reject) => {
    if (!data || !headerFilter) reject('missing data or header');
    const csvData = data;
    const csvDataObject = csvData.split('\n').map(d => d.split(','));
    const filterObject =
      typeof headerFilter === 'object'
        ? headerFilter
        : headerFilter.split(new RegExp(/[\t,]/)).filter(f => f.length > 0);

    getIndex = (data, values) => {
      const [lables] = data;
      //console.log(values)
      return lables.reduce((n, o, i) => {
        if (values.includes(o.replace(new RegExp(/"/g), ''))) n.push(i);
        return n;
      }, []);
    };
    const csvFilter = getIndex(csvDataObject, filterObject);
    const filteredData = csvDataObject.map(d =>
      d.filter((f, i) => {
        return csvFilter.includes(i);
      })
    );
    const result = filteredData.map((d, i) => d.join(',')).join('\r');
    //console.log(new RegExp(result))
    resolve(result);
  });
};
