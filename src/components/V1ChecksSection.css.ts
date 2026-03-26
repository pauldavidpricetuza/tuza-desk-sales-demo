import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style, keyframes } from "@vanilla-extract/css";

// ── Keyframes ────────────────────────────────────────────────────────────────

export const asteriskSpin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "40%": { transform: "rotate(360deg)" },
  "50%": { transform: "rotate(360deg)" },
  "90%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(0deg)" },
});

export const spinnerRotate = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const textShimmer = keyframes({
  "0%": { backgroundPosition: "-200% center" },
  "100%": { backgroundPosition: "200% center" },
});

// ── Root layout ──────────────────────────────────────────────────────────────

export const root = style({
  flex: 1,
  position: "relative",
  overflow: "hidden",
  display: "flex",
});

export const scrollColumn = style({
  flex: 1,
  overflowY: "auto",
  padding: `${themeVars.spacing["spacing-10"]} 0`,
  transition: "padding 0.3s ease",
});

export const innerContainer = style([
  sprinkles({ display: "flex", flexDirection: "column", gap: "spacing-3" }),
  { transition: "all 0.3s ease" },
]);

export const innerDefault = style({
  maxWidth: 720,
  margin: "0 auto",
  padding: `0 ${themeVars.spacing["spacing-4"]}`,
});

export const innerWithPanel = style({
  maxWidth: "none",
  margin: 0,
  padding: `0 ${themeVars.spacing["spacing-16"]}`,
});

// ── Agent bar ────────────────────────────────────────────────────────────────

export const agentBar = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-2",
    borderRadius: "m",
    backgroundColor: "background3",
  }),
  {
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    transition:
      "opacity 0.3s ease, max-height 0.3s ease, padding 0.3s ease, margin 0.3s ease",
  },
]);

export const agentBarVisible = style({
  opacity: 1,
  maxHeight: 200,
  padding: `${themeVars.spacing["spacing-4"]} ${themeVars.spacing["spacing-5"]}`,
  marginBottom: 0,
});

export const agentBarHidden = style({
  opacity: 0,
  maxHeight: 0,
  overflow: "hidden",
  padding: `0 ${themeVars.spacing["spacing-5"]}`,
  marginBottom: `calc(-1 * ${themeVars.spacing["spacing-3"]})`,
});

export const agentBadge = style([
  sprinkles({
    display: "inline-flex",
    alignItems: "center",
    gap: "spacing-0.5",
    borderRadius: "s",
  }),
  {
    background: themeVars.colourPalette.flurotype05,
    border: `${themeVars.border.width.default} solid ${themeVars.colourPalette.flurotype20}`,
    padding: `2px ${themeVars.spacing["spacing-1.5"]}`,
  },
]);

export const agentBadgeLabel = style([
  text({ font: "body2" }),
  {
    color: themeVars.foregroundColour.foregroundAccent,
    whiteSpace: "nowrap",
  },
]);

export const asteriskAnimated = style({
  flexShrink: 0,
  animation: `${asteriskSpin} 2.4s ease-in-out infinite`,
});

export const asteriskStatic = style({ flexShrink: 0 });

export const agentMessageDone = style([
  text({ font: "body1" }),
  { color: themeVars.semanticColour.text.brandSecondary },
]);

export const agentMessageLoading = style([
  text({ font: "body1" }),
  {
    background: `linear-gradient(90deg, ${themeVars.semanticColour.text.brandSecondary} 0%, ${themeVars.semanticColour.text.brandSecondary} 40%, ${themeVars.colourPalette.cyanotype40} 50%, ${themeVars.semanticColour.text.brandSecondary} 60%, ${themeVars.semanticColour.text.brandSecondary} 100%)`,
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: `${textShimmer} 2.5s ease-in-out infinite`,
  },
]);

// ── Check row (simple) ───────────────────────────────────────────────────────

export const simpleCheckRow = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingX: "spacing-5",
    borderRadius: "m",
    backgroundColor: "background1",
  }),
  {
    height: "4rem",
    boxSizing: "border-box",
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

export const checkLabelRow = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-1" }),
]);

export const checkLabelText = style([
  text({ font: "heading3", weight: "medium" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const checkStatusArea = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-4" }),
  { flexShrink: 0 },
]);

export const spinner = style({
  animation: `${spinnerRotate} 1s linear infinite`,
});

// ── Group check card ─────────────────────────────────────────────────────────

export const groupCard = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    gap: "spacing-5",
    padding: "spacing-5",
    borderRadius: "m",
    backgroundColor: "background1",
  }),
  {
    boxSizing: "border-box",
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

export const groupHeader = style([
  sprinkles({ display: "flex", alignItems: "center", justifyContent: "space-between" }),
]);

export const subCheckTable = style({
  border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  overflow: "hidden",
});

export const subCheckRow = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingX: "spacing-4",
  }),
  {
    minHeight: "3.5625rem",
    padding: `${themeVars.spacing["spacing-3"]} ${themeVars.spacing["spacing-4"]}`,
    boxSizing: "border-box",
  },
]);

export const subCheckRowBorder = style({
  borderBottom: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
});

export const subCheckLabel = style([
  text({ font: "body1" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

// ── Status display ───────────────────────────────────────────────────────────

export const statusRow = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-1" }),
]);

export const statusDot = style({
  width: 6,
  height: 6,
  borderRadius: themeVars.border.radius.full,
  flexShrink: 0,
});

/** Figma “Skipped” — hollow dot */
export const statusDotSkipped = style({
  width: 6,
  height: 6,
  borderRadius: themeVars.border.radius.full,
  flexShrink: 0,
  boxSizing: "border-box",
  background: "transparent",
  border: `1px solid ${themeVars.border.colour.colour2}`,
});

export const statusLabel = style([
  text({ font: "body2" }),
  {
    color: themeVars.semanticColour.text.brandSecondary,
    whiteSpace: "nowrap",
  },
]);

export const resolvedLabel = style([
  text({ font: "body2" }),
  {
    color: themeVars.colourPalette.statusGreen,
    whiteSpace: "nowrap",
  },
]);

export const resolvedDot = style({
  width: 6,
  height: 6,
  borderRadius: themeVars.border.radius.full,
  flexShrink: 0,
  background: themeVars.colourPalette.statusGreen,
});

// ── Action buttons ───────────────────────────────────────────────────────────

export const startResolutionBtn = style([
  text({ font: "body1", weight: "medium" }),
  sprinkles({
    paddingY: "spacing-1.5",
    paddingX: "spacing-3",
    borderRadius: "s",
    boxShadow: "sm",
  }),
  {
    background: themeVars.semanticColour.button.primary.default,
    color: themeVars.semanticColour.button.primary.color,
    border: "none",
    cursor: "pointer",
  },
]);

export const runAgainBtn = style([
  text({ font: "body1", weight: "medium" }),
  sprinkles({
    paddingY: "spacing-1.5",
    paddingX: "spacing-3",
    borderRadius: "s",
    boxShadow: "sm",
  }),
  {
    background: themeVars.backgroundColour.background3,
    color: themeVars.semanticColour.text.brandDefault,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    cursor: "pointer",
  },
]);
