import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { keyframes, style } from "@vanilla-extract/css";

const shimmer = keyframes({
  "0%": {
    backgroundPosition: "200% 0",
  },
  "100%": {
    backgroundPosition: "-200% 0",
  },
});

export const skeleton = style([
  sprinkles({
    borderRadius: "s",
  }),
  {
    background: `linear-gradient(93deg, ${themeVars.backgroundColour.background3} 31.38%, ${themeVars.backgroundColour.background2} 49.86%, ${themeVars.backgroundColour.background3} 67.98%)`,
    backgroundSize: "200% 100%",
    animation: `${shimmer} 3s ease-in-out infinite`,
  },
]);

export const skeletonText = style([
  skeleton,
  {
    width: "fit-content",
    color: "transparent",
  },
]);
