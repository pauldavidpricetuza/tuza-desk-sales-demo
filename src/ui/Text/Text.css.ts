import { style } from "@vanilla-extract/css";

export const truncatedTextStyle = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
