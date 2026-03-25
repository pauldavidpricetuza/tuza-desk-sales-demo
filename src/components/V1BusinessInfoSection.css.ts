import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style, keyframes } from "@vanilla-extract/css";

export const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const root = style({
  flex: 1,
  overflowY: "auto",
  padding: "0 0 40px",
});

export const contentWidth = style({
  maxWidth: 680,
  margin: "0 auto",
  padding: `${themeVars.spacing["spacing-8"]} ${themeVars.spacing["spacing-6"]} 0`,
});

export const contentWidthMobile = style({
  width: "100%",
  maxWidth: 680,
  margin: "0 auto",
  padding: `${themeVars.spacing["spacing-5"]} ${themeVars.spacing["spacing-4"]} 0`,
});

export const contentWidthDesktop = style({
  maxWidth: 680,
  margin: "0 auto",
  padding: `${themeVars.spacing["spacing-8"]} ${themeVars.spacing["spacing-6"]} 0`,
});

export const label = style([
  text({ font: "label1" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    marginBottom: 6,
    display: "block",
  },
]);

export const fieldBox = style([
  text({ font: "body1" }),
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    width: "100%",
    minHeight: 40,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    borderRadius: 2,
    padding: "6px 8px",
    color: themeVars.semanticColour.text.brandDefault,
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: themeVars.backgroundColour.background1,
    gap: 8,
  },
]);

export const input = style([
  text({ font: "body1" }),
  {
    width: "100%",
    minHeight: 40,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    borderRadius: 2,
    padding: "6px 8px",
    color: themeVars.semanticColour.text.brandDefault,
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: themeVars.backgroundColour.background1,
    display: "block",
  },
]);

export const textarea = style([
  text({ font: "body1" }),
  {
    width: "100%",
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    borderRadius: 2,
    padding: 8,
    color: themeVars.semanticColour.text.brandDefault,
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    minHeight: 110,
    backgroundColor: themeVars.backgroundColour.background1,
  },
]);

export const hint = style([
  text({ font: "body2" }),
  {
    color: themeVars.semanticColour.text.brandTertiary,
    marginTop: 8,
  },
]);

export const fieldCheckIcon = style({ flexShrink: 0 });

export const sectionCard = style({
  border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  borderRadius: 4,
  overflow: "hidden",
  background: themeVars.backgroundColour.background2,
  marginBottom: 24,
});

export const sectionCardHeader = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    background: themeVars.backgroundColour.background1,
    borderBottom: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    padding: "16px 20px",
    gap: 4,
  },
]);

export const sectionCardTitle = style([
  text({ font: "heading3", weight: "medium" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const sectionCardBody = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
  }),
  { padding: 20, gap: 24 },
]);

export const selectWrapper = style({ position: "relative" });

export const selectInput = style([
  text({ font: "body1" }),
  {
    width: "100%",
    minHeight: 40,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    borderRadius: 2,
    padding: "6px 8px",
    color: themeVars.semanticColour.text.brandDefault,
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: themeVars.backgroundColour.background1,
    display: "block",
    appearance: "none",
  },
]);

export const selectIcons = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    gap: 8,
    pointerEvents: "none",
  },
]);

export const readOnlyFieldBox = style([
  text({ font: "body1" }),
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  {
    width: "100%",
    minHeight: 40,
    border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    borderRadius: 2,
    padding: "6px 8px",
    color: themeVars.semanticColour.text.brandDefault,
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: themeVars.backgroundColour.background1,
    gap: 8,
    opacity: 0.5,
  },
]);

export const inputWithCheckWrapper = style({ position: "relative" });

export const inputCheckOverlay = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
]);

export const inputCheckOverlayWithGap = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    gap: 4,
    pointerEvents: "none",
  },
]);

export const textareaCheckOverlay = style({
  position: "absolute",
  right: 8,
  top: 10,
  pointerEvents: "none",
});

export const lockBanner = style([
  sprinkles({
    display: "flex",
    alignItems: "flex-start",
    borderRadius: "m",
  }),
  {
    gap: 10,
    background: themeVars.backgroundColour.background2,
    border: `1px solid ${themeVars.colourPalette.cyanotype30}`,
    padding: "12px 16px",
    marginBottom: 24,
  },
]);

