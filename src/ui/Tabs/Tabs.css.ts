import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const tabsContainer = sprinkles({
  display: "flex",
  flexDirection: "column",
});

export const tabsList = sprinkles({
  display: "flex",
  borderBottomWidth: "default",
  borderBottomStyle: "solid",
  borderColor: "colour1",
  paddingX: "spacing-5",
  gap: "spacing-4",
});

export const tab = style([
  sprinkles({
    paddingX: "spacing-1",
    color: "brandTertiary",
    borderBottomWidth: "default",
    borderBottomStyle: "solid",
    borderColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  text({ font: "body1" }),
  {
    cursor: "pointer",
    textAlign: "center",
    height: "2.5rem",
    marginBottom: "-1px",
    minWidth: "4.5rem",
    position: "relative",
    transition: "color 0.4s ease-in, border-bottom-color 0.4s ease-in",
    outline: "none",
    ":hover": {
      color: themeVars.semanticColour.text.brandDefault,
      borderBottomColor: themeVars.border.colour.default,
    },
    selectors: {
      ["&[data-focus-visible]"]: {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "-2px",
      },
      ["&[data-selected]"]: {
        fontWeight: themeVars.typography.fontWeight.medium,
        color: themeVars.semanticColour.text.brandDefault,
      },
    },
  },
]);

export const tabContent = style({
  "::after": {
    content: "attr(data-text)",
    visibility: "hidden",
    height: "0",
    overflow: "hidden",
    fontWeight: themeVars.typography.fontWeight.medium,
    display: "block",
  },
});

export const tabSelectionIndicator = style({
  borderBottom: `1px solid ${themeVars.foregroundColour.foregroundAccent}`,
  position: "absolute",
  bottom: "-1px",
  left: "0",
  width: "100%",
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      transition: "translate 0.2s ease-in, width 0.2s ease-in",
    },
  },
});
