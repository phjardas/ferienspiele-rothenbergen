import { createContext, useCallback, useContext } from "react";

export const defaultColor = randomColor();

export const ThemeColorContext = createContext<{
  readonly color: string;
  readonly setColor: (color: string) => void;
}>({
  color: defaultColor,
  setColor: () => {
    throw new Error("Missing theme color context");
  },
});

export function useThemeColor(): string {
  return useContext(ThemeColorContext).color;
}

export function useSetThemeColor(): (color: string | undefined) => void {
  const { setColor } = useContext(ThemeColorContext);
  return useCallback((color) => setColor(color ?? defaultColor), [setColor]);
}

export function randomColor() {
  const r = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const g = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const b = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
}

export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
