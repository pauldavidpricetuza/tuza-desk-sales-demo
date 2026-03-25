import { sprinkles } from "#theme/sprinkles.css.js";
import { keyframes, style } from "@vanilla-extract/css";

const move = keyframes({
  "0%": { transform: "translateY(20px)" },
  "100%": { transform: "translateY(0)" },
});

export const modal = style([
  sprinkles({
    padding: "spacing-5",
    borderRadius: "m",
    borderStyle: "solid",
    borderWidth: "default",
    borderColor: "colour1",
    boxShadow: "md",
    backgroundColor: "background0",
  }),
  {
    boxSizing: "border-box",
    "@media": {
      "(prefers-reduced-motion: no-preference)": {
        animationName: move,
        animationDuration: "200ms",
        animationTimingFunction: "ease-out",
      },
    },
  },
]);

export const modalOverlay = style([
  sprinkles({
    backgroundColor: "backgroundModalTint",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100dvh",
    opacity: 1,
    transition: "opacity 0.2s ease-in-out",
    selectors: {
      ["&[data-entering], &[data-exiting]"]: {
        opacity: 0,
      },
    },
  },
]);

export const dialog = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    gap: "spacing-4",
  }),
  {
    outline: "none",
  },
]);

export const modalActions = sprinkles({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});
