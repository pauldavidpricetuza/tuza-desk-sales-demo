import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { style } from "@vanilla-extract/css";

export const titleBar = style([
  sprinkles({
    paddingX: "spacing-5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomStyle: "solid",
    borderBottomWidth: "default",
    borderColor: "colour1",
  }),
  {
    height: "4.5rem",
  },
]);

export const titleBarSmall = style([
  titleBar,
  {
    height: "3.75rem",
  },
]);

export const titleBarText = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-1.5",
    paddingX: "spacing-3",
  }),
  {
    position: "relative",
    overflow: "auto",
  },
]);

export const caretContainer = style([
  sprinkles({
    display: "flex",
  }),
  {
    color: themeVars.foregroundColour.foregroundAccent,
    position: "absolute",
    left: "-0.375rem",
  },
]);

export const closeButton = style([
  sprinkles({
    color: "brandSecondary",
    padding: "spacing-0",
    borderRadius: "s",
  }),
  {
    cursor: "pointer",
    background: "transparent",
    width: "1rem",
    height: "1rem",
    border: "none",
    outline: "none",
    ":hover": {
      color: themeVars.semanticColour.text.brandDefault,
    },
    ":focus-visible": {
      color: themeVars.semanticColour.text.brandDefault,
      outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
      outlineOffset: "2px",
    },
  },
]);

export const rightContent = sprinkles({
  display: "flex",
  alignItems: "center",
  gap: "spacing-2",
});
