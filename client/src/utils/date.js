import dayjs from "dayjs";

export function dayMonthDateFormat(timeInMs) {
  return dayjs(timeInMs).format('dddd, MMMM D')
}
