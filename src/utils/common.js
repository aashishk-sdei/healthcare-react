/* Fucntion to calulatre date from miliseconds */

import { MONTH_NAME } from "./constants";
import moment from "moment";

export const StringToDate = value => {
  const newdate = new Date(Number(value));
  return (
    newdate.getDate() +
    " " +
    MONTH_NAME[newdate.getMonth()] +
    ", " +
    newdate.getFullYear()
  );
};
export const dateTime = value => {
  const newdate = moment(AddOffset(+value)).format("DD MMM YYYY hh:mm a");
  return newdate;
};

export const DaysBetween = (myDate) => {
  const newdate = new Date(Number(myDate));
  return newdate.toString();
};

export const AddOffset = value => {
  let userOffset = new Date(value).getTimezoneOffset();
  let userOffsetMilli = (userOffset * 60) * 1000;
  let dateInMilli = moment(value).unix() * 1000;
  let dateInUtc = dateInMilli + userOffsetMilli;
  return dateInUtc;
};
