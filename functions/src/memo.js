export function memo(fn) {
  let value;

  return () => {
    if (value === undefined) value = fn();
    return value;
  };
}
