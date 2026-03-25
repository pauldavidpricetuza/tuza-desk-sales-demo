import { sprinkles } from "#theme/sprinkles.css.js";
import { style } from "@vanilla-extract/css";

export const titleTextWrapper = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-0.5",
  }),
]);
