import { border } from "./border";
import { colourPalette } from "./colourPalette";

export const backgroundColour = {
  background0: colourPalette.cyanotype00,
  background1: colourPalette.cyanotype02,
  background2: colourPalette.cyanotype05,
  background3: colourPalette.cyanotype07,
  background4: colourPalette.cyanotype15,
  background5: colourPalette.cyanotype20,
  background6: colourPalette.cyanotype30,
  background7: colourPalette.cyanotype120,
  background8: colourPalette.cyanotype160,
  background9: colourPalette.cyanotype170,
  background10: colourPalette.cyanotype180,
  backgroundModalTint: `color-mix(in srgb, ${colourPalette.cyanotype120} 50%, transparent)`,
} as const;

export const foregroundColour = {
  foreground1: colourPalette.cyanotype120,
  foreground2: colourPalette.cyanotype90,
  foreground3: colourPalette.cyanotype80,
  foreground4: colourPalette.cyanotype70,
  foreground5: colourPalette.cyanotype50,
  foreground6: colourPalette.cyanotype30,
  foregroundAccent: colourPalette.flurotype100,
} as const;

export const semanticColour = {
  text: {
    brandDefault: colourPalette.cyanotype120,
    brandSecondary: colourPalette.cyanotype90,
    brandTertiary: colourPalette.cyanotype80,
    error: colourPalette.red700,
    errorSecondary: colourPalette.red600,
    success: colourPalette.green500,
  },
  button: {
    primary: {
      default: colourPalette.cyanotype100,
      hover: colourPalette.cyanotype120,
      color: colourPalette.cyanotype02,
    },
    secondary: {
      default: colourPalette.cyanotype07,
      hover: colourPalette.cyanotype15,
      color: colourPalette.cyanotype120,
      borderColor: border.colour.colour1,
    },
    warning: {
      default: colourPalette.red600,
      hover: colourPalette.red700,
      color: colourPalette.cyanotype00,
    },
  },
} as const;

export const statusColour = {
  green: colourPalette.statusGreen,
  orange: colourPalette.statusOrange,
  red: colourPalette.statusRed,
} as const;
