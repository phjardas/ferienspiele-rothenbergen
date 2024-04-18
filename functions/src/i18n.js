export function formatDate(value) {
  const match = toDate(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return "??.??.????";
  const [_, year, month, day] = match;
  return `${day}.${month}.${year}`;
}

function toDate(value) {
  console.log("toDate value: %s, type: %s", value, typeof value);
  if (!value) return null;
  if (typeof value !== "string" && "seconds" in value && "nanoseconds" in value)
    return new Date(value.seconds * 1000).toISOString();
  if (value instanceof Date) return value.toISOString();
  return value;
}
