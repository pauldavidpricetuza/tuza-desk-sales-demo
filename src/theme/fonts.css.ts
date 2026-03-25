import { fontFace } from "@vanilla-extract/css";
import SpaceMonoRegular from "./fonts/SpaceMono-Regular.ttf";
import DenimRegular from "./fonts/Denim-Regular.ttf";
import DenimMedium from "./fonts/Denim-Medium.ttf";
import MessinaRegular from "./fonts/MessinaSerifWeb-Regular.woff2";

export const spaceMono = fontFace({
  fontWeight: 400,
  src: `local("Space Mono Regular"), url(${SpaceMonoRegular}) format("truetype")`,
});

export const denim = fontFace([
  {
    fontWeight: 400,
    src: `local("Denim-Regular"), url(${DenimRegular}) format("truetype")`,
  },
  {
    fontWeight: 500,
    src: `local("Denim-Medium"), url(${DenimMedium}) format("truetype")`,
  },
]);

export const messina = fontFace({
  fontWeight: 400,
  src: `local("Messina"), url(${MessinaRegular}) format("woff2")`,
});
