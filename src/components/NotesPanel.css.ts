import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { messina } from "#theme/fonts.css.js";
import { style } from "@vanilla-extract/css";

// ── Shared ───────────────────────────────────────────────────────────────────

export const header = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  {
    flexShrink: 0,
    background: themeVars.backgroundColour.background1,
  },
]);

export const headerDesktop = style({
  padding: themeVars.spacing["spacing-3"],
  cursor: "grab",
  borderTopLeftRadius: themeVars.border.radius.m,
  borderTopRightRadius: themeVars.border.radius.m,
});

export const headerMobile = style({
  padding: `${themeVars.spacing["spacing-3"]} ${themeVars.spacing["spacing-4"]}`,
});

export const headerLeft = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-2" }),
]);

export const iconBox = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  {
    padding: themeVars.spacing["spacing-1"],
    borderRadius: themeVars.border.radius.s,
    background: themeVars.backgroundColour.background2,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    boxSizing: "border-box",
    flexShrink: 0,
  },
]);

export const notesTitle = style({
  fontFamily: messina,
  fontSize: "1rem",
  lineHeight: "1.25rem",
  letterSpacing: "-0.01em",
  fontWeight: 400,
  color: themeVars.semanticColour.text.brandDefault,
});

export const closeBtn = style({
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: themeVars.semanticColour.text.brandDefault,
  display: "flex",
  alignItems: "center",
  padding: 2,
  flexShrink: 0,
  borderRadius: themeVars.border.radius.xs,
});

export const headerDivider = style({
  width: "100%",
  height: 1,
  flexShrink: 0,
  background: themeVars.border.colour.colour1,
  opacity: 0.6,
});

// ── Body ─────────────────────────────────────────────────────────────────────

export const body = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
  }),
  {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    padding: themeVars.spacing["spacing-5"],
    background: themeVars.backgroundColour.background0,
    borderLeft: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    borderRight: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    borderBottom: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

export const bodyRounded = style({});

export const bodyInner = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
  }),
  {
    gap: themeVars.spacing["spacing-3"],
    flex: 1,
    minHeight: 0,
    width: "100%",
  },
]);

export const notesTextarea = style([
  text({ font: "body1" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    flex: 1,
    resize: "none",
    border: "none",
    padding: 0,
    outline: "none",
    backgroundColor: "transparent",
    userSelect: "text",
  },
]);

export const hintText = style([
  text({ font: "body2" }),
  {
    color: themeVars.semanticColour.text.brandTertiary,
    flexShrink: 0,
  },
]);

// ── Desktop floating panel ───────────────────────────────────────────────────

export const floatingPanel = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    borderRadius: "m",
  }),
  {
    position: "fixed",
    zIndex: 99999,
    background: themeVars.backgroundColour.background1,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    boxShadow: themeVars.shadows.sm,
    overflow: "hidden",
    userSelect: "none",
    isolation: "isolate",
  },
]);

// ── Mobile fullscreen ────────────────────────────────────────────────────────

export const mobileFullscreen = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "background1",
  }),
  {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
  },
]);

// ── Resize grip ──────────────────────────────────────────────────────────────

export const resizeGrip = style({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 18,
  height: 18,
  cursor: "nwse-resize",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  padding: 3,
});

// ── Notes trigger button ─────────────────────────────────────────────────────

export const notesButton = style([
  text({ font: "body2", weight: "medium" }),
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-1.5",
    borderRadius: "m",
  }),
  {
    padding: `5px ${themeVars.spacing["spacing-3"]}`,
    cursor: "pointer",
    color: themeVars.semanticColour.text.brandDefault,
    transition: "border-color 0.15s, background 0.15s",
    selectors: {
      '&[data-open="true"]': {
        border: `1.5px solid ${themeVars.semanticColour.text.brandDefault}`,
        background: `color-mix(in srgb, ${themeVars.semanticColour.text.brandDefault} 4%, transparent)`,
      },
      '&[data-open="false"]': {
        border: `1.5px solid ${themeVars.border.colour.colour1}`,
        background: themeVars.backgroundColour.background0,
      },
    },
  },
]);
