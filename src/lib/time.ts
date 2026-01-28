import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/hr";

// Initialize Day.js with the relativeTime plugin and Croatian locale
// This is done once so it is applied application-wide.
dayjs.extend(relativeTime);
dayjs.locale("hr");

// t parameter is kept (but unused) for backward compatibility with existing calls.
export function getTimeAgoText(
  date: string,
  _t?: (key: string, values?: Record<string, number>) => string,
) {
  return dayjs(date).fromNow();
}
