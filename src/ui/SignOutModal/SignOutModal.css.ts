import { sprinkles } from "#theme/sprinkles.css.js";
import { style } from "@vanilla-extract/css";

export const signOutModalContent = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    gap: "spacing-1",
  }),
]);
