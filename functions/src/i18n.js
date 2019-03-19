export function formatDate(value) {
  const [_, year, month, day] = toDate(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return `${day}.${month}.${year}`;
}

function toDate(value) {
  if (!value) return null;
  if (typeof value !== 'string' && 'seconds' in value && 'nanoseconds' in value) return new Date(value.seconds * 1000).toISOString();
  if (value instanceof Date) return value.toISOString();
  return value;
}
