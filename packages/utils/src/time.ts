import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
export * as InternationalizedDate from "@internationalized/date";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export function tz(date?: string | Date | Dayjs, timezone?: string | null) {
  return dayjs(date).tz(timezone ?? undefined);
}

export function getCurrentTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getCurrentTimezoneOffset() {
  const offset = new Date().getTimezoneOffset(),
    o = Math.abs(offset);

  return "GMT " + (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}
