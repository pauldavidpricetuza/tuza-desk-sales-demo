import { style } from '@vanilla-extract/css'
import { backgroundColour, foregroundColour } from '../theme/colour'
import { border } from '../theme/border'
import { colourPalette } from '../theme/colourPalette'
import { fonts } from '../theme/typography.css'

// ── Progressive disclosure sections ──────────────────────────────────────────

export const disclosureSection = style({
  borderBottom: `1px solid ${border.colour.colour1}`,
})

export const disclosureHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '16px 20px',
})

export const disclosureHeaderLocked = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '16px 20px',
  opacity: 0.4,
  cursor: 'not-allowed',
  pointerEvents: 'none',
})


export const disclosureContent = style({
  padding: '0 20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  boxSizing: 'border-box',
})

// ── Radio cards (product type selection) ──────────────────────────────────────

export const radioCardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  overflow: 'hidden',
})

export const radioCard = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: '16px',
  backgroundColor: backgroundColour.background0,
  cursor: 'pointer',
  borderBottom: `1px solid ${border.colour.colour1}`,
  transition: 'background-color 120ms',
  ':last-child': {
    borderBottom: 'none',
  },
  ':hover': {
    backgroundColor: backgroundColour.background1,
  },
})

export const radioCardSelected = style({
  backgroundColor: '#EEF1F6',
  ':hover': {
    backgroundColor: '#EEF1F6',
  },
})

export const radioCircle = style({
  width: 16,
  height: 16,
  borderRadius: '50%',
  border: `1.5px solid ${border.colour.colour1}`,
  flexShrink: 0,
  marginTop: 2,
  backgroundColor: backgroundColour.background0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const radioCircleSelected = style({
  border: `1.5px solid #093882`,
  backgroundColor: backgroundColour.background0,
})

export const radioCircleDot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#093882',
})

export const radioCardBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const radioCardTitle = style({
  ...fonts.body1,
  fontWeight: 500,
  color: '#062351',
})

export const radioCardDesc = style({
  ...fonts.body2,
  color: '#4367a2',
})

// ── Product cards ─────────────────────────────────────────────────────────────

export const productCardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const productCard = style({
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  backgroundColor: backgroundColour.background0,
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'border-color 120ms',
  ':hover': {
    borderColor: '#4367a2',
  },
})

export const productCardSelected = style({
  borderColor: '#093882',
  ':hover': {
    borderColor: '#093882',
  },
})

export const productCardTop = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
  padding: 20,
})

export const productCardDetails = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
})

export const productCardNameRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
})

export const productCardTitle = style({
  ...fonts.body1,
  fontWeight: 500,
  color: '#062351',
})

export const productCardDesc = style({
  ...fonts.body2,
  color: '#4367a2',
  // Indent to align with name text (radio 16px + gap 10px)
  paddingLeft: 26,
})

export const productTagGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexWrap: 'wrap',
})

export const productTag = style({
  ...fonts.body2,
  color: '#4367a2',
  backgroundColor: '#e0e6f0',
  borderRadius: 2,
  padding: '4px 8px',
  whiteSpace: 'nowrap',
})

export const productPriceRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
})

export const productPrice = style({
  ...fonts.body1,
  color: '#062351',
})

export const productQtySelect = style({
  height: 32,
  padding: '0 24px 0 8px',
  ...fonts.body2,
  color: '#062351',
  backgroundColor: backgroundColour.background1,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='%23062351' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 6px center',
  cursor: 'pointer',
  outline: 'none',
})

export const productCardImage = style({
  width: 112,
  height: 112,
  borderRadius: 4,
  backgroundColor: backgroundColour.background0,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 48,
  overflow: 'hidden',
})

export const productCardDivider = style({
  height: 1,
  backgroundColor: border.colour.colour1,
  margin: '0 1px',
})

// ── Config / Upgrade sub-sections inside selected product card ─────────────────

export const productSubSection = style({
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
})

