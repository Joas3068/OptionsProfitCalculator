export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function GetChartDate(increment) {
  //var year = date.getFullYear();
  var today = new Date();

  today.setDate(today.getDate() + increment);
  var month = (1 + today.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = today.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "-" + day;
}

export const Blank = {};

export default Blank;
