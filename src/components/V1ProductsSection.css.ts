import { style, globalStyle, keyframes } from '@vanilla-extract/css'
import { sprinkles } from '../theme/sprinkles.css'
import { themeVars } from '../theme/theme.css'
import { text } from '../theme/typography.css'

// ── Streamed agent (animated asterisk + typewriter + action) ─────────────────

/** Same motion as checks agent bar asterisk: full spin then reset (reads as active “thinking”). */
const pricingAgentAsteriskSpin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '40%': { transform: 'rotate(360deg)' },
  '50%': { transform: 'rotate(360deg)' },
  '90%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(0deg)' },
})

const agentCardEnterKeyframes = keyframes({
  '0%': { opacity: 0, transform: 'translateY(6px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const agentActionPopKeyframes = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.92)' },
  '70%': { opacity: 1, transform: 'scale(1.02)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
})

const agentLoadingShimmer = keyframes({
  '0%': { backgroundPosition: '-200% center' },
  '100%': { backgroundPosition: '200% center' },
})

export const pricingAgentAsteriskAnimated = style({
  flexShrink: 0,
  display: 'block',
  animation: `${pricingAgentAsteriskSpin} 2.4s ease-in-out infinite`,
})

export const agentCardEnter = style({
  animation: `${agentCardEnterKeyframes} 0.4s ease-out`,
})

export const agentLoadingLine = style([
  text({ font: 'body1' }),
  {
    margin: 0,
    minHeight: '1.25em',
    background: `linear-gradient(90deg, ${themeVars.semanticColour.text.brandSecondary} 0%, ${themeVars.semanticColour.text.brandSecondary} 40%, ${themeVars.colourPalette.cyanotype40} 50%, ${themeVars.semanticColour.text.brandSecondary} 60%, ${themeVars.semanticColour.text.brandSecondary} 100%)`,
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: `${agentLoadingShimmer} 2.5s ease-in-out infinite`,
  },
])

export const agentActionPop = style({
  animation: `${agentActionPopKeyframes} 0.42s cubic-bezier(0.22, 1, 0.36, 1)`,
})

export const confirmSectionSpacer = style({
  minHeight: 40,
  visibility: 'hidden',
})

/** Read-only pricing values (no input chrome) — unselected plan cards & Simplicity */
export const pricingSummaryRateRow = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 4,
})

export const pricingSummaryValue = style([
  text({ font: 'body2' }),
  { color: themeVars.semanticColour.text.brandDefault },
])

export const pricingSummaryUnit = style([
  text({ font: 'body2' }),
  { color: themeVars.semanticColour.text.brandTertiary },
])

export const pricingShowMoreStatic = style([
  text({ font: 'body2' }),
  {
    display: 'inline-block',
    marginTop: -8,
    textAlign: 'left',
    color: themeVars.semanticColour.text.brandTertiary,
  },
])

export const pricingShowMoreLinkWrap = style({
  display: 'inline-block',
  marginTop: -8,
})

// ── SectionCardProducts ──────────────────────────────────────────────────────

export const sectionCard = style({
  border: `1px solid ${themeVars.border.colour.colour1}`,
  borderRadius: 4,
  overflow: 'hidden',
  background: themeVars.backgroundColour.background2,
  marginBottom: 24,
})

export const sectionCardDisabled = style({
  opacity: 0.5,
  pointerEvents: 'none',
})

export const sectionCardHeader = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    background: themeVars.backgroundColour.background1,
    borderBottom: `1px solid ${themeVars.border.colour.colour1}`,
    padding: '16px 20px',
    gap: 4,
  },
])

export const sectionCardTitleText = style([
  text({ font: 'heading3', weight: 'medium' }),
  { color: themeVars.semanticColour.text.brandDefault },
])

export const sectionCardContent = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  { padding: 20, gap: 24 },
])

// ── Recommendation / Pricing Agent badge ─────────────────────────────────────

export const agentCard = style({
  background: themeVars.backgroundColour.background2,
  border: `1px solid ${themeVars.border.colour.colour1}`,
  borderRadius: 2,
  padding: 16,
  boxShadow: themeVars.shadows.sm,
  marginTop: 12,
  marginBottom: 12,
})

export const agentCardInline = style({
  background: themeVars.backgroundColour.background2,
  border: `1px solid ${themeVars.border.colour.colour1}`,
  borderRadius: 2,
  padding: 16,
  boxShadow: themeVars.shadows.sm,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const agentBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  background: themeVars.colourPalette.flurotype05,
  border: `1px solid ${themeVars.colourPalette.flurotype20}`,
  borderRadius: 2,
  padding: '2px 6px',
  height: 22,
  width: 'fit-content',
  marginBottom: 8,
})

