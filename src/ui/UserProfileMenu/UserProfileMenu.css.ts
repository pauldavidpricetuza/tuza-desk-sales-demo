import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { avatarType, text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const userProfileButton = style([
  sprinkles({
    paddingX: "spacing-1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "s",
    backgroundColor: "background4",
    color: "brandSecondary",
  }),
  {
    ...avatarType,
    height: "1.25rem",
    width: "1.25rem",
    boxSizing: "border-box",
    cursor: "pointer",
    border: "none",
    textTransform: "uppercase",
    transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
    outline: "none",
    selectors: {
      "&[data-pressed], &:hover, &[data-focus-visible]": {
        backgroundColor: themeVars.backgroundColour.background5,
        color: themeVars.semanticColour.text.brandDefault,
      },
      "&[data-focus-visible]": {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "2px",
      },
    },
  },
]);

export const userProfileInfo = style([
  sprinkles({
    padding: "spacing-2",
    display: "flex",
    flexDirection: "column",
  }),
  text({ font: "body1" }),
]);
