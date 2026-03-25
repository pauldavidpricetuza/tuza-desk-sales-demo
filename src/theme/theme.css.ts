import { createTheme } from "@vanilla-extract/css";
import { border } from "./border";
import {
  backgroundColour,
  foregroundColour,
  semanticColour,
  statusColour,
} from "./colour";
import { spacing } from "./spacing";
import { colourPalette } from "./colourPalette";
import { shadows } from "./shadows";
import { weight, fonts } from "./typography.css";

export const [themeClass, themeVars] = createTheme({
  border,
  backgroundColour,
  foregroundColour,
  statusColour,
  shadows,
  semanticColour,
  spacing,
  typography: { fonts, fontWeight: weight },
  colourPalette,
});