export const agentBadgeNoMargin = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  background: themeVars.colourPalette.flurotype05,
  border: `1px solid ${themeVars.colourPalette.flurotype20}`,
  borderRadius: 2,
  padding: '2px 6px',
  height: 22,
  width: 'fit-content',
})

export const agentBadgeText = style([
  text({ font: 'body2' }),
  { color: themeVars.foregroundColour.foregroundAccent },
])

export const agentBodyText = style([
  text({ font: 'body1' }),
  { color: themeVars.semanticColour.text.brandDefault, margin: 0 },
])

export const agentBodyTextSecondary = style([
  text({ font: 'body1' }),
  { color: themeVars.semanticColour.text.brandSecondary, margin: 0 },
])

// ── Receipt panel table cells ────────────────────────────────────────────────

export const receiptCell = style([
  text({ font: 'body2' }),
  {
    flex: '1 0 0',
    minHeight: 40,
    padding: '8px 12px',
    color: themeVars.semanticColour.text.brandDefault,
    background: themeVars.backgroundColour.background1,
    borderTop: `1px solid ${themeVars.border.colour.colour1}`,
    borderLeft: `1px solid ${themeVars.border.colour.colour1}`,
    display: 'flex',
    alignItems: 'center',
  },
])

export const receiptCellRight = style([
  text({ font: 'body2' }),
  {
    flex: '0 0 auto',
    minHeight: 40,
    padding: '8px 12px',
    color: themeVars.semanticColour.text.brandSecondary,
    background: themeVars.backgroundColour.background1,
    borderTop: `1px solid ${themeVars.border.colour.colour1}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
])

export const receiptCellTotal = style({
  background: themeVars.backgroundColour.background3,
  fontWeight: 500,
})

export const receiptRow = style([
  sprinkles({ display: 'flex' }),
  { width: '100%' },
])

export const receiptDotWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: 4 },
])

export const receiptDot = style({
  width: 6,
  height: 6,
  borderRadius: '50%',
  flexShrink: 0,
})

export const receiptDotText = style([
  text({ font: 'body2' }),
])

// ── Receipt panel layout ─────────────────────────────────────────────────────

export const receiptWrapper = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  { height: '100%' },
])

export const receiptTitleBar = style({
  padding: '16px 20px',
  borderBottom: `1px solid ${themeVars.border.colour.colour1}`,
  background: themeVars.backgroundColour.background0,
})

export const receiptTitleText = style([
  text({ font: 'heading2' }),
  { color: themeVars.semanticColour.text.brandDefault },
])

export const receiptContentArea = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 20px 48px',
    gap: 24,
  },
])

export const receiptSectionTitle = style([
  text({ font: 'body1', weight: 'medium' }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    marginBottom: 12,
  },
])

export const receiptTableBorder = style({
  borderBottom: `1px solid ${themeVars.border.colour.colour1}`,
  borderRight: `1px solid ${themeVars.border.colour.colour1}`,
})

// ── Main layout ──────────────────────────────────────────────────────────────

export const mainWrapper = style({
  flex: 1,
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
})

export const mainWrapperMobile = style({
  flexDirection: 'column',
})

export const leftColumn = style({
  flex: 1,
  overflowY: 'auto',
  minWidth: 0,
  position: 'relative',
})

export const lockedOverlay = style({
  position: 'absolute',
  inset: 0,
  zIndex: 10,
  pointerEvents: 'all',
  cursor: 'default',
})

export const leftContent = style({
  padding: '32px 32px 60px',
  maxWidth: 744,
  margin: '0 auto',
})

export const leftContentMobile = style({
  padding: '20px 16px 40px',
  width: '100%',
})

export const leftContentLocked = style({
  pointerEvents: 'none',
})

// ── Locked banner ────────────────────────────────────────────────────────────

export const lockedBanner = style([
  sprinkles({ display: 'flex', alignItems: 'flex-start' }),
  {
    gap: 10,
    background: '#f0f4fb',
    border: '1px solid #c5d2e8',
    borderRadius: 8,
    padding: '12px 16px',
    marginBottom: 28,
    pointerEvents: 'none',
  },
])

export const lockedBannerTitle = style([
  text({ font: 'body2', weight: 'medium' }),
  {
    color: themeVars.semanticColour.text.brandSecondary,
    marginBottom: 2,
  },
])

export const lockedBannerDesc = style([
  text({ font: 'body2' }),
  {
    color: themeVars.semanticColour.text.brandTertiary,
    lineHeight: '18px',
  },
])

// ── Selected products list ───────────────────────────────────────────────────

export const selectedProductsList = style([
  sprinkles({ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }),
  { gap: 12 },
])

export const selectedProductCard = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    background: themeVars.backgroundColour.background1,
    border: `1px solid ${themeVars.border.colour.colour1}`,
    borderRadius: 2,
    padding: 20,
    justifyContent: 'space-between',
    height: 54,
    boxSizing: 'border-box',
    width: '100%',
  },
])

export const selectedProductName = style([
  text({ font: 'body1' }),
  { color: themeVars.semanticColour.text.brandDefault },
])

export const selectedProductActions = style([
  sprinkles({ display: 'flex', flexShrink: 0 }),
  { gap: 8 },
])

/** Compact icon-only control — native `<button>` (design-system `Button` padding breaks 28×28 cells). */
export const productRowIconBtn = style({
  width: 28,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: themeVars.backgroundColour.background3,
  border: `1px solid ${themeVars.border.colour.colour1}`,
  borderRadius: 2,
  cursor: 'pointer',
  boxShadow: themeVars.shadows.sm,
  padding: 0,
  flexShrink: 0,
  transition: 'background-color 0.1s ease-in-out',
  selectors: {
    '&:hover:not(:disabled)': {
      background: themeVars.semanticColour.button.secondary.hover,
    },
  },
})

// ── Editing card ─────────────────────────────────────────────────────────────

export const editingCardWrapper = style({
  background: themeVars.backgroundColour.background1,
  border: `1px solid ${themeVars.semanticColour.text.brandSecondary}`,
  borderRadius: 2,
  overflow: 'hidden',
  marginBottom: 24,
})

export const editingHeaderRow = style([
  sprinkles({ display: 'flex' }),
  {
    padding: 20,
    borderBottom: `1px solid ${themeVars.border.colour.colour1}`,
    gap: 20,
  },
])

export const editingHeaderContent = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  { flex: 1, gap: 12 },
])

// ── Shared product card elements ─────────────────────────────────────────────

export const radioIndicator = style({
  width: 16,
  height: 16,
  borderRadius: 9999,
  flexShrink: 0,
  border: `1px solid ${themeVars.border.colour.colour1}`,
  background: themeVars.backgroundColour.background1,
  boxSizing: 'border-box',
})

export const radioIndicatorSelected = style({
  border: `5px solid ${themeVars.semanticColour.text.brandDefault}`,
})

export const nameRow = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: 12 },
])

export const nameText = style([
  text({ font: 'body1' }),
  { color: themeVars.semanticColour.text.brandDefault },
])

export const descWrapper = style({
  paddingLeft: 28,
})

export const descText = style([
  text({ font: 'body2' }),
  { color: themeVars.semanticColour.text.brandSecondary },
])

export const tagsList = style([
  sprinkles({ display: 'flex', flexWrap: 'wrap' }),
  { gap: 4 },
])

export const tag = style([
  text({ font: 'body2' }),
  {
    background: themeVars.colourPalette.cyanotype15,
    borderRadius: 2,
    padding: '4px 8px',
    color: themeVars.semanticColour.text.brandSecondary,
    whiteSpace: 'nowrap',
  },
])

export const priceRow = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: 16, minHeight: 32 },
])

export const priceText = style([
  text({ font: 'body1' }),
  { color: themeVars.semanticColour.text.brandDefault },
])

export const productImage = style({
  width: 124,
  height: 124,
  flexShrink: 0,
  borderRadius: 2,
  background: themeVars.backgroundColour.background0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 48,
  overflow: 'hidden',
})

// ── Config / Upgrade sections ────────────────────────────────────────────────

export const subSection = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  {
    borderTop: `1px solid ${themeVars.border.colour.colour1}`,
    padding: 20,
    gap: 12,
  },
])

export const subSectionTitleRow = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    gap: 4,
    width: '100%',
    justifyContent: 'flex-start',
  },
])

export const subSectionTitleText = style([
  text({ font: 'body1' }),
  { color: themeVars.semanticColour.text.brandDefault },
])

export const innerColumn = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  { gap: 12, width: '100%' },
])

export const optionCard = style([
  sprinkles({ display: 'flex' }),
  {
    background: themeVars.backgroundColour.background1,
    border: `1px solid ${themeVars.border.colour.colour1}`,
    borderRadius: 2,
    padding: 20,
    cursor: 'pointer',
    gap: 20,
  },
])

export const optionCardSelected = style({
  border: `1px solid ${themeVars.semanticColour.button.primary.default}`,
})

export const optionCardContent = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  { flex: 1, gap: 12 },
])

export const optionCardContentNoGap = style({
  flex: 1,
})

export const checkboxIndicator = style({
  width: 16,
  height: 16,
  borderRadius: 1.6,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: themeVars.backgroundColour.background1,
  border: `0.8px solid ${themeVars.border.colour.colour1}`,
  boxSizing: 'border-box',
})

export const checkboxIndicatorChecked = style({
  background: themeVars.semanticColour.text.brandDefault,
  border: 'none',
})

// ── Confirm / action sections ────────────────────────────────────────────────

export const confirmSection = style([
  sprinkles({ display: 'flex', justifyContent: 'flex-end' }),
  {
    borderTop: `1px solid ${themeVars.border.colour.colour1}`,
    padding: 20,
  },
])

export const continueWrapper = style([
  sprinkles({ display: 'flex', justifyContent: 'flex-end' }),
  { paddingTop: 32 },
])

// ── Product selection list ───────────────────────────────────────────────────

export const categoryGroup = style({
  marginBottom: 24,
})

export const categoryTitle = style([
  text({ font: 'body1' }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    marginBottom: 12,
  },
])

export const categoryProducts = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  { gap: 12 },
])

export const selectableCard = style({
  background: themeVars.backgroundColour.background1,
  border: `1px solid ${themeVars.border.colour.colour1}`,
  borderRadius: 2,
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'background-color 0.12s ease, border-color 0.12s ease',
  selectors: {
    [`&:hover:not([data-disabled])`]: {
      background: themeVars.backgroundColour.background2,
      borderColor: themeVars.border.colour.colour2,
    },
  },
})

export const selectableCardSelected = style({
  border: `1px solid ${themeVars.border.colour.default}`,
  background: themeVars.backgroundColour.background1,
  selectors: {
    [`&:hover:not([data-disabled])`]: {
      background: themeVars.backgroundColour.background2,
      borderColor: themeVars.border.colour.default,
    },
  },
})

export const selectableCardDisabled = style({
  cursor: 'default',
  opacity: 0.5,
  pointerEvents: 'none',
})

export const selectableCardRow = style([
  sprinkles({ display: 'flex' }),
  { gap: 20, padding: 20 },
])

export const addedBadge = style([
  text({ font: 'body2', weight: 'medium' }),
  {
    fontSize: 10,
    color: '#2e7d5a',
    background: '#e6f4ed',
    padding: '2px 6px',
    borderRadius: 3,
    marginLeft: 6,
  },
])

export const inlineRecommendation = style({
  padding: 20,
  borderTop: `1px solid ${themeVars.border.colour.colour1}`,
})

// ── Right column ─────────────────────────────────────────────────────────────

export const rightColumn = style([
  sprinkles({ display: 'flex', flexDirection: 'column' }),
  {
    width: 420,
    flexShrink: 0,
    borderLeft: `1px solid ${themeVars.border.colour.colour1}`,
    background: themeVars.backgroundColour.background0,
    boxShadow: themeVars.shadows.md,
  },
])

export const rightColumnMobile = style({
  width: '100%',
  borderLeft: 'none',
  borderTop: `1px solid ${themeVars.border.colour.colour1}`,
  boxShadow: 'none',
})

// ── Pricing table inline helpers ─────────────────────────────────────────────

export const feeEditRow = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }),
  { gap: 4 },
])

export const feeUnitText = style([
  text({ font: 'body2' }),
  { color: themeVars.semanticColour.text.brandTertiary },
])

export const productMonthlyFeeField = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 2,
  background: themeVars.backgroundColour.background1,
  border: `1px solid ${themeVars.border.colour.colour1}`,
  borderRadius: 2,
  minHeight: 28,
  padding: '6px 8px',
  boxSizing: 'border-box',
})

export const productMonthlyFeePrefix = style([
  text({ font: 'body1' }),
  { color: themeVars.semanticColour.text.brandSecondary, flexShrink: 0 },
])

export const productMonthlyFeeInput = style({
  width: '4rem',
  textAlign: 'right' as const,
})

export const pricingReadonlyInputText = style([
  text({ font: 'body1' }),
  {
    color: themeVars.semanticColour.text.brandDefault,
    flex: 1,
    minWidth: 0,
    textAlign: 'right' as const,
  },
])

export const noProductsText = style({
  color: themeVars.colourPalette.cyanotype40,
})

export const rateEditRow = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }),
  { gap: 8 },
])

export const estFeeLabel = style({
  color: themeVars.semanticColour.text.brandSecondary,
})

export const estFeeHint = style({
  color: themeVars.semanticColour.text.brandTertiary,
})

export const estFeeValue = style({
  color: themeVars.semanticColour.text.brandSecondary,
})

export const pricingHeaderBorder = style({
  borderBottom: `1px solid ${themeVars.border.colour.colour1}`,
})

export const radioShrink = style({
  marginTop: 2,
  flexShrink: 0,
})
