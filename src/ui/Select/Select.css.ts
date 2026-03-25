import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

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

export const trigger = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-2",
    paddingY: "spacing-1.5",
    paddingX: "spacing-2",
    borderRadius: "s",
    backgroundColor: "background1",
  }),
  text({ font: "body1" }),
  {
    border: "none",
    outline: "none",
    width: "100%",
    cursor: "pointer",
    color: themeVars.semanticColour.text.brandDefault,
    boxShadow: `inset 0 0 0 1px ${themeVars.border.colour.colour1}`,
    transition:
      "background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out",
    textAlign: "left",
    selectors: {
      "&:hover:not(:disabled)": {
        boxShadow: `inset 0 0 0 1px ${themeVars.border.colour.colour2}`,
      },
      "&:focus-visible": {
        backgroundColor: themeVars.backgroundColour.background0,
        boxShadow: `inset 0 0 0 2px ${themeVars.border.colour.colour3}`,
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "2px",
      },
      [`${fieldWrapperBase}[data-invalid] &`]: {
        backgroundColor: themeVars.backgroundColour.background0,
        boxShadow: `inset 0 0 0 2px ${themeVars.semanticColour.text.errorSecondary}`,
      },
      "&:disabled": {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  },
]);

export const triggerValue = style({
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const triggerPlaceholder = style({
  flex: 1,
  color: themeVars.semanticColour.text.brandTertiary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const caretBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "transform 0.15s ease-in-out",
} as const;

export const caretIcon = style(caretBase);

export const caretIconOpen = style({
  ...caretBase,
  transform: "rotate(180deg)",
});

export const statusIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "1rem",
  height: "1rem",
});

export const listbox = style([
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
    maxHeight: "16rem",
    overflowY: "auto",
  },
]);

export const listboxItem = style([
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
      "&:hover:not([data-disabled]), &[data-focused]:not([data-disabled])": {
        backgroundColor: themeVars.backgroundColour.background2,
      },
      "&[data-disabled]": {
        opacity: 0.5,
        cursor: "not-allowed",
      },
      "&[data-focus-visible]": {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "2px",
      },
    },
  },
]);

export const listboxItemSelected = style({
  backgroundColor: themeVars.backgroundColour.background2,
});

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
