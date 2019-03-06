export default function Date({ value }) {
  return value.toLocaleDateString(navigator.languages);
}
