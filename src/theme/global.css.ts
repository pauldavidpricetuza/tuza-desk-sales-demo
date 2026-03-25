import { globalStyle } from '@vanilla-extract/css'
import { fonts } from './typography.css'

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

/** App default — makes `font-family: inherit` on nested controls resolve to Denim. */
globalStyle('body', {
  ...fonts.body1,
})

/**
 * Native form controls often ignore inherited font (UA stylesheet). Force the same
 * Denim body stack as `#theme` / Storybook `text({ font: "body1" })`.
 */
globalStyle('input, textarea, select, optgroup, option', {
  ...fonts.body1,
})

/** Unstyled `<button>` (e.g. radio cards) should match Denim, not the UA system font. */
globalStyle('button', {
  ...fonts.body1,
})
