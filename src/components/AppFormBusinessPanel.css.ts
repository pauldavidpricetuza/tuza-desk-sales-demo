import { style } from '@vanilla-extract/css'
import { border } from '../theme/border'
import { fonts } from '../theme/typography.css'

// ─── Radio / segmented control ───────────────────────────────────────────────

export const radioGroup = style({
  display: 'flex',
  width: '100%',
})

export const radioOption = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '9px 12px',
  border: `1px solid ${border.colour.colour1}`,
  borderRight: 'none',
  cursor: 'pointer',
  backgroundColor: '#ffffff',
  transition: 'background-color 0.12s, border-color 0.12s',
  selectors: {
    '&:first-child': {
      borderRadius: '4px 0 0 4px',
    },
    '&:last-child': {
      borderRight: `1px solid ${border.colour.colour1}`,
      borderRadius: '0 4px 4px 0',
    },
  },
})

export const radioOptionSelected = style({
  backgroundColor: '#f0f4fa',
  borderColor: '#4367a2',
  selectors: {
    '&:last-child': {
      borderColor: '#4367a2',
    },
  },
})

export const radioCircle = style({
  width: 16,
  height: 16,
  borderRadius: '50%',
  border: `1.5px solid #c5cdd9`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'border-color 0.12s',
})

export const radioCircleSelected = style({
  borderColor: '#4367a2',
})

export const radioCircleDot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#4367a2',
})

export const radioLabel = style({
  ...fonts.body2,
  color: '#062351',
})

// ─── Section containers ───────────────────────────────────────────────────────

export const formSectionFirst = style({
  padding: '24px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export const formSectionDivided = style({
  padding: '24px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  borderTop: `1px solid ${border.colour.colour1}`,
})

// ─── Section heading ──────────────────────────────────────────────────────────

export const sectionHeading = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  ...fonts.heading3,
  fontWeight: 500,
  color: '#062351',
  marginBottom: 4,
})

export const sectionHeadingIcon = style({
  color: '#4367a2',
  flexShrink: 0,
})

// ─── Field helpers ────────────────────────────────────────────────────────────

export const fieldRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
})

export const fieldQuestion = style({
  ...fonts.body2,
  color: '#062351',
})

export const fieldQuestionOptional = style({
  ...fonts.body2,
  color: '#4367a2',
  fontWeight: 400,
})

export const fieldHintBlue = style({
  ...fonts.body2,
  color: '#4367a2',
  marginTop: 4,
})

export const fieldHintGrey = style({
  ...fonts.body2,
  color: '#062351',
  opacity: 0.5,
  marginTop: 4,
})

export const hintLink = style({
  ...fonts.body2,
  color: '#4367a2',
  cursor: 'pointer',
  textDecoration: 'underline',
  background: 'none',
  border: 'none',
  padding: 0,
  marginTop: 4,
  display: 'inline-block',
})

export const conditionalBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  marginTop: 4,
})
