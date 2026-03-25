import { sprinkles } from "#theme/sprinkles.css.js";
import { style } from "@vanilla-extract/css";

export const topNavBar = style([
  sprinkles({
    paddingX: "spacing-5",
    backgroundColor: "background3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomStyle: "solid",
    borderBottomWidth: "default",
    borderColor: "colour1",
    flexShrink: 0,
  }),
  {
    height: "2.5rem",
  },
]);

export const cogButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  border: 'none',
  background: 'transparent',
  borderRadius: 6,
  cursor: 'pointer',
  color: '#667085',
  transition: 'background 0.15s, color 0.15s',
  ':hover': {
    background: 'rgba(6,35,81,0.06)',
    color: '#062351',
  },
});
