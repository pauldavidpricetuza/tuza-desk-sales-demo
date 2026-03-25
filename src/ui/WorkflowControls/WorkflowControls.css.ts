import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { keyframes, style } from "@vanilla-extract/css";

export const workflowControlBar = style([
  sprinkles({
    display: "flex",
    padding: "spacing-2",
    gap: "spacing-2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "background10",
    borderRadius: "l",
    boxShadow: "md",
  }),
  {
    width: "fit-content",
  },
]);

export const workflowControlButton = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "spacing-1",
    backgroundColor: "background9",
    borderRadius: "s",
  }),
  {
    color: themeVars.foregroundColour.foreground6,
    width: "1.5rem",
    height: "1.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.1s ease-in-out",
    ":hover": {
      backgroundColor: themeVars.backgroundColour.background8,
    },
    ":focus-visible": {
      outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
      outlineOffset: "2px",
      backgroundColor: themeVars.backgroundColour.background8,
    },
  },
]);

const move = keyframes({
  "0%": { transform: "translateY(4px)" },
  "100%": { transform: "translateY(0)" },
});

export const workflowControlTooltip = style([
  sprinkles({
    borderRadius: "full",
    boxShadow: "sm",
    backgroundColor: "background10",
    display: "inline-flex",
    alignItems: "center",
    gap: "spacing-1.5",
    justifyContent: "center",
    paddingY: "spacing-1",
    paddingX: "spacing-3",
    borderWidth: "default",
    borderStyle: "solid",
  }),
  {
    color: themeVars.foregroundColour.foreground6,
    borderColor: themeVars.foregroundColour.foreground6,
    "@media": {
      "(prefers-reduced-motion: no-preference)": {
        animationName: move,
        animationDuration: "50ms",
        animationTimingFunction: "ease-out",
      },
    },
  },
]);

export const workflowControlShortcut = style([
  sprinkles({
    borderRadius: "s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: "default",
  }),
  text({ font: "code" }),
  {
    width: "0.75rem",
    height: "0.75rem",
    borderColor: themeVars.foregroundColour.foreground2,
  },
]);

export const workflowControlShortcutSmaller = style([
  workflowControlShortcut,
  {
    fontSize: "0.625rem",
  },
]);
