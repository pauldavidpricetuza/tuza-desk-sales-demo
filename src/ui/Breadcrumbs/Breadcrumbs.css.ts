import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";
import { textLink } from "#ui/TextLink/TextLink.css.js";

export const breadcrumbs = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    margin: "spacing-0",
    padding: "spacing-0",
  }),
  {
    listStyle: "none",
  },
]);

export const breadcrumbItem = style([
  sprinkles({
    display: "inline-flex",
    alignItems: "center",
  }),
]);

export const breadcrumbLink = style([
  textLink,
  {
    textDecoration: "none",
    fontWeight: themeVars.typography.fontWeight.regular,
    selectors: {
      "&[data-current]": {
        color: themeVars.semanticColour.text.brandDefault,
        opacity: 1,
        cursor: "default",
      },
    },
  },
]);

export const breadcrumbDivider = style([
  text({ font: "body2", weight: "regular" }),
  {
    width: "1rem",
    textAlign: "center",
    color: themeVars.foregroundColour.foreground5,
    userSelect: "none",
    selectors: {
      [`${breadcrumbItem}:first-child > &`]: {
        display: "none",
      },
      [`${breadcrumbItem}[data-current] > &`]: {
        color: themeVars.foregroundColour.foreground2,
      },
    },
  },
]);
