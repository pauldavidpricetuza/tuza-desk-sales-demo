import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { style } from "@vanilla-extract/css";

const nodeIconBase = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "s",
  }),
  {
    width: "1.5rem",
    height: "1.5rem",
  },
]);

export const nodeIcon = {
  default: style([
    nodeIconBase,
    sprinkles({
      backgroundColor: "background2",
      borderWidth: "default",
      borderStyle: "solid",
      borderColor: "colour1",
    }),
    {
      color: themeVars.foregroundColour.foreground2,
    },
  ]),
  active: style([
    nodeIconBase,
    sprinkles({
      borderWidth: "default",
      borderStyle: "solid",
    }),
    {
      backgroundColor: themeVars.colourPalette.flurotype05,
      borderColor: themeVars.colourPalette.flurotype20,
      color: themeVars.foregroundColour.foreground2,
    },
  ]),
};