export const configCardList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const configCard = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: 16,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  backgroundColor: backgroundColour.background0,
  cursor: 'pointer',
  transition: 'border-color 120ms, background-color 120ms',
  ':hover': {
    borderColor: '#4367a2',
    backgroundColor: backgroundColour.background1,
  },
})

export const configCardSelected = style({
  borderColor: '#093882',
  backgroundColor: '#EEF1F6',
})

export const checkbox = style({
  width: 16,
  height: 16,
  borderRadius: 2,
  border: `1.5px solid ${border.colour.colour1}`,
  flexShrink: 0,
  marginTop: 2,
  backgroundColor: backgroundColour.background0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const checkboxChecked = style({
  border: `1.5px solid #093882`,
  backgroundColor: '#093882',
})

export const configCardBody = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const configCardImage = style({
  width: 64,
  height: 64,
  borderRadius: 4,
  backgroundColor: backgroundColour.background2,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  alignSelf: 'center',
})

export const configCardTitle = style({
  ...fonts.body1,
  fontWeight: 500,
  color: '#062351',
})

export const configCardDesc = style({
  ...fonts.body2,
  color: '#4367a2',
})

export const upgradeCardPrice = style({
  ...fonts.body2,
  color: '#062351',
  marginTop: 4,
})

export const upgradeCardRight = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
})

export const upgradeQtyWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
})

export const upgradeQtyLabel = style({
  ...fonts.body2,
  color: '#5475ab',
})

// ── Pricing plan cards ────────────────────────────────────────────────────────

export const pricingPlanList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
  alignItems: 'stretch',
})

export const pricingPlanCard = style({
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  backgroundColor: backgroundColour.background0,
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'background-color 0.12s ease, border-color 0.12s ease',
  width: '100%',
  boxSizing: 'border-box',
  selectors: {
    '&:hover': {
      borderColor: border.colour.colour2,
      backgroundColor: backgroundColour.background2,
    },
  },
})

export const pricingPlanCardSelected = style({
  borderColor: '#093882',
  backgroundColor: '#f5f7fa',
  selectors: {
    '&:hover': {
      borderColor: '#093882',
      backgroundColor: backgroundColour.background3,
    },
  },
})

export const pricingPlanHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '20px 20px',
})

export const pricingPlanHeaderLeft = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  flex: 1,
})

export const pricingPlanName = style({
  ...fonts.body1,
  color: '#062351',
})

export const pricingPlanDesc = style({
  ...fonts.body2,
  color: '#4367a2',
  marginTop: 1,
})

export const pricingPlanContractTag = style({
  ...fonts.body2,
  color: '#4367a2',
  backgroundColor: backgroundColour.background4,
  borderRadius: 2,
  padding: '4px 8px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

export const pricingTableFootnote = style({
  ...fonts.body2,
  color: '#4367a2',
  marginTop: 8,
})

// ── Tuza Pricing Agent block ──────────────────────────────────────────────────

export const agentBlock = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  borderTop: `1px solid ${border.colour.colour1}`,
})

export const agentHeader = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  background: colourPalette.flurotype05,
  border: `${border.width.default} solid ${colourPalette.flurotype20}`,
  borderRadius: 4,
  padding: '2px 6px',
  width: 'fit-content',
})

export const agentTitle = style({
  ...fonts.body2,
  color: foregroundColour.foregroundAccent,
  whiteSpace: 'nowrap',
})

const monoLabel = {
  fontFamily: `'Space Mono', monospace`,
  fontSize: 10,
  fontWeight: 400,
  lineHeight: '14px',
  letterSpacing: '0.8px',
  textTransform: 'uppercase' as const,
}

export const agentObjectiveLabel = style({
  ...monoLabel,
  color: '#5475ab',
})

export const agentObjectiveText = style({
  ...fonts.body2,
  color: '#062351',
})

export const marginLabel = style({
  ...monoLabel,
  color: '#5475ab',
})

export const marginValueRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
})

