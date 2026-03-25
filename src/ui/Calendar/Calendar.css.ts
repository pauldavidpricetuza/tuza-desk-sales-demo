import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { size, text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const month = sprinkles({
  padding: "spacing-3",
});

export const monthCaption = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "brandDefault",
  }),
  {
    width: "100%",
    height: "var(--rdp-nav-height)",
  },
  text({ font: "body2", weight: "medium" }),
]);

export const weekdays = style([
  sprinkles({
    display: "flex",
    marginTop: "spacing-3",
  }),
  {
    width: "100%",
  },
]);

export const weekday = style([
  sprinkles({
    display: "block",
    color: "brandTertiary",
  }),
  text({ font: "body2", weight: "medium" }),
  {
    width: "2.625rem",
    fontSize: 0,
    ":first-letter": {
      fontSize: size.body2,
    },
  },
]);

export const headRow = sprinkles({
  display: "flex",
});

export const week = style([
  sprinkles({
    marginTop: "spacing-3",
    display: "flex",
  }),
  {
    width: "100%",
  },
]);

export const day = style([
  sprinkles({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "brandSecondary",
    paddingX: "spacing-2",
  }),
  text({ font: "body2" }),
  {
    height: "1.75rem",
    width: "2.625rem",
  },
]);

export const outside = style([
  sprinkles({
    color: "brandTertiary",
  }),
]);

export const dayButton = style([
  sprinkles({
    borderRadius: "s",
    color: "brandDefault",
  }),
  {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    width: "1.75rem",
    height: "1.75rem",
    selectors: {
      [`${day}[data-focused] > &, &:hover`]: {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "2px",
      },
      [`${outside} > &`]: {
        color: themeVars.semanticColour.text.brandTertiary,
      },
    },
  },
]);

export const nav = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    margin: "spacing-3",
    justifyContent: "space-between",
  }),
  {
    position: "absolute",
    insetBlockStart: 0,
    insetInlineEnd: 0,
    left: 0,
    right: 0,
    height: "var(--rdp-nav-height)",
  },
]);

export const buttonNav = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    padding: "spacing-1.5",
    marginRight: "spacing-2",
    backgroundColor: "background0",
  }),
  {
    border: "none",
    ":hover": {
      backgroundColor: themeVars.backgroundColour.background6,
    },
  },
]);

export const chevron = style({
  width: "0.75rem",
  height: "0.75rem",
  fill: themeVars.semanticColour.text.brandSecondary,
});
