import dayjs from "dayjs";

export function dayMonthDateFormat(timeInMs) {
  return dayjs(timeInMs).format('dddd, MMMM D')
}

export function monthDayDateFormat(timeInMs) {
  return dayjs(timeInMs).format('MMMM D')
}
