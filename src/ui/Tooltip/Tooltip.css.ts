import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { keyframes, style } from "@vanilla-extract/css";

const move = keyframes({
  "0%": { transform: "translateX(-4px)" },
  "100%": { transform: "translateX(0)" },
});

export const tooltip = style([
  sprinkles({
    paddingX: "spacing-2",
    paddingY: "spacing-1",
    borderRadius: "m",
    backgroundColor: "background0",
    borderStyle: "solid",
    borderWidth: "default",
    borderColor: "colour1",
    boxShadow: "sm",
  }),
  {
    maxWidth: "21.25rem",
    "@media": {
      "(prefers-reduced-motion: no-preference)": {
        animationName: move,
        animationDuration: "50ms",
        animationTimingFunction: "ease-out",
      },
    },
  },
]);

export const tooltipButton = style({
  ":focus-visible": {
    outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
    outlineOffset: "2px",
  },
});
