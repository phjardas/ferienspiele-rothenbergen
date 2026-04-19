import { useContext, useLayoutEffect, useRef } from "react";
import { hslToHex, ThemeColorContext } from "./color.js";

const startHue = Math.floor(Math.random() * 360);

export default function ThemeColorRotator() {
  const hue = useRef(startHue);
  const { setColor } = useContext(ThemeColorContext);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      const nextHue = (hue.current + 5) % 360;
      hue.current = nextHue;
      setColor(hslToHex(nextHue, 100, 50));
    }, 300);

    return () => clearInterval(interval);
  }, [setColor]);

  return null;
}
