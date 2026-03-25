import { useRef, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

export interface LogoOption {
  id: string
  url: string
  label: string
  sublabel: string
}

interface LogoPickerButtonProps {
  options: LogoOption[]
  selectedId: string
  onSelect: (id: string) => void
  size?: number
}

const LONG_PRESS_MS = 500

export function LogoPickerButton({ options, selectedId, onSelect, size = 20 }: LogoPickerButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)

  const selected = options.find(o => o.id === selectedId) ?? options[0]

  const openMenu = useCallback(() => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    setMenuPos({ top: rect.top, left: rect.right + 8 })
    setMenuOpen(true)
  }, [])

  function startPress() {
    didLongPress.current = false
    timerRef.current = setTimeout(() => {
      didLongPress.current = true
      openMenu()
    }, LONG_PRESS_MS)
  }

  function endPress() {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    function handleDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleDown)
    return () => document.removeEventListener('mousedown', handleDown)
  }, [menuOpen])

  return (
    <>
      <button
        ref={btnRef}
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          width: size,
          height: size,
        }}
        title="Hold to change logo"
      >
        <img
          src={selected.url}
          alt={selected.sublabel}
          style={{ width: size, height: size, borderRadius: 2, objectFit: 'cover', display: 'block' }}
        />
      </button>

      {menuOpen && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: menuPos.top,
            left: menuPos.left,
            zIndex: 9999,
            backgroundColor: '#fff',
            border: '1px solid #d5ddea',
            borderRadius: 6,
            boxShadow: '0 4px 16px rgba(9,56,130,0.14)',
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: 180,
          }}
        >
          <div style={{
            fontFamily: `'Space Mono', monospace`,
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            color: '#5475ab',
            padding: '4px 8px 6px',
          }}>
            Select logo
          </div>
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => { onSelect(opt.id); setMenuOpen(false) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 10px',
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: opt.id === selectedId ? '#eef1f6' : 'transparent',
                textAlign: 'left',
                width: '100%',
              }}
              onMouseEnter={e => { if (opt.id !== selectedId) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f5f7fa' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = opt.id === selectedId ? '#eef1f6' : 'transparent' }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: 4, flexShrink: 0,
                backgroundColor: '#f5f7fa',
                border: '1px solid #d5ddea',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <img src={opt.url} alt={opt.sublabel} style={{ width: 18, height: 18, objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <div style={{ fontFamily: `'Denim', sans-serif`, fontSize: 13, color: '#062351', fontWeight: opt.id === selectedId ? 500 : 400 }}>
                  {opt.label}
                </div>
                <div style={{ fontFamily: `'Denim', sans-serif`, fontSize: 12, color: '#4367a2' }}>
                  {opt.sublabel}
                </div>
              </div>
              {opt.id === selectedId && (
                <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#093882', flexShrink: 0 }} />
              )}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}
