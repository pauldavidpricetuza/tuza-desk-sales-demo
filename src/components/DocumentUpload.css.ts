import { style } from "@vanilla-extract/css";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing["spacing-6"],
  width: "100%",
});

/** Label + drop zone — Figma 6px between label and field */
export const uploadBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing["spacing-1.5"],
  width: "100%",
});

/** Figma Label-1: Space Mono 10px uppercase (7549-53621) */
export const label = style({
  fontFamily: "'Space Mono', monospace",
  fontSize: 10,
  lineHeight: "14px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: themeVars.semanticColour.text.brandDefault,
  margin: 0,
});

const dropZoneBase = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  boxSizing: "border-box" as const,
  borderRadius: themeVars.border.radius.xs,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: themeVars.border.colour.colour1,
  backgroundColor: themeVars.backgroundColour.background1,
  padding: `${themeVars.spacing["spacing-5"]} ${themeVars.spacing["spacing-2"]}`,
  cursor: "pointer",
  transition: "border-color 0.15s ease, background-color 0.15s ease, opacity 0.15s ease",
} as const;

export const dropZone = style([
  dropZoneBase,
  {
    selectors: {
      "&:hover:not([data-disabled='true'])": {
        borderColor: themeVars.border.colour.colour2,
      },
    },
  },
]);

export const dropZoneDragging = style({
  borderColor: themeVars.border.colour.colour2,
  backgroundColor: themeVars.backgroundColour.background2,
});

export const dropZoneDisabled = style({
  opacity: 0.5,
  cursor: "not-allowed",
});

export const dropZoneDimmed = style({
  opacity: 0.5,
});

export const innerCol = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  width: "100%",
  minWidth: 0,
});

export const iconCircle = style({
  width: 56,
  height: 56,
  borderRadius: "50%",
  backgroundColor: themeVars.backgroundColour.background3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const textCol = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: themeVars.spacing["spacing-2"],
  textAlign: "center",
});

export const dropText = style([
  text({ font: "body1" }),
  {
    margin: 0,
    color: themeVars.semanticColour.text.brandDefault,
    textAlign: "center",
  },
]);

export const orText = style([
  text({ font: "body2" }),
  {
    margin: 0,
    color: themeVars.semanticColour.text.brandSecondary,
  },
]);

/** Stops browse `Button` presses from bubbling to the drop-zone `role="button"` wrapper. */
export const browseBtnWrap = style({
  display: "inline-flex",
});

export const helpText = style([
  text({ font: "body2" }),
  {
    margin: 0,
    color: themeVars.semanticColour.text.brandSecondary,
    textAlign: "center",
  },
]);

export const fileList = style({
  display: "flex",
  flexDirection: "column",
  /** Figma: 24px between drop zone and file list */
  gap: themeVars.spacing["spacing-6"],
  width: "100%",
});

/** Uploading card */
export const fileCard = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing["spacing-2"],
  padding: themeVars.spacing["spacing-4"],
  borderRadius: themeVars.border.radius.xs,
  border: `1px solid ${themeVars.border.colour.colour1}`,
  backgroundColor: themeVars.backgroundColour.background0,
  boxSizing: "border-box",
  width: "100%",
});

export const fileCardError = style({
  borderWidth: 2,
  borderColor: themeVars.colourPalette.red700,
  backgroundColor: themeVars.backgroundColour.background0,
});

export const fileRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing["spacing-3"],
  width: "100%",
  minWidth: 0,
});

export const fileName = style([
  text({ font: "body1" }),
  {
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1,
    minWidth: 0,
    color: themeVars.semanticColour.text.brandDefault,
  },
]);

export const fileNameError = style({
  color: themeVars.colourPalette.red700,
});

export const fileMeta = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing["spacing-2"],
  flexShrink: 0,
});

export const fileSize = style([
  text({ font: "body1" }),
  {
    margin: 0,
    color: themeVars.semanticColour.text.brandSecondary,
    whiteSpace: "nowrap",
  },
]);

export const fileSizeError = style({
  color: themeVars.colourPalette.red700,
});

/** Icon-only secondary `Button` — ghost overlay like `chClearBtn` in V1BusinessInfoSection. */
export const removeBtn = style({
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 2,
  minWidth: "auto",
  boxShadow: "none",
  flexShrink: 0,
});

export const progressTrack = style({
  position: "relative",
  width: "100%",
  height: 4,
  borderRadius: 1,
  backgroundColor: themeVars.backgroundColour.background4,
  overflow: "hidden",
});

export const progressFill = style({
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  borderRadius: 1,
  backgroundColor: themeVars.semanticColour.text.brandDefault,
  transition: "width 0.2s ease",
});

export const errorLine = style([
  text({ font: "body2" }),
  {
    margin: 0,
    marginTop: themeVars.spacing["spacing-1"],
    color: themeVars.colourPalette.red700,
  },
]);

/** Success row: single horizontal line, h ~52px */
export const fileRowSuccess = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 52,
  padding: themeVars.spacing["spacing-4"],
  borderRadius: themeVars.border.radius.xs,
  border: `1px solid ${themeVars.border.colour.colour1}`,
  backgroundColor: themeVars.backgroundColour.background0,
  boxSizing: "border-box",
  width: "100%",
});

export const fileRowSuccessRight = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing["spacing-3"],
  flexShrink: 0,
});
