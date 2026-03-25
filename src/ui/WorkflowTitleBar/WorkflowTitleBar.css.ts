import { sprinkles } from "#theme/sprinkles.css.js";
import { style } from "@vanilla-extract/css";

export const titleBar = style([
  sprinkles({
    paddingX: "spacing-5",
    paddingY: "spacing-3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomStyle: "solid",
    borderBottomWidth: "default",
    borderColor: "colour1",
    backgroundColor: "background1",
  }),
]);

export const headerContainer = sprinkles({
  display: "flex",
  alignItems: "center",
  gap: "spacing-5",
});

export const headerDetail = sprinkles({
  display: "flex",
  alignItems: "center",
  gap: "spacing-1",
});

export const headerRight = sprinkles({
  display: "flex",
  alignItems: "center",
  gap: "spacing-4",
});

export const headerDateVersion = sprinkles({
  display: "flex",
  alignItems: "center",
  gap: "spacing-3",
});

export const headerButtonGroup = sprinkles({
  display: "flex",
  alignItems: "center",
  gap: "spacing-2",
});
