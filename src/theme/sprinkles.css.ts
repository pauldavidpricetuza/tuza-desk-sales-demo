import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { themeVars } from "./theme.css";

const colourProperties = defineProperties({
  properties: {
    color: themeVars.semanticColour.text,
    backgroundColor: themeVars.backgroundColour,
    background: themeVars.backgroundColour,
  },
});

const spaceProperties = defineProperties({
  properties: {
    padding: themeVars.spacing,
    paddingLeft: themeVars.spacing,
    paddingRight: themeVars.spacing,
    paddingTop: themeVars.spacing,
    paddingBottom: themeVars.spacing,
    margin: themeVars.spacing,
    marginLeft: themeVars.spacing,
    marginRight: themeVars.spacing,
    marginTop: themeVars.spacing,
    marginBottom: themeVars.spacing,
    gap: themeVars.spacing,
  },
  shorthands: {
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
  },
});

const layoutProperties = defineProperties({
  properties: {
    display: [
      "block",
      "inline-block",
      "flex",
      "inline-flex",
      "grid",
      "inline-grid",
      "none",
    ],
    flexDirection: ["row", "column", "row-reverse", "column-reverse"],
    justifyContent: [
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
    ],
    alignItems: ["flex-start", "flex-end", "center", "stretch", "baseline"],
    flexWrap: ["nowrap", "wrap", "wrap-reverse"],
    flexGrow: [0, 1],
    flexShrink: [0, 1],
  },
});

const otherProperties = defineProperties({
  properties: {
    boxShadow: themeVars.shadows,

    borderColor: themeVars.border.colour,
    borderRadius: themeVars.border.radius,
    borderTopLeftRadius: themeVars.border.radius,
    borderTopRightRadius: themeVars.border.radius,
    borderBottomLeftRadius: themeVars.border.radius,
    borderBottomRightRadius: themeVars.border.radius,
    borderWidth: themeVars.border.width,
    borderBottomWidth: themeVars.border.width,
    borderTopWidth: themeVars.border.width,
    borderLeftWidth: themeVars.border.width,
    borderRightWidth: themeVars.border.width,
    borderStyle: ["solid"],
    borderBottomStyle: ["solid"],
    borderTopStyle: ["solid"],
    borderLeftStyle: ["solid"],
    borderRightStyle: ["solid"],

    textAlign: ["left", "center", "right"],
  },
});

export type Sprinkles = Parameters<typeof sprinkles>[0];

export const sprinkles = createSprinkles(
  colourProperties,
  spaceProperties,
  otherProperties,
  layoutProperties,
);
