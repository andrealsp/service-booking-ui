const DATE_FORMAT = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const TIME_FORMAT = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

const FULL_FORMAT = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(value) {
  if (!value) return "";
  return DATE_FORMAT.format(new Date(value));
}

export function formatTime(value) {
  if (!value) return "";
  return TIME_FORMAT.format(new Date(value));
}

export function formatFull(value) {
  if (!value) return "";
  return FULL_FORMAT.format(new Date(value));
}

export function formatRange(startAt, endAt) {
  if (!startAt) return "";
  const start = new Date(startAt);
  const end = endAt ? new Date(endAt) : null;
  const datePart = DATE_FORMAT.format(start);
  const startTime = TIME_FORMAT.format(start);
  if (!end) return `${datePart} · ${startTime}`;
  const endTime = TIME_FORMAT.format(end);
  return `${datePart} · ${startTime} – ${endTime}`;
}

export function toIsoForOffsetDateTime(localValue) {
  if (!localValue) return null;
  return new Date(localValue).toISOString();
}

export function toLocalInputValue(date) {
  const d = date instanceof Date ? date : new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const h = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${y}-${m}-${day}T${h}:${min}`;
}

export function addMinutes(date, minutes) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

export function diffInMinutes(start, end) {
  const a = new Date(start).getTime();
  const b = new Date(end).getTime();
  return Math.round((b - a) / 60000);
}
