import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const search = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    width: "fit-content",
    position: "relative",
  },
]);

export const searchInput = style([
  text({ font: "body1" }),
  sprinkles({
    paddingY: "spacing-1.5",
    paddingX: "spacing-2",
    borderRadius: "s",
    borderStyle: "solid",
    borderWidth: "default",
    borderColor: "colour1",
    backgroundColor: "background2",
  }),
  {
    cursor: "pointer",
    height: "2rem",
    width: "2rem",
    outline: "none",
    transition:
      "width 0.15s ease-out, background-color 0.15s ease-out, border-color 0.15s ease-out",
    ":hover": {
      backgroundColor: themeVars.backgroundColour.background3,
    },
    selectors: {
      "&[data-focused]": {
        background: themeVars.backgroundColour.background0,
        borderColor: themeVars.border.colour.default,
        width: "12.5rem",
        paddingLeft: themeVars.spacing["spacing-3"],
        paddingRight: themeVars.spacing["spacing-6"],
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "-2px",
        cursor: "inherit",
      },
      [`${search}:not([data-empty]) > &`]: {
        width: "12.5rem",
        paddingLeft: themeVars.spacing["spacing-3"],
        paddingRight: themeVars.spacing["spacing-6"],
      },
      ["&::-webkit-search-cancel-button, &::-webkit-search-decoration"]: {
        WebkitAppearance: "none",
      },
    },
  },
]);

export const searchIcon = style([
  sprinkles({
    marginLeft: "spacing-2",
    color: "brandSecondary",
  }),
  {
    zIndex: 2,
    pointerEvents: "none",
    position: "absolute",
    selectors: {
      [`${search}:hover > &`]: {
        color: themeVars.foregroundColour.foreground1,
      },
      [`${searchInput}[data-focused] + &, ${search}:not([data-empty]) > &`]: {
        display: "none",
      },
    },
  },
]);

export const closeButton = style([
  sprinkles({
    color: "brandTertiary",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "spacing-0",
    borderRadius: "s",
  }),
  {
    width: "1rem",
    height: "1rem",
    border: "none",
    outline: "none",
    background: "transparent",
    cursor: "pointer",
    position: "absolute",
    right: themeVars.spacing["spacing-2"],
    zIndex: 2,
    selectors: {
      [`${search}[data-empty] > &`]: {
        display: "none",
      },
      "&:hover, &:focus-visible": {
        color: themeVars.foregroundColour.foreground1,
        backgroundColor: themeVars.backgroundColour.background3,
      },
      "&:focus-visible": {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "2px",
      },
    },
  },
]);
