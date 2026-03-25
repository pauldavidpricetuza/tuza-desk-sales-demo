import { style } from '@vanilla-extract/css'
import { backgroundColour } from '../theme/colour'
import { border } from '../theme/border'
import { fonts } from '../theme/typography.css'

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(6, 35, 81, 0.5)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  zIndex: 200,
  paddingTop: 84,
  paddingBottom: 84,
})

export const modalPanel = style({
  backgroundColor: '#ffffff',
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  boxShadow: '0px 1px 7px 0px rgba(9, 56, 130, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 80px)',
  maxWidth: 1361,
  maxHeight: 'calc(100vh - 168px)',
  overflow: 'hidden',
})

export const header = style({
  height: 60,
  padding: '0 32px',
  borderBottom: `1px solid ${border.colour.colour1}`,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
})

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 32px',
  height: 67,
  borderBottom: `1px solid ${border.colour.colour1}`,
  backgroundColor: backgroundColour.background0,
  flexShrink: 0,
})

export const filterButton = style({
  ...fonts.body1,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '7px 13px',
  height: 34,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  backgroundColor: backgroundColour.background2,
  cursor: 'pointer',
  color: '#4367a2',
  ':hover': {
    backgroundColor: backgroundColour.background1,
  },
})

export const searchButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 34,
  height: 34,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  backgroundColor: backgroundColour.background2,
  cursor: 'pointer',
  color: '#4367a2',
  ':hover': {
    backgroundColor: backgroundColour.background1,
  },
})

export const tableSection = style({
  padding: '16px 32px 0',
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
})

export const tableBorder = style({
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 2,
  overflow: 'hidden',
  flex: 1,
  overflowY: 'auto',
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
})

export const tableHead = style({
  position: 'sticky',
  top: 0,
  zIndex: 1,
})

export const th = style({
  ...fonts.label1,
  padding: '7px 12px',
  textAlign: 'left',
  color: '#062351',
  backgroundColor: '#eef1f6',
  borderBottom: `1px solid ${border.colour.colour1}`,
  whiteSpace: 'nowrap',
})

export const tr = style({
  cursor: 'pointer',
  height: 41,
  ':hover': {
    filter: 'brightness(0.97)',
  },
})

export const trSelected = style({
  cursor: 'pointer',
  height: 41,
  backgroundColor: '#ffffff',
})

const cellBase = {
  ...fonts.body2,
  padding: '10px 12px',
  whiteSpace: 'nowrap' as const,
  borderBottom: `1px solid ${border.colour.colour1}`,
}

export const td = style({
  ...cellBase,
  color: '#4367a2',
})

export const tdPrimary = style({
  ...cellBase,
  color: '#062351',
})

export const tdFirstSelected = style({
  borderLeft: '3px solid #E07B39',
})

export const muted = style({
  ...fonts.body2,
  color: '#96aacb',
})

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 16,
  padding: '16px 20px',
  borderTop: `1px solid ${border.colour.colour1}`,
  backgroundColor: backgroundColour.background0,
  flexShrink: 0,
})
