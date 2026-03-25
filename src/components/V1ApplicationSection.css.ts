import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const root = style({
  flex: 1,
  display: "flex",
  overflow: "hidden",
});

export const rootDesktop = style({ flexDirection: "row" });

export const rootMobile = style({ flexDirection: "column" });

export const scrollArea = style({
  flex: 1,
  overflowY: "auto",
  backgroundColor: "transparent",
});

export const scrollAreaDesktop = style({
  padding: `${themeVars.spacing["spacing-8"]} 40px 60px`,
});

export const scrollAreaMobile = style({
  padding: `${themeVars.spacing["spacing-5"]} ${themeVars.spacing["spacing-4"]} ${themeVars.spacing["spacing-10"]}`,
});

export const contentWrapper = style({
  maxWidth: 680,
  margin: "0 auto",
});

export const contentWrapperDesktop = style({ maxWidth: 680 });

export const contentWrapperMobile = style({ width: "100%" });

export const continueRow = style([
  sprinkles({ display: "flex", justifyContent: "flex-end" }),
  { paddingTop: themeVars.spacing["spacing-2"] },
]);

export const fieldWrap = style([
  sprinkles({ display: "flex", flexDirection: "column" }),
]);

export const fieldLabel = style({
  fontSize: 11,
  fontFamily: "'Denim-Medium', sans-serif",
  letterSpacing: "0.88px",
  textTransform: "uppercase",
  color: themeVars.colourPalette.cyanotype60,
  marginBottom: 6,
  display: "block",
});

const fieldInputBase = {
  width: "100%",
  height: 44,
  border: `1.5px solid ${themeVars.border.colour.colour1}`,
  borderRadius: 6,
  padding: `0 ${themeVars.spacing["spacing-3"]}`,
  color: themeVars.semanticColour.text.brandDefault,
  outline: "none",
  boxSizing: "border-box" as const,
  backgroundColor: themeVars.backgroundColour.background0,
  transition: "border-color 0.15s",
};

export const fieldInput = style([text({ font: "body1" }), fieldInputBase]);

export const fieldSelect = style([
  fieldInput,
  { appearance: "auto" as const, cursor: "pointer" },
]);

export const fieldTextarea = style([
  fieldInput,
  {
    height: "auto",
    minHeight: 100,
    padding: "10px 12px",
    resize: "vertical" as const,
    lineHeight: "22px",
  },
]);

export const fieldHint = style({
  fontSize: 12,
  fontFamily: "'Denim-Regular', sans-serif",
  color: themeVars.colourPalette.cyanotype60,
  marginTop: themeVars.spacing["spacing-1"],
});

export const radioPairRow = style([
  sprinkles({ display: "flex", gap: "spacing-3" }),
]);

export const radioLabel = style([
  text({ font: "body1" }),
  sprinkles({ display: "flex", alignItems: "center", gap: "spacing-2" }),
  {
    cursor: "pointer",
    color: themeVars.semanticColour.text.brandDefault,
  },
]);

export const radioInput = style({
  accentColor: themeVars.semanticColour.text.brandDefault,
  width: 15,
  height: 15,
});

export const addonWrap = style([
  sprinkles({ display: "flex", alignItems: "center" }),
  {
    border: `1.5px solid ${themeVars.border.colour.colour1}`,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: themeVars.backgroundColour.background0,
  },
]);

const addonLabelBase = {
  padding: "0 10px",
  background: themeVars.backgroundColour.background2,
  height: 40,
  display: "flex" as const,
  alignItems: "center" as const,
  flexShrink: 0,
  color: themeVars.colourPalette.cyanotype60,
};

export const addonPrefix = style([
  text({ font: "body1" }),
  {
    ...addonLabelBase,
    borderRight: `1px solid ${themeVars.border.colour.colour1}`,
  },
]);

export const addonSuffix = style([
  text({ font: "body1" }),
  {
    ...addonLabelBase,
    borderLeft: `1px solid ${themeVars.border.colour.colour1}`,
  },
]);

export const addonInput = style([
  text({ font: "body1" }),
  {
    flex: 1,
    height: 40,
    border: "none",
    outline: "none",
    padding: `0 ${themeVars.spacing["spacing-3"]}`,
    color: themeVars.semanticColour.text.brandDefault,
    backgroundColor: "transparent",
  },
]);

