export default function Currency({ amount }) {
  return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' });
}
