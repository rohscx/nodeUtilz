module.exports = function(data, groupSize) {
  const items = data;
  const primaryArray = [];
  let subArray = [];
  let counter = 0;
  for (const item of items) {
    //console.log(subArray)
    counter++;
    // subtract 1 so the function return the group size as intended
    if (subArray.length < groupSize - 1) {
      subArray.push(item);
      if (counter === items.length) primaryArray.push(subArray);
    } else {
      subArray.push(item);
      primaryArray.push(subArray);
      subArray = [];
    }
  }
  return primaryArray;
};
