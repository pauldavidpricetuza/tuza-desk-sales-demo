import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const filterContainer = style([
  sprinkles({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "spacing-2",
  }),
]);

export const filterButton = style([
  sprinkles({
    backgroundColor: "background2",
    color: "brandSecondary",
    paddingX: "spacing-3",
    paddingY: "spacing-1.5",
    borderRadius: "s",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "spacing-2",
  }),
  text({ font: "body1" }),
  {
    cursor: "pointer",
    boxShadow: `inset 0 0 0 1px ${themeVars.semanticColour.button.secondary.borderColor}`,
    transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
    outline: "none",
    border: "none",
    selectors: {
      "&:hover, &[data-focus-visible]": {
        backgroundColor: themeVars.backgroundColour.background3,
        color: themeVars.semanticColour.text.brandDefault,
      },
      "&[data-focus-visible]": {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "2px",
      },
      "&[data-pressed]": {
        backgroundColor: themeVars.backgroundColour.background0,
        color: themeVars.semanticColour.text.brandDefault,
      },
    },
  },
]);

export const appliedFilterContainer = sprinkles({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "spacing-2",
});

export const appliedFilter = style([
  sprinkles({
    backgroundColor: "background4",
    color: "brandSecondary",
    paddingY: "spacing-1.5",
    paddingRight: "spacing-1.5",
    paddingLeft: "spacing-3",
    borderRadius: "s",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "spacing-2",
  }),
  text({ font: "body1" }),
]);

export const filterDeleteButton = style([
  sprinkles({
    backgroundColor: "background4",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "s",
    padding: "spacing-0",
    color: "brandSecondary",
  }),
  {
    border: "none",
    height: "1rem",
    width: "1rem",
    transition: "background-color 0.15s ease-in-out, color 0.15s ease-in-out",
    outline: "none",
    cursor: "pointer",
    selectors: {
      "&:hover, &[data-focus-visible]": {
        backgroundColor: themeVars.backgroundColour.background6,
        color: themeVars.semanticColour.text.brandDefault,
      },
      "&[data-focus-visible]": {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "2px",
      },
    },
  },
]);

export const popoverCalendar = sprinkles({
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
});
