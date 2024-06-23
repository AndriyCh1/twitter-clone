import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const hoursAgoOrDate = (date: Date) => {
  const now = dayjs.utc();
  const utcDate = dayjs.utc(date);

  const difference = now.diff(utcDate, "minute");

  if (difference < 1) return "just now";
  if (difference < 60) return `${difference}m`;
  if (difference < 24 * 60) return `${difference}h`;
  return dayjs(date).format("D MMM");
};