export const lockEmoji = style({
  fontSize: 16,
  flexShrink: 0,
  marginTop: 1,
});

export const lockTitle = style([
  text({ font: "body2", weight: "medium" }),
  {
    color: themeVars.semanticColour.text.brandSecondary,
    marginBottom: 2,
  },
]);

export const lockDescription = style([
  text({ font: "body2" }),
  {
    color: themeVars.semanticColour.text.brandTertiary,
    lineHeight: "18px",
  },
]);

export const productWarningBanner = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    gap: 8,
    background: themeVars.colourPalette.cyanotype15,
    border: `1px solid ${themeVars.border.colour.colour2}`,
    padding: 20,
    marginBottom: 24,
  },
]);

export const productWarningText = style([
  text({ font: "body1" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const productWarningIcon = style({ flexShrink: 0 });

export const descriptionHeader = style([
  sprinkles({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  { marginBottom: 6 },
]);

export const descriptionLabelNoMargin = style([
  text({ font: "label1" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    display: "block",
    marginBottom: 0,
  },
]);

export const charCount = style([
  text({ font: "body2" }),
  {
    fontSize: 11,
    color: themeVars.colourPalette.cyanotype40,
  },
]);

export const mccLoadingRow = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    gap: 8,
    height: 40,
    color: themeVars.semanticColour.text.brandTertiary,
  },
]);

export const mccLoadingText = style([
  text({ font: "body1" }),
  { color: themeVars.semanticColour.text.brandTertiary },
]);

export const spinnerIcon = style({
  animation: `${spin} 1s linear infinite`,
});

export const mccAgentRow = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  { gap: 8, marginTop: 8 },
]);

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

export const mccAgentHint = style([
  text({ font: "body2" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const chDropdown = style({
  position: "absolute",
  zIndex: 9999,
  background: themeVars.backgroundColour.background0,
  border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  borderRadius: 4,
  boxShadow: themeVars.shadows.sm,
  overflow: "hidden",
});

export const chDivider = style({
  borderTop: `1px solid ${themeVars.backgroundColour.background2}`,
});

export const chResult = style({
  padding: "10px 14px",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: themeVars.backgroundColour.background1,
    },
  },
});

export const chResultHeader = style([
  sprinkles({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  { marginBottom: 2 },
]);

export const chResultName = style([
  text({ font: "body2", weight: "medium" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const chResultAddress = style({
  fontSize: 12,
  color: themeVars.colourPalette.cyanotype60,
  fontFamily: "'Denim-Regular', sans-serif",
});

export const chClearBtn = style({
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: 2,
  display: "flex",
  borderRadius: 2,
});

export const checkboxOption = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
  }),
  {
    flex: 1,
    gap: 8,
    borderRadius: 2,
    padding: "8px 12px",
    minHeight: 40,
  },
]);

export const checkboxOptionUnchecked = style({
  border: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
  background: themeVars.backgroundColour.background1,
  cursor: "pointer",
});

export const checkboxOptionChecked = style({
  border: `${themeVars.border.width.default} solid ${themeVars.semanticColour.text.brandDefault}`,
  background: themeVars.backgroundColour.background2,
  cursor: "pointer",
});

export const checkboxOptionDisabled = style({
  opacity: 0.5,
  cursor: "default",
});

export const checkboxBox = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  {
    width: 16,
    height: 16,
    borderRadius: 1.6,
    flexShrink: 0,
  },
]);

export const checkboxBoxUnchecked = style({
  background: themeVars.backgroundColour.background1,
  border: `0.8px solid ${themeVars.border.colour.colour1}`,
});

export const checkboxBoxChecked = style({
  background: themeVars.semanticColour.text.brandDefault,
  border: "none",
});

export const checkboxLabel = style([
  text({ font: "body1" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const paymentLocationRow = style([
  sprinkles({ display: "flex" }),
  { gap: 12 },
]);

export const footerRow = style([
  sprinkles({
    display: "flex",
    justifyContent: "flex-end",
  }),
  {
    maxWidth: 680,
    margin: "8px auto 0",
    padding: `0 ${themeVars.spacing["spacing-6"]}`,
  },
]);

export const footerRowMobile = style({
  width: "100%",
});

export const footerRowDesktop = style({
  maxWidth: 680,
});
