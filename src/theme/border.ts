import { colourPalette } from "./colourPalette";

export const border = {
  width: {
    default: "1px",
    none: "0px",
  },
  radius: {
    none: "0px",
    xs: "1px",
    s: "2px",
    m: "4px",
    l: "8px",
    full: "9999px",
  },
  colour: {
    default: colourPalette.cyanotype100,
    colour1: colourPalette.cyanotype20,
    colour2: colourPalette.cyanotype30,
    colour3: colourPalette.cyanotype90,
    accent1: colourPalette.flurotype100,
    accent2: colourPalette.flurotype20,
    transparent: "transparent",
  },
} as const;
