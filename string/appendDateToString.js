module.exports = function appendDateToString (string) {
  const date = new Date;
  const month = date.getMonth() + 1;
  month.toString();
  const dayMonth = date.getDate().toString();
  const year = date.getFullYear().toString();
  const myDate = month + dayMonth +year[2] + year[3];
  return string + myDate;
}
