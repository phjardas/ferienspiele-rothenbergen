export default function FormattedDate({ value, ...options } = { year: 'numeric', month: '2-digit', day: '2-digit' }) {
  if (typeof value === 'string') value = new Date(value);
  return value.toLocaleDateString('de-DE', options);
}
