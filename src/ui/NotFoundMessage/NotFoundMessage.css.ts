import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { style } from "@vanilla-extract/css";

export const container = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "spacing-1",
    padding: "spacing-8",
  }),
  {
    width: "100%",
    height: "100%",
    minHeight: "400px",
    textAlign: "center",
  },
]);

export const iconStyle = style({
  color: themeVars.foregroundColour.foregroundAccent,
});

export const textContent = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "spacing-0",
  }),
]);

export const subtitleWrapper = style({
  maxWidth: "418px",
});

export const buttonWrapper = style([
  sprinkles({
    paddingTop: "spacing-2",
  }),
]);
