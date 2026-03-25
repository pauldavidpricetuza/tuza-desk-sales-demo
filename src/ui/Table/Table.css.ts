import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { text } from "#theme/typography.css.js";
import { style } from "@vanilla-extract/css";

export const container = sprinkles({
  display: "flex",
  flexDirection: "column",
  gap: "spacing-2",
});

export const tableContainer = style({
  overflow: "auto",
});

export const tableHideInnerBorders = style({
  borderWidth: themeVars.border.width.default,
  borderStyle: "solid",
  borderColor: themeVars.border.colour.colour1,
});

export const tableHideHeader = style({
  borderTopWidth: themeVars.border.width.default,
  borderTopStyle: "solid",
  borderTopColor: themeVars.border.colour.colour1,
});

export const table = style({
  borderSpacing: 0,
  borderCollapse: "separate",
});

export const tableNoResults = style([
  sprinkles({
    paddingX: "spacing-3",
    paddingY: "spacing-2",
    color: "brandDefault",
    borderColor: "colour1",
    borderWidth: "default",
    borderBottomStyle: "solid",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
  }),
  {
    margin: "-1px", // To get the border positioned correctly on the no results state, because the table empty cell has padding
  },
]);

export const tableHeader = style({
  height: "1.75rem",
  selectors: {
    [`${tableHideHeader} &`]: {
      visibility: "collapse",
    },
  },
});

export const tableColumnHeaderContent = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  {
    outline: "none",
  },
]);

export const cellNoBorder = sprinkles({
  borderLeftWidth: "none",
});

export const tableColumnHeader = style([
  sprinkles({
    backgroundColor: "background3",
    color: "brandDefault",
    paddingX: "spacing-3",
    paddingY: "spacing-1",
    borderColor: "colour1",
    borderWidth: "default",
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    textAlign: "left",
  }),
  text({ font: "label1" }),
  {
    position: "relative",
    ":first-child": {
      borderLeftStyle: "solid",
    },
    selectors: {
      [`&:has(${tableColumnHeaderContent}[data-focus-visible])`]: {
        backgroundColor: themeVars.backgroundColour.background4,
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "-2px",
      },
      // Remove right border when followed by a cell with no border (used for action columns or to mimic merging cells)
      [`&:has(+ .${cellNoBorder})`]: {
        borderRightWidth: 0,
      },
    },
  },
]);

export const tableColumnHeaderClickable = style([
  tableColumnHeader,
  {
    cursor: "pointer",
    ":hover": {
      backgroundColor: themeVars.backgroundColour.background4,
    },
  },
]);

export const tableRow = style({
  height: "2.5rem",
  selectors: {
    [`&[data-selection-mode]`]: {
      cursor: "pointer",
    },
    [`&[data-disabled]`]: {
      cursor: "not-allowed",
    },
    [`&[data-focus-visible]`]: {
      outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
      outlineOffset: "-2px",
    },
  },
});

export const tableCell = style([
  sprinkles({
    paddingX: "spacing-3",
    paddingY: "spacing-2",
    borderColor: "colour1",
    borderWidth: "default",
    borderBottomStyle: "solid",
    borderRightStyle: "solid",
    backgroundColor: "background2",
    color: "brandSecondary",
  }),
  text({ font: "body2" }),
  style({
    textWrap: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ":first-child": {
      backgroundColor: themeVars.backgroundColour.background1,
      color: themeVars.semanticColour.text.brandDefault,
      borderLeftStyle: "solid",
    },
    selectors: {
      [`${tableHideInnerBorders} &`]: {
        backgroundColor: themeVars.backgroundColour.background1,
        borderWidth: themeVars.border.width.none,
      },
      [`${tableRow}[data-hovered] > &:first-child`]: {
        borderLeftColor: themeVars.border.colour.default,
      },
      [`${tableRow}[data-hovered] > &`]: {
        backgroundColor: themeVars.backgroundColour.background3,
      },
      [`&[data-focus-visible]`]: {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "-2px",
        backgroundColor: themeVars.backgroundColour.background3,
      },
      [`${tableRow}[data-disabled] > &`]: {
        opacity: 0.5,
      },
      [`${tableRow}[data-focus-visible] > &`]: {
        backgroundColor: themeVars.backgroundColour.background3,
      },
      [`${tableRow}[data-selected] > &:first-child`]: {
        // Because of border collapse, a 2px border is displayed outside of the table,
        // to overcome that we use an inset box-shadow to simulate the border inside the cell
        borderLeftColor: themeVars.foregroundColour.foregroundAccent,
        boxShadow: `1px 0 0 0 ${themeVars.foregroundColour.foregroundAccent} inset`,
      },
      [`${tableRow}[data-selected] > &`]: {
        backgroundColor: themeVars.backgroundColour.background0,
      },
      // Remove right border when followed by a cell with no border (used for action columns or to mimic merging cells)
      [`&:has(+ .${cellNoBorder})`]: {
        borderRightWidth: 0,
      },
    },
  }),
]);

const sortIcon = style({
  height: "0.75rem",
  width: "0.75rem",
  fill: themeVars.foregroundColour.foreground4,
  selectors: {
    [`${tableColumnHeader}[data-hovered] &, ${tableColumnHeaderContent}[data-focus-visible] &`]:
      {
        opacity: 1,
        fill: themeVars.foregroundColour.foreground1,
      },
  },
});

/* Sort Icons */
export const sortIconInvisible = style([
  sortIcon,
  {
    opacity: 0,
  },
]);

export const sortIconAscending = style([
  sortIcon,
  {
    transform: "rotate(180deg)",
  },
]);

export const sortIconDescending = sortIcon;

export const resizer = style([
  {
    width: "10px",
    position: "absolute",
    right: "-5px",
    zIndex: 1,
    top: 0,
    bottom: 0,
    cursor: "col-resize",
    selectors: {
      [`&[data-focus-visible]`]: {
        outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
        outlineOffset: "-2px",
      },
      [`&[data-resizing]`]: {
        width: "2px",
        padding: "4px",
        backgroundClip: "content-box",
        backgroundColor: themeVars.backgroundColour.background5,
      },
      // Hide resizer on last column
      [`${tableColumnHeader}:last-child &`]: {
        display: "none",
      },
      // Hide resizer on columns before headers that have no border
      [`${tableColumnHeader}:has(+ .${cellNoBorder}) &`]: {
        display: "none",
      },
    },
  },
]);

/* Pagination */
export const tablePagination = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-4",
  }),
]);
