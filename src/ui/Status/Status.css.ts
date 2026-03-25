import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { style } from "@vanilla-extract/css";

export const statusContainer = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-1",
  }),
]);

const statusDot = style([
  sprinkles({
    borderRadius: "full",
    flexShrink: 0,
  }),
  {
    width: "0.375rem",
    height: "0.375rem",
  },
]);

export const statusActive = style([
  statusDot,
  {
    backgroundColor: themeVars.statusColour.green,
  },
]);

export const statusInactive = style([
  statusDot,
  {
    backgroundColor: themeVars.statusColour.orange,
  },
]);

export const statusDraft = style([
  statusDot,
  {
    backgroundColor: themeVars.backgroundColour.background0,
    boxShadow: `0 0 0 1px ${themeVars.foregroundColour.foreground3} inset`,
  },
]);
