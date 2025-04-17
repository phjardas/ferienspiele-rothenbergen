export function memoize(fn) {
  let value;
  return () => {
    if (value === undefined) value = fn();
    return value;
  };
}