export const sectionCardWrap = style({
  border: `1px solid ${themeVars.border.colour.colour1}`,
  borderRadius: 4,
  overflow: "hidden",
  background: "transparent",
  marginBottom: 24,
  boxShadow: "none",
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

export const sectionTitle = style([
  text({ font: "heading3", weight: "medium" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const sectionTitleLocked = style([
  text({ font: "heading3", weight: "medium" }),
  { color: themeVars.colourPalette.cyanotype40 },
]);

export const lockedOverlay = style([
  sprinkles({ textAlign: "center" }),
  {
    padding: 20,
    background: themeVars.backgroundColour.background1,
  },
]);

export const lockedMessage = style([
  text({ font: "body2" }),
  { color: themeVars.colourPalette.cyanotype40 },
]);

export const lockedHighlight = style({
  color: themeVars.colourPalette.cyanotype50,
});

export const sectionCardContent = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
  }),
  {
    /** Figma Form Section (8529-136442): p-[20px] */
    padding: themeVars.spacing["spacing-5"],
    gap: themeVars.spacing["spacing-6"],
    backgroundColor: "transparent",
  },
]);

/** Figma Form Section (8529-136457): 24px between stacked blocks. */
export const sectionCardInner = style([
  sprinkles({ display: "flex", flexDirection: "column", alignItems: "stretch" }),
  {
    gap: themeVars.spacing["spacing-6"],
    width: "100%",
  },
]);

/** Subsection titles (e.g. “Business details”) — plain text, no caret (Figma 8527-136437). */
export const subSectionTitleRow = style([
  sprinkles({ display: "flex", alignItems: "center" }),
  {
    margin: 0,
    padding: 0,
  },
]);

/** Matches `sectionCardContent` horizontal padding — bleed dividers to the card body edges. */
const cardBodyPadX = themeVars.spacing["spacing-5"];

/**
 * Divider + spacer above subsection titles when not the first block in the card
 * (Figma Enterprise handover — horizontal rule between groups).
 * Full-bleed rule: negative margins cancel card body padding so the line spans edge-to-edge.
 */
export const subSectionHead = style({
  selectors: {
    [`${sectionCardInner} > &:not(:first-child)`]: {
      borderTop: `1px solid ${themeVars.border.colour.colour1}`,
      /** Air above subsection title after the rule (was 8px; Figma reads as ~20px+). */
      paddingTop: themeVars.spacing["spacing-5"],
      marginLeft: `calc(-1 * ${cardBodyPadX})`,
      marginRight: `calc(-1 * ${cardBodyPadX})`,
      paddingLeft: cardBodyPadX,
      paddingRight: cardBodyPadX,
      boxSizing: "border-box",
    },
  },
});

/** Title + intro copy (e.g. Trading address) — Figma gap-[8px] between heading and description */
export const subSectionIntro = style([
  sprinkles({ display: "flex", flexDirection: "column" }),
  {
    gap: themeVars.spacing["spacing-2"],
    width: "100%",
  },
]);

/** Two radio cards side-by-side — Figma gap-[16px] between tiles (no duplicate export; gap must be visible). */
export const radioCardRow = style([
  sprinkles({ display: "flex", flexDirection: "row", alignItems: "stretch" }),
  {
    width: "100%",
    flexWrap: "nowrap",
    gap: themeVars.spacing["spacing-4"],
  },
]);

export const radioCard = style([
  text({ font: "body1" }),
  sprinkles({ display: "flex", alignItems: "center" }),
  {
    flex: 1,
    minWidth: 0,
    minHeight: 28,
    margin: 0,
    padding: `${themeVars.spacing["spacing-1.5"]} ${themeVars.spacing["spacing-2"]}`,
    border: `1px solid ${themeVars.border.colour.colour1}`,
    borderRadius: themeVars.border.radius.s,
    backgroundColor: themeVars.backgroundColour.background1,
    cursor: "pointer",
    gap: themeVars.spacing["spacing-3"],
    textAlign: "left",
    outline: "none",
  },
  {
    selectors: {
      "&:focus-visible": {
        outline: `2px solid ${themeVars.border.colour.colour3}`,
        outlineOffset: 2,
      },
    },
  },
]);

export const radioCardSelected = style({
  borderColor: themeVars.border.colour.colour3,
});

/** Muted line with no trailing margin when stacked under a subsection title */
export const mutedParaFlush = style({
  marginBottom: 0,
});

/** One question + control (+ optional hint) — vertical rhythm */
export const fieldBlock = style([
  sprinkles({ display: "flex", flexDirection: "column" }),
  {
    gap: themeVars.spacing["spacing-2"],
    width: "100%",
    minWidth: 0,
    alignSelf: "stretch",
  },
]);

/** Force stacked full-width fields (e.g. Business phone — Figma single column, never 2-up) */
export const stackedFieldsColumn = style([
  sprinkles({ display: "flex", flexDirection: "column" }),
  {
    width: "100%",
    minWidth: 0,
    alignSelf: "stretch",
    gap: themeVars.spacing["spacing-6"],
  },
]);

export const questionPara = style([
  text({ font: "body1" }),
  { margin: 0, color: themeVars.semanticColour.text.brandDefault },
]);

export const hintPara = style([
  text({ font: "body2" }),
  { margin: 0, color: themeVars.semanticColour.text.brandSecondary },
]);

export const mutedPara = style([
  text({ font: "body2" }),
  {
    margin: 0,
    marginBottom: themeVars.spacing["spacing-3"],
    color: themeVars.semanticColour.text.brandSecondary,
  },
]);

/** Two-column field row (desktop) */
export const gridTwo = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: themeVars.spacing["spacing-4"],
  "@media": {
    "(min-width: 640px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
});

/** Vertical stack of labelled Storybook TextInputs (bank blocks) */
export const fieldStack = style([
  sprinkles({ display: "flex", flexDirection: "column" }),
  { gap: themeVars.spacing["spacing-4"] },
]);

export const subHeading = style([
  text({ font: "body2", weight: "medium" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    paddingBottom: themeVars.spacing["spacing-3"],
    borderBottom: `1px solid ${themeVars.border.colour.colour1}`,
    marginBottom: themeVars.spacing["spacing-1"],
  },
]);

export const fieldGrid = style({
  display: "grid",
  gap: themeVars.spacing["spacing-4"],
});

export const fieldGridMultiCol = style({
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
});

export const fieldGridSingleCol = style({
  gridTemplateColumns: "1fr",
});

export const ownersListWrap = style({
  border: `1px solid ${themeVars.colourPalette.cyanotype15}`,
  borderRadius: 6,
  overflow: "hidden",
});

export const ownerRow = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  {
    padding: `${themeVars.spacing["spacing-3"]} ${themeVars.spacing["spacing-4"]}`,
    background: themeVars.backgroundColour.background1,
  },
]);

