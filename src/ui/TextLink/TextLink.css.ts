import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const textLink = style([
  sprinkles({
    color: "brandSecondary",
  }),
  text({ font: "body2", weight: "medium" }),
  {
    cursor: "pointer",
    transition: "color 0.1s ease-in-out",
    ":hover": {
      color: themeVars.semanticColour.text.brandDefault,
    },
    ":focus-visible": {
      color: themeVars.semanticColour.text.brandDefault,
      borderRadius: themeVars.border.radius.xs,
      outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
      outlineOffset: "2px",
    },
    selectors: {
      ["&[data-disabled]"]: {
        opacity: 0.5,
        cursor: "not-allowed",
        color: themeVars.semanticColour.text.brandTertiary,
        textDecoration: "none",
      },
    },
  },
]);
