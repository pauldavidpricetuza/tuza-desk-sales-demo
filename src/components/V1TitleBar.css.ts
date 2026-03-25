import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

// ── Desktop bar ──────────────────────────────────────────────────────────────

export const desktopBar = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingX: "spacing-5",
    backgroundColor: "background1",
  }),
  {
    padding: `${themeVars.spacing["spacing-3"]} ${themeVars.spacing["spacing-5"]}`,
    flexShrink: 0,
    borderBottom: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

export const titleColumn = style({ width: 260, flexShrink: 0 });

export const merchantTitle = style([
  text({ font: "heading2" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    whiteSpace: "nowrap",
  },
]);

// ── Navigation ───────────────────────────────────────────────────────────────

export const navRow = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-1" }),
]);

export const stepItem = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-1" }),
]);

const stepBtnBase = style([
  text({ font: "body1" }),
  {
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing["spacing-1"],
    border: "none",
    background: "transparent",
    padding: 0,
    whiteSpace: "nowrap",
    color: themeVars.semanticColour.text.brandTertiary,
  },
]);

export const stepBtn = stepBtnBase;

export const stepBtnActive = style([
  stepBtnBase,
  text({ font: "body1", weight: "medium" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    cursor: "default",
    opacity: 1,
  },
]);

export const stepBtnLocked = style([
  stepBtnBase,
  { opacity: 1, cursor: "pointer" },
]);

export const stepBtnAccessible = style([
  stepBtnBase,
  { opacity: 1, cursor: "pointer" },
]);

export const stepBtnInaccessible = style([
  stepBtnBase,
  { opacity: 0.5, cursor: "pointer" },
]);

// ── Right actions ────────────────────────────────────────────────────────────

export const rightColumn = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-2",
    justifyContent: "flex-end",
  }),
  { width: 260, flexShrink: 0 },
]);

export const notesBtn = style([
  text({ font: "body1", weight: "medium" }),
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-1",
    paddingY: "spacing-1.5",
    paddingX: "spacing-3",
    borderRadius: "s",
    boxShadow: "sm",
  }),
  {
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    background: themeVars.backgroundColour.background3,
    color: themeVars.semanticColour.text.brandDefault,
    cursor: "pointer",
    whiteSpace: "nowrap",
    selectors: {
      '&[data-open="true"]': {
        background: themeVars.colourPalette.cyanotype10,
      },
    },
  },
]);

export const submitBtn = style([
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
    border: "none",
    background: themeVars.semanticColour.button.primary.default,
    color: themeVars.semanticColour.button.primary.color,
    whiteSpace: "nowrap",
    selectors: {
      "&[data-disabled]": {
        opacity: 0.5,
        cursor: "default",
      },
      "&:not([data-disabled])": {
        cursor: "pointer",
      },
    },
  },
]);

// ── Mobile bar ───────────────────────────────────────────────────────────────

export const mobileBar = style([
  sprinkles({ backgroundColor: "background1" }),
  {
    flexShrink: 0,
    borderBottom: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  },
]);

export const mobileScrollRow = style([
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-1" }),
  {
    padding: `${themeVars.spacing["spacing-2.5"] ?? "10px"} ${themeVars.spacing["spacing-3"]}`,
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  },
]);

export const mobileStepBtn = style([
  text({ font: "body2" }),
  {
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing["spacing-1"],
    border: "none",
    background: "transparent",
    padding: `${themeVars.spacing["spacing-1"]} 2px`,
    whiteSpace: "nowrap",
    color: themeVars.semanticColour.text.brandTertiary,
  },
]);

export const mobileStepBtnActive = style([
  text({ font: "body2", weight: "medium" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    cursor: "default",
    opacity: 1,
  },
]);
