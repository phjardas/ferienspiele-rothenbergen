export default function FormattedDate({ value, ...options }) {
  if (!value) return null;
  if (typeof value !== 'string' && 'seconds' in value && 'nanoseconds' in value) value = new Date(value.seconds * 1000);
  if (typeof value === 'string') value = new Date(value);

  if (Object.keys(options).length === 0) options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  return value.toLocaleDateString('de-DE', options);
}
