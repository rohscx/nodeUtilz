module.exports = function(data) {
  const ipChecker = (data, index) => {
    if (
      data.search(
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      ) === 0
    ) {
      return true;
    } else {
      console.log(`BAD ADDRESS: ${data} AT INDEX: ${index}`);
      return false;
    }
  };

  return data.filter(f => ipChecker(f));
};
