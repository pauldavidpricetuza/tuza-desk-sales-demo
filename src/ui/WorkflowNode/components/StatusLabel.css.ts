import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { fonts } from "#theme/typography.css.js";
import { style, styleVariants } from "@vanilla-extract/css";

const statusLabelBase = style([
  sprinkles({
    display: "inline-flex",
    alignItems: "center",
    gap: "spacing-1",
    paddingBottom: "spacing-2",
    paddingLeft: "spacing-1.5",
    paddingRight: "spacing-1.5",
  }),
  {
    paddingTop: "0.125rem",
    borderTopLeftRadius: themeVars.border.radius.m,
    borderTopRightRadius: themeVars.border.radius.m,
  },
]);

const statusDotBase = style([
  sprinkles({
    borderRadius: "full",
  }),
  {
    width: "0.375rem",
    height: "0.375rem",
  },
]);

const statusColors = {
  active: {
    bg: themeVars.colourPalette.green100,
    fg: themeVars.colourPalette.green700,
  },
  neutral: {
    bg: themeVars.colourPalette.cyanotype10,
    fg: themeVars.colourPalette.cyanotype160,
  },
  negative: {
    bg: themeVars.colourPalette.red100,
    fg: themeVars.colourPalette.red700,
  },
  review: {
    bg: themeVars.colourPalette.amber100,
    fg: themeVars.colourPalette.amber700,
  },
};

export const statusLabel = styleVariants(statusColors, ({ bg }) => [
  statusLabelBase,
  { backgroundColor: bg },
]);

export const statusDot = styleVariants(statusColors, ({ fg }) => [
  statusDotBase,
  { backgroundColor: fg },
]);

export const statusText = styleVariants(statusColors, ({ fg }) => [
  fonts.body2,
  { color: fg },
]);
