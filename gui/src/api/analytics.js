import ga from 'react-ga';

const property = process.env.REACT_APP_GA_PROPERTY;

ga.initialize(property || 'TEST', {
  debug: !property,
  testMode: !property,
  gaOptions: {
    anonymizeIp: true,
  },
});

export function useAnalytics() {
  return ga;
}
