import { keyframes, style } from '@vanilla-extract/css'
import { backgroundColour } from '../theme/colour'
import { border } from '../theme/border'
import { fonts } from '../theme/typography.css'
import { messina } from '../theme/fonts.css'

// Outer wrapper — controls whether the panel takes up space.
// Width transitions from 0 → 680px, pushing content left.
export const panelWrapper = style({
  flexShrink: 0,
  width: 0,
  overflow: 'hidden',
  transition: 'width 280ms ease-out',
})

export const panelWrapperOpen = style({
  width: 680,
})

// Inner panel — always 680px wide; the wrapper clips it when closed
export const panel = style({
  width: 680,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: backgroundColour.background0,
  borderLeft: `1px solid ${border.colour.colour1}`,
  boxShadow: '-4px 0 24px 0 rgba(6, 35, 81, 0.10)',
})

// Panel header – "Quoting: Business Information"
export const panelHeader = style({
  height: 60,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  borderBottom: `1px solid ${border.colour.colour1}`,
  backgroundColor: backgroundColour.background0,
})

export const panelHeaderTitle = style({
  fontFamily: `${messina}, Georgia, serif`,
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '28px',
  letterSpacing: '-0.4px',
  color: '#062351',
  whiteSpace: 'nowrap',
  WebkitFontSmoothing: 'antialiased',
})

export const panelHeaderTitleAccent = style({
  color: '#4367a2',
})

// Scrollable content area
export const panelContent = style({
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
})

// Each form section block
export const formSection = style({
  padding: '24px 20px',
  borderBottom: `1px solid ${border.colour.colour1}`,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

// Section title row
export const sectionTitleRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const sectionTitleLeft = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
})

export const sectionTitleText = style({
  ...fonts.heading3,
  color: '#062351',
})

export const sectionNote = style({
  ...fonts.body2,
  color: '#5475ab',
  whiteSpace: 'nowrap',
})

// Individual field wrapper
export const fieldGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  width: '100%',
})

export const fieldLabelRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const fieldLabel = style({
  ...fonts.label1,
  color: '#062351',
})

export const fieldCharCount = style({
  ...fonts.label1,
  color: '#5475ab',
})

const fieldBase = {
  width: '100%',
  backgroundColor: backgroundColour.background1,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  padding: '6px 8px',
  ...fonts.body1,
  color: '#062351',
  outline: 'none',
  ':focus': {
    borderColor: '#4367a2',
  },
} as const

export const fieldInput = style({
  ...fieldBase,
  height: 40,
})

export const fieldSelect = style({
  ...fieldBase,
  height: 40,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='%23062351' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: 28,
  cursor: 'pointer',
})

export const fieldTextarea = style({
  ...fieldBase,
  minHeight: 100,
  resize: 'vertical',
  lineHeight: '20px',
})

export const fieldHintText = style({
  ...fonts.body2,
  color: '#4367a2',
  lineHeight: '18px',
  marginTop: -2,
})

// Companies House search input — white background + blue focus ring per Figma
export const chInput = style({
  width: '100%',
  backgroundColor: backgroundColour.background0,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  padding: '6px 8px',
  height: 40,
  ...fonts.body1,
  color: '#062351',
  outline: 'none',
  ':focus': {
    boxShadow: 'inset 0 0 0 2px #4367a2',
    borderColor: '#4367a2',
  },
})

// Wrapper so the dropdown can be absolutely positioned below the input
export const chWrapper = style({
  position: 'relative',
  width: '100%',
})

// Dropdown menu — position:fixed set via inline style (escapes scroll container)
export const chDropdown = style({
  position: 'fixed',
  zIndex: 1000,
  backgroundColor: backgroundColour.background0,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  boxShadow: '0px 1px 7px 0px rgba(9, 56, 130, 0.15)',
})

// Inner padding container matching Figma p-[4px] gap-[4px]
export const chMenu = style({
  padding: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

export const chItem = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '4px 8px',
  borderRadius: 2,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: backgroundColour.background2,
  },
})

export const chItemTop = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
})

export const chCompanyName = style({
  ...fonts.body1,
  color: '#062351',
})

export const chAddress = style({
  ...fonts.body1,
  color: '#5475ab',
})

export const chStatus = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
})

export const chStatusDot = style({
  width: 6,
  height: 6,
  borderRadius: '50%',
  flexShrink: 0,
})

export const chStatusText = style({
  ...fonts.body2,
  color: '#4367a2',
  whiteSpace: 'nowrap',
})

// Full-width divider between items
export const chDivider = style({
  height: 1,
  backgroundColor: border.colour.colour1,
})

export const chHintText = style({
  ...fonts.body2,
  color: '#4367a2',
  marginTop: 4,
})

// MCC field states
export const mccFieldWrapper = style({
  position: 'relative',
  width: '100%',
})

export const mccSpinnerWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 8px',
  height: 40,
  backgroundColor: backgroundColour.background1,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
})

export const mccSpinnerText = style({
  ...fonts.body1,
  color: '#5475ab',
})

const spinKeyframe = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const mccSpinnerIcon = style({
  flexShrink: 0,
  animation: `${spinKeyframe} 0.8s linear infinite`,
})

// Panel footer
export const panelFooter = style({
  flexShrink: 0,
  borderTop: `1px solid ${border.colour.colour1}`,
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 8,
  backgroundColor: backgroundColour.background0,
})
