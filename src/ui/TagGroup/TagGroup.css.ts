import { sprinkles } from "#theme/sprinkles.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const tagGroup = sprinkles({
  display: "flex",
  flexWrap: "wrap",
  gap: "spacing-1",
});

export const tag = style([
  sprinkles({
    borderRadius: "s",
    backgroundColor: "background4",
    paddingX: "spacing-2",
    paddingY: "spacing-1",
    display: "flex",
    alignItems: "center",
    color: "brandSecondary",
  }),
  text({ font: "body2" }),
]);
