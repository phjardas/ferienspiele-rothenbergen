import config from "../api/config";

export default function ShirtSize({ shirtSize }) {
  const size = config.shirtSizes.find((s) => s.value === shirtSize);
  return size && size.label;
}
