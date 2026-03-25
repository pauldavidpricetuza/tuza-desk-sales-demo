import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const menu = style([
  sprinkles({
    padding: "spacing-1",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "spacing-1",
    backgroundColor: "background0",
    borderRadius: "m",
    borderStyle: "solid",
    borderWidth: "default",
    borderColor: "colour1",
    boxShadow: "md",
  }),
  {
    minWidth: "12rem",
    outline: "none",
  },
]);

export const popover = style({
  transformOrigin: "var(--trigger-anchor-point)",
  transition: "transform 0.1s ease-in-out, opacity 0.1s ease-in-out",
  selectors: {
    "&[data-entering], &[data-exiting]": {
      transform: "scale(0.95)",
      opacity: 0,
    },
  },
});

export const menuItem = style([
  sprinkles({
    paddingY: "spacing-1",
    paddingLeft: "spacing-2",
    paddingRight: "spacing-1",
    color: "brandTertiary",
    borderRadius: "s",
    backgroundColor: "background0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  text({ font: "body1" }),
  {
    cursor: "pointer",
    transition: "background-color 0.1s ease-in-out",
    selectors: {
      "&[data-focused], &:hover": {
        outline: "none",
      },
      "&[data-disabled]": {
        opacity: 0.5,
        cursor: "not-allowed",
      },
      "&[data-focus-visible]:not([data-disabled]), &:hover:not([data-disabled]), &[data-open]:not([data-disabled])":
        {
          backgroundColor: themeVars.backgroundColour.background2,
        },
      "&[data-focus-visible]": {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "2px",
      },
    },
  },
]);

export const menuNoResults = style([
  sprinkles({
    padding: "spacing-2",
    color: "brandSecondary",
    display: "flex",
    justifyContent: "center",
  }),
  text({ font: "body1" }),
]);

export const caretContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "1rem",
  width: "1rem",
  color: themeVars.foregroundColour.foreground6,
  selectors: {
    [`${menuItem}[data-focused] &, ${menuItem}:hover &, ${menuItem}[data-open] &`]:
      {
        color: themeVars.foregroundColour.foreground5,
      },
  },
});
