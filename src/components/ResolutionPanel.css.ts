import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style, keyframes, globalStyle } from "@vanilla-extract/css";

// ── Keyframes ────────────────────────────────────────────────────────────────

export const sectionReveal = keyframes({
  from: { opacity: 0, transform: "translateY(8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const reveal = style({
  animation: `${sectionReveal} 0.45s ease-out both`,
});

// ── Panel shell ──────────────────────────────────────────────────────────────

export const panelShell = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "background0",
    boxShadow: "md",
  }),
  {
    width: "42.5rem",
    flexShrink: 0,
    borderLeft: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

// ── Title bar ────────────────────────────────────────────────────────────────

export const titleBar = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingX: "spacing-5",
  }),
  {
    height: "3.75rem",
    flexShrink: 0,
    borderBottom: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

export const titleText = style([
  text({ font: "heading2" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const closeBtn = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  display: "flex",
});

// ── Scrollable body ──────────────────────────────────────────────────────────

export const scrollBody = style([
  sprinkles({ paddingX: "spacing-5", paddingTop: "spacing-5" }),
  {
    flex: 1,
    overflowY: "auto",
    paddingBottom: themeVars.spacing["spacing-6"],
  },
]);

// ── Agent badge ──────────────────────────────────────────────────────────────

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
    marginBottom: themeVars.spacing["spacing-4"],
  },
]);

export const agentBadgeLabel = style([
  text({ font: "body2" }),
  { color: themeVars.foregroundColour.foregroundAccent },
]);

// ── Timeline ─────────────────────────────────────────────────────────────────

export const timelineContainer = style([
  sprinkles({ display: "flex", flexDirection: "column" }),
]);

export const timelineStep = style({ display: "flex" });

export const timelineGutter = style({
  width: 7,
  flexShrink: 0,
  marginRight: themeVars.spacing["spacing-5"],
  position: "relative",
  minHeight: "1.5rem",
});

export const timelineDotComplete = style({
  position: "absolute",
  top: 9,
  left: 0,
  width: 7,
  height: 7,
  borderRadius: "50%",
  background: themeVars.semanticColour.button.primary.default,
});

export const timelineDotPending = style({
  position: "absolute",
  top: 9,
  left: 0,
  width: 7,
  height: 7,
  borderRadius: "50%",
  background: themeVars.backgroundColour.background0,
  border: `1.5px solid ${themeVars.border.colour.colour2}`,
  boxSizing: "border-box",
});

const lineBase = {
  position: "absolute" as const,
  left: 3,
};

export const lineSolid = style({
  ...lineBase,
  width: 1,
  background: themeVars.semanticColour.button.primary.default,
});

export const lineDashed = style({
  ...lineBase,
  width: 0,
  borderLeft: `1px dashed ${themeVars.border.colour.colour2}`,
});

// ── Section typography ───────────────────────────────────────────────────────

export const sectionTitle = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-1" }),
]);