export const marginDot = style({
  width: 6,
  height: 6,
  borderRadius: '50%',
  flexShrink: 0,
})

export const marginValue = style({
  ...fonts.body1,
  fontWeight: 500,
  color: '#062351',
})

export const marginBarTrack = style({
  height: 5,
  backgroundColor: border.colour.colour1,
  borderRadius: 3,
  position: 'relative',
  overflow: 'visible',
})

export const marginBarFill = style({
  height: '100%',
  borderRadius: 3,
  backgroundColor: '#093882',
  transition: 'width 300ms ease',
})

export const marginBarMidpoint = style({
  position: 'absolute',
  top: -4,
  bottom: -4,
  width: 1,
  left: '50%',
  backgroundColor: '#D5DDEA',
})

export const updatesRequired = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingTop: 4,
  borderTop: `1px solid ${border.colour.colour1}`,
})

export const updatesRequiredLabel = style({
  ...monoLabel,
  color: '#E07B39',
})

export const updatesRequiredText = style({
  ...fonts.body2,
  color: '#062351',
})

// ── Pricing tables ────────────────────────────────────────────────────────────

export const pricingTableWrapper = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  boxSizing: 'border-box',
})

export const pricingTableTitle = style({
  ...fonts.body1,
  color: '#062351',
  marginBottom: 12,
})

// Outer table: right + bottom border; cells supply left + top borders
export const pricingTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  borderRight: `1px solid ${border.colour.colour1}`,
  borderBottom: `1px solid ${border.colour.colour1}`,
})

const tableHeadBase = {
  fontFamily: `'Space Mono', monospace`,
  fontSize: 10,
  fontWeight: 400,
  lineHeight: '14px',
  letterSpacing: '0.8px',
  textTransform: 'uppercase' as const,
  color: '#062351',
  backgroundColor: '#eef1f6',
  borderLeft: `1px solid ${border.colour.colour1}`,
  borderTop: `1px solid ${border.colour.colour1}`,
  padding: '6px 12px',
  whiteSpace: 'nowrap' as const,
}

export const pricingTableHead = style({ ...tableHeadBase, textAlign: 'left' })
export const pricingTableHeadRight = style({ ...tableHeadBase, textAlign: 'right' })

const tableCellBase = {
  ...fonts.body2,
  color: '#062351',
  backgroundColor: '#fbfcfd',
  borderLeft: `1px solid ${border.colour.colour1}`,
  borderTop: `1px solid ${border.colour.colour1}`,
  padding: '8px 12px',
  verticalAlign: 'middle' as const,
}

export const pricingTableCell = style({ ...tableCellBase, textAlign: 'left' })
export const pricingTableCellRight = style({ ...tableCellBase, textAlign: 'right' })
export const pricingTableCellCenter = style({ ...tableCellBase, textAlign: 'center' })

// Margin indicator cell content (dot + value)
export const marginIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 4,
})

export const marginIndicatorText = style({
  ...fonts.body2,
  color: '#4367a2',
})

// Editable rate / card-turnover input wrapper (contains input + unit suffix)
export const rateInputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  backgroundColor: backgroundColour.background1,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  minHeight: 28,
  padding: '4px 8px',
  width: 75,
  boxSizing: 'border-box',
})

export const rateInputWrapperError = style({
  boxShadow: 'inset 0 0 0 2px #e7000b',
})

export const rateInputWrapperLocked = style({
  backgroundColor: 'transparent',
  border: 'none',
  padding: '4px 0',
})

export const rateInputInner = style({
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  ...fonts.body1,
  color: '#062351',
  textAlign: 'right',
  padding: 0,
})

export const rateInputInnerError = style({
  color: '#c10008',
})

export const rateInputUnit = style({
  ...fonts.body1,
  color: '#4367a2',
  flexShrink: 0,
})

// Legacy standalone input (kept for non-editable read displays)
export const rateInput = style({
  width: 72,
  height: 28,
  padding: '0 6px',
  ...fonts.body2,
  color: '#062351',
  backgroundColor: backgroundColour.background0,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  textAlign: 'right',
  outline: 'none',
  ':focus': {
    borderColor: '#4367a2',
  },
})