export const ownerRowBorder = style({
  borderBottom: `1px solid ${themeVars.colourPalette.cyanotype15}`,
});

export const ownerInfo = style([
  sprinkles({ display: "flex", flexDirection: "column", gap: "spacing-0.5" }),
]);

export const ownerName = style([
  text({ font: "body2", weight: "medium" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const ownerDetail = style({
  fontSize: 13,
  fontFamily: "'Denim-Regular', sans-serif",
  letterSpacing: "0.39px",
  color: themeVars.semanticColour.text.brandSecondary,
});

export const removeOwnerBtn = style([
  sprinkles({ display: "flex", alignItems: "center", borderRadius: "m" }),
  {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: themeVars.colourPalette.cyanotype40,
    padding: themeVars.spacing["spacing-1"],
  },
]);

export const addOwnerForm = style([
  sprinkles({ display: "flex", flexDirection: "column" }),
  {
    border: `1px solid ${themeVars.border.colour.colour1}`,
    borderRadius: 6,
    padding: themeVars.spacing["spacing-4"],
    background: themeVars.backgroundColour.background1,
    gap: 14,
  },
]);

export const addOwnerTitle = style([
  text({ font: "body2", weight: "medium" }),
  { color: themeVars.semanticColour.text.brandDefault },
]);

export const addOwnerActions = style([
  sprinkles({ display: "flex", gap: "spacing-2", justifyContent: "flex-end" }),
]);

export const addOwnerDashedBtn = style([
  text({ font: "body2", weight: "medium" }),
  sprinkles({ display: "flex", alignItems: "center" }),
  {
    gap: 6,
    border: `1.5px dashed ${themeVars.border.colour.colour1}`,
    borderRadius: 6,
    background: "transparent",
    padding: "10px 16px",
    cursor: "pointer",
    color: themeVars.semanticColour.text.brandTertiary,
    width: "100%",
  },
]);

export const uploadArea = style({
  border: `1.5px dashed ${themeVars.border.colour.colour1}`,
  borderRadius: 6,
  padding: themeVars.spacing["spacing-5"],
  textAlign: "center",
  selectors: {
    '&[data-enabled="true"]': {
      backgroundColor: themeVars.backgroundColour.background1,
      opacity: 1,
    },
    '&[data-enabled="false"]': {
      backgroundColor: themeVars.backgroundColour.background2,
      opacity: 0.5,
    },
  },
});

export const uploadText = style([
  text({ font: "body2" }),
  { color: themeVars.colourPalette.cyanotype60 },
]);

export const cellBase = style([
  text({ font: "body2" }),
  {
    padding: "10px 12px",
    color: themeVars.semanticColour.text.brandDefault,
    borderBottom: `1px solid ${themeVars.colourPalette.cyanotype15}`,
    verticalAlign: "top",
  },
]);

export const cellRight = style([
  cellBase,
  {
    textAlign: "right",
    whiteSpace: "nowrap",
    color: themeVars.semanticColour.text.brandSecondary,
  },
]);

/** Full-width sentence label (Figma question copy) */
export const questionText = style([
  text({ font: "body1" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    margin: 0,
    marginBottom: themeVars.spacing["spacing-2"],
  },
]);

export const sectionIntro = style([
  text({ font: "body2" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    margin: 0,
    marginBottom: themeVars.spacing["spacing-3"],
  },
]);

export const manualEntryLink = style([
  text({ font: "body2" }),
  {
    color: themeVars.semanticColour.text.brandTertiary,
    textDecoration: "underline",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    marginTop: themeVars.spacing["spacing-2"],
  },
]);

/** Small caps label above a field group (e.g. IN PERSON) */
export const fieldCapsLabel = style({
  fontSize: 10,
  fontFamily: "'Space Mono', monospace",
  letterSpacing: "0.8px",
  textTransform: "uppercase",
  color: themeVars.colourPalette.cyanotype60,
  marginBottom: 6,
  display: "block",
});

export const textareaLabelRow = style([
  sprinkles({ display: "flex", alignItems: "center", justifyContent: "space-between" }),
  { marginBottom: 6 },
]);

export const charCount = style([
  text({ font: "body2" }),
  { color: themeVars.colourPalette.cyanotype60 },
]);

export const ownersTable = style({
  border: `1px solid ${themeVars.colourPalette.cyanotype15}`,
  borderRadius: 6,
  overflow: "hidden",
});

export const ownersTableHead = style([
  sprinkles({ display: "grid" }),
  {
    gridTemplateColumns: "1fr 100px 120px 80px",
    background: themeVars.backgroundColour.background2,
    padding: "10px 12px",
    gap: 8,
    borderBottom: `1px solid ${themeVars.colourPalette.cyanotype15}`,
  },
]);

export const ownersTableHeadCell = style({
  fontSize: 10,
  fontFamily: "'Space Mono', monospace",
  letterSpacing: "0.8px",
  textTransform: "uppercase",
  color: themeVars.colourPalette.cyanotype60,
});

export const ownersTableRow = style([
  sprinkles({ display: "grid", alignItems: "center" }),
  {
    gridTemplateColumns: "1fr 100px 120px 80px",
    padding: "12px",
    gap: 8,
    background: themeVars.backgroundColour.background1,
  },
]);

export const ownersTableRowBorder = style({
  borderTop: `1px solid ${themeVars.colourPalette.cyanotype15}`,
});

export const ownersTableActions = style([
  sprinkles({ display: "flex", gap: "spacing-2", justifyContent: "flex-end" }),
]);

export const ownerIconBtn = style([
  sprinkles({ display: "flex", alignItems: "center", justifyContent: "center" }),
  {
    width: 28,
    height: 28,
    background: themeVars.backgroundColour.background2,
    border: `1px solid ${themeVars.border.colour.colour1}`,
    borderRadius: 2,
    cursor: "pointer",
    color: themeVars.semanticColour.text.brandDefault,
    boxShadow: "0px 1px 2px 0px rgba(9,56,130,0.1)",
  },
]);

export const addOwnerPrimaryBtn = style([
  text({ font: "body2", weight: "medium" }),
  sprinkles({ display: "flex", alignItems: "center" }),
  {
    gap: 6,
    borderRadius: 2,
    padding: "8px 14px",
    cursor: "pointer",
    letterSpacing: "0.42px",
    boxShadow: "0px 1px 2px 0px rgba(9,56,130,0.1)",
    border: `1px solid ${themeVars.semanticColour.text.brandDefault}`,
    background: themeVars.semanticColour.text.brandDefault,
    color: themeVars.backgroundColour.background0,
  },
]);

export const addOwnerSecondaryBtn = style([
  addOwnerPrimaryBtn,
  {
    border: `1px solid ${themeVars.border.colour.colour1}`,
    background: themeVars.backgroundColour.background2,
    color: themeVars.semanticColour.text.brandDefault,
  },
]);

/** Major break inside a card (e.g. Authorised signer) — full-width rule + spacing (Figma 8529-136457). */
export const formBlockDivider = style([
  sprinkles({ display: "flex", flexDirection: "column" }),
  {
    gap: themeVars.spacing["spacing-6"],
  },
  {
    selectors: {
      [`${sectionCardInner} > &:not(:first-child)`]: {
        paddingTop: themeVars.spacing["spacing-6"],
        borderTop: `1px solid ${themeVars.border.colour.colour1}`,
        marginLeft: `calc(-1 * ${cardBodyPadX})`,
        marginRight: `calc(-1 * ${cardBodyPadX})`,
        paddingLeft: cardBodyPadX,
        paddingRight: cardBodyPadX,
        boxSizing: "border-box",
      },
    },
  },
]);

export const bankIntro = style([
  text({ font: "body2" }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    margin: 0,
    marginBottom: themeVars.spacing["spacing-4"],
    lineHeight: 1.45,
  },
]);
