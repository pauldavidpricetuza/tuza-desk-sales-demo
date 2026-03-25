import { style } from "@vanilla-extract/css";

export const textTypeContainer = style({
  display: "inline-block",
  whiteSpace: "pre-wrap",
});

export const textTypeCursor = style({
  marginLeft: "0.1rem",
  display: "inline-block",
  opacity: 1,
});

export const textTypeCursorHidden = style({
  display: "none",
});