export const heading = style([
  text({ font: "heading3", weight: "medium" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const body = style([
  text({ font: "body1" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const desc = style([
  text({ font: "body2" }),
  { color: themeVars.semanticColour.text.brandSecondary },
]);

export const label = style([
  text({ font: "label1" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

// ── Section content stack ────────────────────────────────────────────────────

export const sectionStack = style([
  sprinkles({ display: "flex", flexDirection: "column", gap: "spacing-2" }),
  { marginTop: themeVars.spacing["spacing-2"] },
]);

export const sectionStackTight = style([
  sprinkles({ display: "flex", flexDirection: "column", gap: "spacing-1.5" }),
  { marginTop: themeVars.spacing["spacing-2"] },
]);

// ── Field box ────────────────────────────────────────────────────────────────

export const fieldBox = style([
  text({ font: "body1" }),
  sprinkles({
    paddingY: "spacing-1.5",
    paddingX: "spacing-2",
    borderRadius: "s",
    backgroundColor: "background1",
  }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    minHeight: "1.75rem",
  },
]);

export const fieldBoxRow = style([
  sprinkles({ display: "flex", alignItems: "center", justifyContent: "space-between" }),
]);

// ── Radio cards ──────────────────────────────────────────────────────────────

export const radioRow = style([sprinkles({ display: "flex", gap: "spacing-4" })]);

export const radioCard = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-3",
    paddingY: "spacing-1.5",
    paddingX: "spacing-2",
    borderRadius: "s",
    backgroundColor: "background1",
  }),
  {
    flex: 1,
    cursor: "pointer",
    minHeight: "1.75rem",
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    selectors: {
      '&[data-selected="true"]': {
        borderColor: themeVars.semanticColour.button.primary.default,
      },
    },
  },
]);

export const radioDot = style({
  width: "1rem",
  height: "1rem",
  borderRadius: themeVars.border.radius.full,
  flexShrink: 0,
  background: themeVars.backgroundColour.background1,
  border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  boxSizing: "border-box",
  selectors: {
    '&[data-selected="true"]': {
      border: `5px solid ${themeVars.semanticColour.text.brandDefault}`,
    },
  },
});

// ── Textarea ─────────────────────────────────────────────────────────────────

export const textarea = style([
  text({ font: "body1" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    width: "100%",
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    borderRadius: themeVars.border.radius.s,
    background: themeVars.backgroundColour.background1,
    padding: `${themeVars.spacing["spacing-1.5"]} ${themeVars.spacing["spacing-2"]}`,
    minHeight: "3.75rem",
    resize: "vertical" as const,
    outline: "none",
    boxSizing: "border-box",
  },
]);

// ── Select ───────────────────────────────────────────────────────────────────

export const selectField = style([
  text({ font: "body1" }),
  sprinkles({
    paddingY: "spacing-1.5",
    paddingX: "spacing-2",
    borderRadius: "s",
    backgroundColor: "background1",
  }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    width: "100%",
    appearance: "none",
    cursor: "pointer",
    paddingRight: "1.75rem",
    minHeight: "1.75rem",
  },
]);

// ── Buttons ──────────────────────────────────────────────────────────────────

export const primaryBtn = style([
  text({ font: "body1", weight: "medium" }),
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-1",
    justifyContent: "center",
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
    selectors: {
      "&[data-disabled]": {
        opacity: 0.5,
        cursor: "default",
      },
    },
  },
]);

export const kbdBadge = style([
  text({ font: "code" }),
  {
    width: "1rem",
    height: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.15)",
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour3}`,
    borderRadius: themeVars.border.radius.s,
    color: themeVars.semanticColour.button.primary.color,
  },
]);

// ── Footer ───────────────────────────────────────────────────────────────────

export const footer = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "spacing-4",
    paddingX: "spacing-5",
    paddingY: "spacing-4",
    backgroundColor: "background0",
  }),
  {
    flexShrink: 0,
    borderTop: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

// ── File upload zone ─────────────────────────────────────────────────────────

export const uploadZone = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "spacing-2",
    borderRadius: "m",
    backgroundColor: "background2",
  }),
  {
    border: `1px dashed ${themeVars.border.colour.colour1}`,
    padding: `${themeVars.spacing["spacing-6"]} ${themeVars.spacing["spacing-4"]}`,
  },
]);

export const uploadHint = style([
  text({ font: "body2" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const uploadSubHint = style([
  text({ font: "body2" }),
  { color: themeVars.colourPalette.cyanotype50 },
]);

export const uploadSizeHint = style([
  text({ font: "body2" }),
  {
    fontSize: "0.75rem",
    color: themeVars.colourPalette.cyanotype50,
  },
]);

export const browseBtn = style([
  text({ font: "body1", weight: "medium" }),
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-1",
    paddingY: "spacing-1.5",
    paddingX: "spacing-3",
    borderRadius: "s",
  }),
  {
    background: themeVars.semanticColour.button.primary.default,
    color: themeVars.semanticColour.button.primary.color,
    border: "none",
    cursor: "pointer",
  },
]);

export const fileRow = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingY: "spacing-2",
    paddingX: "spacing-3",
    borderRadius: "s",
    backgroundColor: "background1",
  }),
  {
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

export const fileRowName = style([
  text({ font: "body1" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const fileRowMeta = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-2" }),
]);

export const fileRowSize = style([
  text({ font: "body2" }),
  { color: themeVars.semanticColour.text.brandSecondary },
]);

export const removeBtn = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  display: "flex",
});

// ── Utilities ────────────────────────────────────────────────────────────────

export const posRelative = style({ position: "relative" });

export const flexOne = style({ flex: 1 });

export const caretIcon = style({
  position: "absolute",
  right: themeVars.spacing["spacing-2"],
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
});

export const checkIconAbsolute = style({
  position: "absolute",
  right: themeVars.spacing["spacing-2"],
  top: themeVars.spacing["spacing-2"],
});
