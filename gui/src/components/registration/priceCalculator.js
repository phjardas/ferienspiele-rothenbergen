import createDecorator from 'final-form-calculate';
import config from '../../api/config';

function calculatePrice({ child: { nextChild }, kuchen: { date: kuchenDate } }) {
  const elements = [];
  elements.push({ label: 'Teilnahmebeitrag', value: config.prices.base });

  if (nextChild) {
    elements.push({ label: 'Ermäßigung für Geschwisterkind', value: config.prices.sibling });
  }

  if (kuchenDate === 'none') {
    elements.push({ label: 'Entfall Kuchenspende', value: config.prices.noCake });
  }

  return {
    elements,
    total: elements.reduce((a, b) => a + b.value, 0),
  };
}

export function withPrice(values) {
  return { ...values, price: calculatePrice(values) };
}

export const priceCalculator = createDecorator({
  field: ['child.nextChild', 'kuchen.date'],
  updates: {
    price: (_, values) => calculatePrice(values),
  },
});
