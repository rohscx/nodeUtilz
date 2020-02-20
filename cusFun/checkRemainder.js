module.exports = function checkRemainder(a, b) {
  // a is the count of items to be received
  // b is the count of what was received
  // used to generate next page
  console.log(a, b);
  const count = +a;
  const last = +b;
  const eachPage = last + 1;
  const nextPage = (last + 1) * 2;
  const remaining = Math.ceil((count - (last + 1)) / (last + 1));

  // console.log((count - (last + 1)));
  // console.log((count - (last + 1))/(last + 1))
  // console.log(remaining)
  // console.log(nextPage)
  // console.log(remaining * eachPage)
  return {
    perPage: eachPage,
    nextPage: nextPage,
    pageTotal: remaining * eachPage,
  };
};
