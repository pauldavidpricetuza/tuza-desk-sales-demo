import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

// Base class used for selector targeting
const fieldWrapperBase = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    gap: "spacing-1.5",
  }),
]);

export const fieldWrapper = style([fieldWrapperBase, { width: "20rem" }]);

export const fieldWrapperFullWidth = style([
  fieldWrapperBase,
  { width: "100%" },
]);

export const label = style([
  text({ font: "label1" }),
  sprinkles({ color: "brandDefault" }),
]);

export const inputContainer = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-2",
    paddingY: "spacing-1.5",
    paddingX: "spacing-2",
    borderRadius: "s",
    backgroundColor: "background1",
  }),
  {
    boxShadow: `inset 0 0 0 1px ${themeVars.border.colour.colour1}`,
    transition:
      "background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out",
    selectors: {
      "&:hover": {
        boxShadow: `inset 0 0 0 1px ${themeVars.border.colour.colour2}`,
      },
      "&:focus-within": {
        backgroundColor: themeVars.backgroundColour.background0,
        boxShadow: `inset 0 0 0 2px ${themeVars.border.colour.colour3}`,
      },
      [`${fieldWrapperBase}[data-invalid] &`]: {
        backgroundColor: themeVars.backgroundColour.background0,
        boxShadow: `inset 0 0 0 2px ${themeVars.semanticColour.text.errorSecondary}`,
      },
      [`${fieldWrapperBase}[data-disabled] &`]: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  },
]);

export const input = style([
  text({ font: "body1" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    background: "transparent",
    border: "none",
    outline: "none",
    width: "100%",
    padding: 0,
    "::placeholder": {
      color: themeVars.semanticColour.text.brandTertiary,
    },
    selectors: {
      [`${fieldWrapperBase}[data-invalid] &`]: {
        color: themeVars.semanticColour.text.error,
      },
      [`${fieldWrapperBase}[data-disabled] &`]: {
        cursor: "not-allowed",
      },
    },
  },
]);

export const hintText = style([
  text({ font: "body2" }),
  {
    color: themeVars.semanticColour.text.brandSecondary,
    selectors: {
      [`${fieldWrapperBase}[data-invalid] &`]: {
        color: themeVars.semanticColour.text.errorSecondary,
      },
    },
  },
]);

export const statusIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "1rem",
  height: "1rem",
});
