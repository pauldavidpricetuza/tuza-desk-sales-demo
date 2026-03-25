import { sprinkles } from "#theme/sprinkles.css.js";
import { style } from "@vanilla-extract/css";

const connectorDotBase = style([
  sprinkles({
    borderRadius: "full",
    backgroundColor: "background0",
    borderWidth: "default",
    borderStyle: "solid",
  }),
  {
    width: "0.5rem",
    height: "0.5rem",
    boxSizing: "border-box",
  },
]);

export const connectorDot = {
  default: style([
    connectorDotBase,
    sprinkles({
      borderColor: "colour1",
    }),
  ]),
  active: style([
    connectorDotBase,
    sprinkles({
      borderColor: "accent1",
    }),
  ]),
  focus: style([
    connectorDotBase,
    sprinkles({
      borderColor: "default",
    }),
  ]),
};
