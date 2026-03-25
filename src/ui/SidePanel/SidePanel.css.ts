import { sprinkles } from "#theme/sprinkles.css.js";
import { keyframes, style } from "@vanilla-extract/css";

const moveIn = keyframes({
  "0%": { transform: "translateX(42.5rem)" },
  "100%": { transform: "translateX(0)" },
});

const moveOut = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(42.5rem)" },
});

export const sidePanelContent = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    paddingX: "spacing-5",
    paddingY: "spacing-10",
    gap: "spacing-8",
  }),
]);

export const dialog = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    boxShadow: "md",
    borderStyle: "solid",
    borderWidth: "default",
    borderColor: "colour1",
    backgroundColor: "background0",
  }),
  {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "42.5rem",
    outline: "none",
    "@media": {
      "(prefers-reduced-motion: no-preference)": {
        animationName: moveIn,
        animationDuration: "300ms",
        animationTimingFunction: "ease-out",
      },
    },
  },
]);

export const dialogExiting = style({
  "@media": {
    "(prefers-reduced-motion: no-preference)": {
      animationName: moveOut,
      animationDuration: "300ms",
      animationTimingFunction: "ease-in",
    },
  },
});
