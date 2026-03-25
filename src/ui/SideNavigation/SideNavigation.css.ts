import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { style } from "@vanilla-extract/css";

const sideNavigation = style([
  sprinkles({
    backgroundColor: "background3",
    display: "flex",
    flexDirection: "column",
    gap: "spacing-1",
    borderRightStyle: "solid",
    borderRightWidth: "default",
    borderColor: "colour1",
  }),
  {
    height: "100dvh",
    transition: "width 300ms cubic-bezier(0, 0, 0.1, 1)",
  },
]);

export const collapsedSideNavigation = style([
  sideNavigation,
  {
    width: "2.5rem",
    minWidth: "2.5rem",
    maxWidth: "2.5rem",
    flexShrink: 0,
  },
]);

export const expandedSideNavigation = style([
  sideNavigation,
  {
    width: "12.5rem",
    minWidth: "12.5rem",
    maxWidth: "12.5rem",
    flexShrink: 0,
  },
]);

export const favIconContainer = style([
  sprinkles({
    paddingX: "spacing-1",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomStyle: "solid",
    borderBottomWidth: "default",
    borderColor: "colour1",
    flexShrink: 0,
  }),
  {
    boxSizing: "border-box",
    width: "100%",
    height: "2.5rem",
  },
]);

export const navigationContent = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  }),
  {
    width: "100%",
    overflowY: "auto",
  },
]);

export const navigationItemsList = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    paddingX: "spacing-1",
    gap: "spacing-1",
  }),
  {
    boxSizing: "border-box",
    width: "100%",
    overflowY: "auto",
  },
]);

export const navigationCompactItem = sprinkles({
  padding: "spacing-1.5",
});

export const navigationItem = style([
  sprinkles({
    backgroundColor: "background3",
    display: "flex",
    alignItems: "center",
    gap: "spacing-2",
    borderRadius: "s",
    flexShrink: 0,
  }),
  {
    color: themeVars.foregroundColour.foreground2,
    border: "none",
    textDecoration: "none",
    cursor: "pointer",
    width: "2rem",
    transition: "width 200ms cubic-bezier(0, 0, 0.1, 1)",
    height: "2rem",
    overflowX: "hidden",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: themeVars.backgroundColour.background4,
      color: themeVars.foregroundColour.foreground1,
    },
    ":focus-visible": {
      outline: `2px solid ${themeVars.foregroundColour.foreground2}`,
      outlineOffset: "-2px",
    },
    selectors: {
      [`${collapsedSideNavigation} &`]: {
        transitionDelay: "200ms",
      },
      [`${expandedSideNavigation} ${favIconContainer} &, ${expandedSideNavigation} ${navigationItemsList} &`]:
        {
          width: "100%",
        },
      [`&:not(${navigationCompactItem})`]: {
        padding:
          themeVars.spacing["spacing-1"] + " " + themeVars.spacing["spacing-2"],
      },
    },
  },
]);

export const navigationItemActive = style({
  backgroundColor: themeVars.backgroundColour.background2,
  color: themeVars.foregroundColour.foreground1,
  ":hover": {
    backgroundColor: themeVars.backgroundColour.background2,
  },
});

export const navigationItemLabel = style({
  opacity: 0,
  transition: "opacity 300ms ease-in-out",
  selectors: {
    [`${expandedSideNavigation} &`]: {
      opacity: 1,
    },
  },
});

export const navigationItemIcon = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  }),
  {
    selectors: {
      [`${navigationItemActive} &`]: {
        fill: themeVars.foregroundColour.foregroundAccent,
      },
    },
  },
]);

export const expandButtonContainer = style([
  sprinkles({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  {
    height: "2.5rem",
    width: "2.5rem",
  },
]);
