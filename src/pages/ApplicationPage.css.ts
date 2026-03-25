import { style } from '@vanilla-extract/css'
import { backgroundColour } from '../theme/colour'
import { border } from '../theme/border'
import { fonts } from '../theme/typography.css'
import { messina } from '../theme/fonts.css'

export const pageContainer = style({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: backgroundColour.background2,
})

export const mainContent = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  position: 'relative',
})

// Title bar
export const titleBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  height: 56,
  backgroundColor: backgroundColour.background1,
  borderBottom: `1px solid ${border.colour.colour1}`,
  flexShrink: 0,
})

export const titleLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
})

export const titleText = style({
  fontFamily: `${messina}, Georgia, serif`,
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '28px',
  letterSpacing: '-0.4px',
  color: '#062351',
  whiteSpace: 'nowrap',
  WebkitFontSmoothing: 'antialiased',
})

export const titleMerchantName = style({
  color: '#4367a2',
})

export const titleButtons = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const titleSavedGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})

export const titleSavedLabel = style({
  ...fonts.body2,
  color: '#062351',
  opacity: 0.4,
  whiteSpace: 'nowrap',
})

export const titleSavedValue = style({
  ...fonts.body2,
  color: '#062351',
  opacity: 0.55,
  fontWeight: 500,
  whiteSpace: 'nowrap',
})

// Business info bar – blue tinted background per Figma
export const infoBar = style({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 20px',
  borderBottom: `1px solid ${border.colour.colour1}`,
  backgroundColor: backgroundColour.background2,
  flexShrink: 0,
})

export const infoItems = style({
  display: 'flex',
  alignItems: 'center',
  gap: 48,
})

export const infoItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const infoLabel = style({
  ...fonts.label1,
  color: '#062351',
})

export const infoValue = style({
  ...fonts.body2,
  color: '#4367a2',
})

// Flex row that holds [infoBar + applicationBody] alongside the slide-in panel
export const contentRow = style({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
  minHeight: 0,
})

// Left column: infoBar stacked above the scrollable application body
export const leftColumn = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
})

// Application body
export const applicationBody = style({
  flex: 1,
  overflow: 'auto',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  minWidth: 0,
})

// Section 1 – Quoting (white, expanded)
export const quotingSection = style({
  backgroundColor: backgroundColour.background0,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  padding: '16px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

// Sections 2 & 3 – locked (light grey)
export const lockedSection = style({
  backgroundColor: backgroundColour.background2,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  padding: '16px 20px',
})

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 32,
})

export const sectionHeaderClickable = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 32,
  cursor: 'pointer',
  borderRadius: 2,
  margin: '-4px -8px',
  padding: '4px 8px',
  transition: 'background-color 0.12s',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(67, 103, 162, 0.06)',
    },
  },
})

export const sectionTitleGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
})

export const stepSquare = style({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  backgroundColor: backgroundColour.background2,
  flexShrink: 0,
})

export const stepSquareLocked = style({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  backgroundColor: backgroundColour.background4,
  flexShrink: 0,
  opacity: 0.5,
})

export const stepNumber = style({
  ...fonts.body2,
  color: '#5475ab',
})

export const sectionTitle = style({
  fontFamily: `${messina}, Georgia, serif`,
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  letterSpacing: '-0.16px',
  color: '#062351',
  whiteSpace: 'nowrap',
  WebkitFontSmoothing: 'antialiased',
})

export const sectionTitleLocked = style({
  fontFamily: `${messina}, Georgia, serif`,
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  letterSpacing: '-0.16px',
  color: '#062351',
  whiteSpace: 'nowrap',
  WebkitFontSmoothing: 'antialiased',
  opacity: 0.5,
})

// Form rows inside the Quoting section
export const formRows = style({
  borderTop: `1px solid ${border.colour.colour1}`,
  borderLeft: `1px solid ${border.colour.colour1}`,
  borderRight: `1px solid ${border.colour.colour1}`,
})

export const formRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 57,
  padding: '12px 16px 13px',
  borderBottom: `1px solid ${border.colour.colour1}`,
})

export const formRowInProgress = style([
  formRow,
  {
    borderLeft: '3px solid #E07B39',
    paddingLeft: 13,
  },
])

export const formRowLabel = style({
  ...fonts.body1,
  color: '#062351',
})

export const formRowLabelLocked = style({
  ...fonts.body1,
  color: '#062351',
  opacity: 0.5,
})

export const lockedButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '6px 12px',
  backgroundColor: backgroundColour.background3,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  opacity: 0.5,
  cursor: 'default',
})

export const lockedButtonText = style({
  ...fonts.body1,
  fontWeight: 500,
  color: '#062351',
})

// "In progress" status indicator for a form row
export const inProgressIndicator = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
})

export const inProgressDot = style({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: '#E07B39',
  flexShrink: 0,
})

export const inProgressText = style({
  ...fonts.body2,
  color: '#4367a2',
  whiteSpace: 'nowrap',
})

// "Saved" state row — status + timestamp + Continue button
export const savedRowActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
})

export const savedTimestampGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})

export const savedTimestampLabel = style({
  ...fonts.body2,
  color: '#4367a2',
  whiteSpace: 'nowrap',
})

export const savedTimestampValue = style({
  ...fonts.body2,
  color: '#062351',
  fontWeight: '500',
  whiteSpace: 'nowrap',
})

// "Complete" state — green dot + text
export const completeDot = style({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: '#4eca8b',
  flexShrink: 0,
})

export const completeText = style({
  ...fonts.body2,
  color: '#4367a2',
  whiteSpace: 'nowrap',
})

// Collapsed complete section header actions
export const sectionCompleteActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
})

export const sectionCollapseBtn = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 4,
  borderRadius: 4,
  color: '#062351',
  opacity: 0.5,
  selectors: {
    '&:hover': { opacity: 1 },
  },
})

// Admin jump menu
export const adminButtonWrapper = style({
  position: 'relative',
})

export const adminButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: 4,
  border: `1px solid ${border.colour.colour1}`,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#062351',
  opacity: 0.45,
  transition: 'opacity 0.15s, background-color 0.15s',
  selectors: {
    '&:hover': {
      opacity: 1,
      backgroundColor: '#f0f4fa',
    },
  },
})

export const adminDropdown = style({
  position: 'absolute',
  top: 'calc(100% + 6px)',
  right: 0,
  zIndex: 200,
  backgroundColor: '#ffffff',
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 6,
  boxShadow: '0 4px 16px rgba(6,35,81,0.12)',
  minWidth: 220,
  overflow: 'hidden',
})

export const adminDropdownHeader = style({
  padding: '8px 12px 6px',
  ...fonts.body2,
  color: '#062351',
  opacity: 0.45,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontSize: 10,
  borderBottom: `1px solid ${border.colour.colour1}`,
})

export const adminDropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  padding: '10px 12px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  textAlign: 'left',
  ...fonts.body2,
  color: '#062351',
  selectors: {
    '&:hover': {
      backgroundColor: '#f0f4fa',
    },
  },
})

export const adminDropdownDivider = style({
  height: 1,
  backgroundColor: border.colour.colour1,
  margin: '2px 0',
})

export const productHintText = style({
  ...fonts.body2,
  color: '#5475ab',
})
