import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const buttonVariants = styleVariants({
  primary: {
    backgroundColor: themeVars.semanticColour.button.primary.default,
    color: themeVars.semanticColour.button.primary.color,
    boxShadow: themeVars.shadows.sm,
    selectors: {
      ['&:hover:not([data-disabled="true"])']: {
        backgroundColor: themeVars.semanticColour.button.primary.hover,
      },
      ["&[data-disabled]"]: {
        boxShadow: "none",
      },
    },
  },
  secondary: {
    backgroundColor: themeVars.semanticColour.button.secondary.default,
    color: themeVars.semanticColour.button.secondary.color,
    boxShadow: `inset 0 0 0 1px ${themeVars.semanticColour.button.secondary.borderColor}, ${themeVars.shadows.sm}`,
    selectors: {
      ['&:hover:not([data-disabled="true"])']: {
        backgroundColor: themeVars.semanticColour.button.secondary.hover,
      },
      ["&[data-disabled]"]: {
        boxShadow: `inset 0 0 0 1px ${themeVars.semanticColour.button.secondary.borderColor}`,
      },
    },
  },
  warning: {
    backgroundColor: themeVars.semanticColour.button.warning.default,
    color: themeVars.semanticColour.button.warning.color,
    boxShadow: themeVars.shadows.sm,
    selectors: {
      ['&:hover:not([data-disabled="true"])']: {
        backgroundColor: themeVars.semanticColour.button.warning.hover,
      },
      ["&[data-disabled]"]: {
        boxShadow: "none",
      },
    },
  },
});

export const buttonRecipe = recipe({
  variants: {
    variant: buttonVariants,
  },
});

export const button = style([
  sprinkles({
    paddingY: "spacing-1.5",
    paddingX: "spacing-3",
    borderRadius: "s",
    display: "inline-flex",
    alignItems: "center",
    gap: "spacing-1",
    justifyContent: "center",
  }),
  text({ font: "body1", weight: "medium" }),
  {
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.1s ease-in-out",
    width: "fit-content",
    ":focus-visible": {
      outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
      outlineOffset: "2px",
    },
    selectors: {
      ["&[data-disabled]"]: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
      ["&[data-pending]"]: {
        opacity: 0.5,
        cursor: "wait",
      },
    },
  },
]);
