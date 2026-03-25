import { style } from '@vanilla-extract/css'
import { backgroundColour } from '../theme/colour'
import { border } from '../theme/border'

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
})

export const tableWrapper = style({
  flex: 1,
  overflow: 'auto',
  padding: '20px',
})

export const contextMenu = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  right: 0,
  zIndex: 100,
  backgroundColor: backgroundColour.background0,
  border: `1px solid ${border.colour.colour1}`,
  borderRadius: 4,
  boxShadow: '0px 1px 7px 0px rgba(9, 56, 130, 0.15)',
  width: 192,
  padding: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

export const contextMenuItem = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '4px 8px',
  border: 'none',
  background: 'none',
  borderRadius: 2,
  cursor: 'pointer',
  textAlign: 'left',
})

export const contextMenuItemHover = style({
  backgroundColor: backgroundColour.background2,
})