// Lock / unlock button (28×28px square icon button)
export const lockBtn = style({
  width: 28,
  height: 28,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#eef1f6',
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  boxShadow: '0px 1px 2px 0px rgba(9,56,130,0.10)',
  cursor: 'pointer',
  color: '#4367a2',
  transition: 'background-color 120ms',
  ':hover': {
    backgroundColor: '#d5ddea',
  },
})

export const lockBtnLocked = style({
  backgroundColor: '#d5ddea',
  color: '#062351',
})

// Grey row background for locked rates
export const lockedTableRow = style({
  backgroundColor: '#f5f7fa',
})

// Margin flag dot
export const flagDot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  display: 'inline-block',
  flexShrink: 0,
})

export const flagCell = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 0',
})

// ── Offers section ────────────────────────────────────────────────────────────

export const offerList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const offerCard = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: 16,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  backgroundColor: backgroundColour.background0,
  cursor: 'pointer',
  transition: 'border-color 120ms, background-color 120ms',
  ':hover': {
    borderColor: '#4367a2',
    backgroundColor: backgroundColour.background1,
  },
})

export const offerCardSelected = style({
  borderColor: '#093882',
  backgroundColor: '#EEF1F6',
})

// ── Show all link ─────────────────────────────────────────────────────────────

export const showMoreLink = style({
  display: 'inline-block',
  background: 'none',
  border: 'none',
  padding: 0,
  marginTop: -8,
  ...fonts.body2,
  color: '#4367a2',
  textDecoration: 'underline',
  cursor: 'pointer',
  textAlign: 'left',
  ':hover': {
    color: '#093882',
  },
})

// ── Summary totals ────────────────────────────────────────────────────────────

export const summaryTitle = style({
  fontFamily: `'Space Mono', monospace`,
  fontSize: 10,
  fontWeight: 400,
  lineHeight: '14px',
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  color: '#E07B39',
  paddingTop: 4,
})

export const summaryBlock = style({
  padding: '12px 16px',
  backgroundColor: backgroundColour.background1,
  borderRadius: 4,
  border: `1px solid ${border.colour.colour1}`,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
})

export const summaryRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const summaryLabel = style({
  ...fonts.body2,
  color: '#5475ab',
})

export const summaryValue = style({
  ...fonts.body2,
  fontWeight: 500,
  color: '#062351',
})

export const summaryTotal = style({
  ...fonts.body1,
  fontWeight: 500,
  color: '#062351',
})

// ── Delete button in panel header ─────────────────────────────────────────────

export const deleteBtn = style({
  marginLeft: 'auto',
  flexShrink: 0,
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  cursor: 'pointer',
  color: '#5475ab',
  transition: 'color 120ms, border-color 120ms',
  ':hover': {
    color: '#c0392b',
    borderColor: '#c0392b',
  },
})

// ── Confirmation modal ────────────────────────────────────────────────────────

export const modalOverlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(6, 35, 81, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
})

export const modalBox = style({
  backgroundColor: 'white',
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  padding: 20,
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  boxShadow: '0px 1px 7px 0px rgba(9, 56, 130, 0.15)',
})

export const modalTitle = style({
  ...fonts.body1,
  fontWeight: 500,
  color: '#062351',
})

export const modalBody = style({
  ...fonts.body1,
  color: '#062351',
})

export const modalButtons = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const deleteConfirmBtn = style({
  height: 32,
  padding: '0 12px',
  backgroundColor: '#e7000b',
  border: 'none',
  borderRadius: 2,
  cursor: 'pointer',
  ...fonts.body1,
  fontWeight: 500,
  color: 'white',
  boxShadow: '0px 1px 2px 0px rgba(9, 56, 130, 0.1)',
  ':hover': {
    backgroundColor: '#c0000a',
  },
})
