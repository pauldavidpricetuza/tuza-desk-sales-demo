import { style } from '@vanilla-extract/css'
import { themeVars } from '#theme/theme.css.js'
import { text } from '#theme/typography.css.js'

export const wrap = style([
  text({ font: 'body2' }),
  {
    width: '100%',
    boxSizing: 'border-box',
    padding: `${themeVars.spacing['spacing-3']} ${themeVars.spacing['spacing-4']}`,
    background: themeVars.backgroundColour.background2,
    borderBottom: `${themeVars.border.width.default} solid ${themeVars.border.colour.colour1}`,
    display: 'flex',
    flexDirection: 'column',
    gap: themeVars.spacing['spacing-2'],
  },
])

export const row = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: themeVars.spacing['spacing-2'],
})

export const status = style([
  text({ font: 'body2' }),
  { color: themeVars.semanticColour.text.brandSecondary, margin: 0 },
])

export const hint = style([
  text({ font: 'body2' }),
  { color: themeVars.semanticColour.text.brandTertiary, margin: 0 },
])

export const errorText = style([
  text({ font: 'body2' }),
  { color: themeVars.semanticColour.text.error, margin: 0 },
])
