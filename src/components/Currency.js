export default function Currency({ amount }) {
  return amount.toLocaleString(navigator.languages, { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' });
}
