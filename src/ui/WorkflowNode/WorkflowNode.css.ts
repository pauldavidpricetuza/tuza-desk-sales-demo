import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { keyframes, style } from "@vanilla-extract/css";

const WORKFLOW_NODE_WIDTH = "15.75rem";
const GRADIENT_OFFSET = "-11px";

const starMovementBottom = keyframes({
  "0%": {
    transform: "translateX(0%)",
    opacity: 1,
  },
  "100%": {
    transform: "translateX(-100%)",
    opacity: 0,
  },
});

const starMovementTop = keyframes({
  "0%": {
    transform: "translateX(0%)",
    opacity: 1,
  },
  "100%": {
    transform: "translateX(100%)",
    opacity: 0,
  },
});

export const borderGradientBottom = style({
  position: "absolute",
  width: "300%",
  height: "50%",
  opacity: 0.7,
  bottom: GRADIENT_OFFSET,
  right: "-250%",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${themeVars.colourPalette.flurotype100}, transparent 10%)`,
  animation: `${starMovementBottom} 6s linear infinite alternate`,
  zIndex: 0,
});

export const borderGradientTop = style({
  position: "absolute",
  width: "300%",
  height: "50%",
  opacity: 0.7,
  top: GRADIENT_OFFSET,
  left: "-250%",
  borderRadius: "50%",
  background: `radial-gradient(circle, ${themeVars.colourPalette.flurotype100}, transparent 10%)`,
  animation: `${starMovementTop} 6s linear infinite alternate`,
  zIndex: 0,
});

export const innerContent = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "background1",
    borderRadius: "m",
  }),
  {
    position: "relative",
    zIndex: 1,
  },
]);

const wrapperBase = style([
  sprinkles({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "spacing-0",
  }),
  {
    cursor: "pointer",
    ":focus-visible": {
      outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
      outlineOffset: "2px",
    },
  },
]);

export const workflowNodeWrapper = {
  default: style([
    wrapperBase,
    {
      transformOrigin: "center bottom",
      transition: "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      ":hover": {
        transform: "scale(1.025) rotate(1deg)",
      },
    },
  ]),
  selected: style([
    wrapperBase,
    {
      transform: "scale(1.05)",
    },
  ]),
};

export const statusLabelWrapper = style({
  marginBottom: "-0.375rem",
  zIndex: 1,
  position: "relative",
});

const containerBase = style([
  sprinkles({
    borderRadius: "m",
    boxShadow: "sm",
  }),
  {
    width: WORKFLOW_NODE_WIDTH,
    position: "relative",
    zIndex: 2,
  },
]);

export const workflowNodeContainer = {
  default: style([
    containerBase,
    sprinkles({
      display: "flex",
      flexDirection: "column",
      backgroundColor: "background1",
      borderWidth: "default",
      borderStyle: "solid",
      borderColor: "colour1",
    }),
  ]),
  selected: style([
    containerBase,
    sprinkles({
      display: "inline-block",
    }),
    {
      overflow: "hidden",
      padding: "0.0625rem",
      backgroundColor: themeVars.colourPalette.cyanotype20,
    },
  ]),
};

export const horizontalRule = style([
  sprinkles({
    backgroundColor: "background5",
  }),
  {
    height: "0.0625rem",
    width: "100%",
  },
]);
