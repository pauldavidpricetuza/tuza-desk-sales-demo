import { sprinkles } from "#theme/sprinkles.css.js";
import { style } from "@vanilla-extract/css";

export const separator = style([
  sprinkles({
    borderStyle: "solid",
    borderBottomWidth: "default",
    borderLeftWidth: "none",
    borderRightWidth: "none",
    borderTopWidth: "none",
    borderColor: "colour1",
  }),
]);
