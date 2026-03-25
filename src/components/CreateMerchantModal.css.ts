import { style } from '@vanilla-extract/css'
import { sprinkles } from '../theme/sprinkles.css'
import { themeVars } from '../theme/theme.css'
import { border } from '../theme/border'
import { backgroundColour } from '../theme/colour'

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(6, 35, 81, 0.5)',
})

export const modalContainer = style({
  width: 581,
  backgroundColor: backgroundColour.background1,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: border.radius.m,
  boxShadow: '0px 1px 7px 0px rgba(9, 56, 130, 0.15)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
})

export const titleBar = style({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 24px',
  borderBottom: `1px solid ${border.colour.colour1}`,
  backgroundColor: backgroundColour.background0,
})

export const formBody = style({
  backgroundColor: backgroundColour.background2,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

export const footer = style({
  backgroundColor: backgroundColour.background0,
  borderTop: `1px solid ${border.colour.colour1}`,
  padding: '16px 20px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '16px',
  alignItems: 'center',
})
