import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircleIcon, XIcon } from '@phosphor-icons/react'

export type DemoVersion = 'v0' | 'v1'

interface VersionOption {
  id: DemoVersion
  label: string
  description: string
  badge: string
}

const VERSION_OPTIONS: VersionOption[] = [
  {
    id: 'v0',
    label: 'Desk Sales Demo',
    description: 'Original application flow with standard step-by-step navigation.',
    badge: 'V0',
  },
  {
    id: 'v1',
    label: 'Desk Sales Demo',
    description: 'Revised application flow with updated navigation structure.',
    badge: 'V1',
  },
]

interface VersionSwitcherModalProps {
  selectedVersion: DemoVersion
  onSelect: (version: DemoVersion) => void
  onClose: () => void
}

export function VersionSwitcherModal({ selectedVersion, onSelect, onClose }: VersionSwitcherModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(6,35,81,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 8px 40px rgba(6,35,81,0.18)',
          width: 480,
          padding: '28px 28px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 16, fontFamily: "'Denim-Medium', sans-serif", color: '#062351', letterSpacing: '0.16px' }}>
              Switch version
            </div>
            <div style={{ fontSize: 13, fontFamily: "'Denim-Regular', sans-serif", color: '#667085', marginTop: 2 }}>
              Select a prototype version to view
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              color: '#667085', display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: 6,
              padding: 0,
            }}
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Version cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {VERSION_OPTIONS.map((opt) => {
            const isSelected = opt.id === selectedVersion
            return (
              <button
                key={opt.id}
                onClick={() => { onSelect(opt.id); onClose() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  border: isSelected ? '2px solid #062351' : '2px solid #e4e7ec',
                  borderRadius: 10,
                  background: isSelected ? 'rgba(6,35,81,0.03)' : '#fff',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
              >
                {/* Badge */}
                <div style={{
                  width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                  background: isSelected ? '#062351' : '#f2f4f7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontFamily: "'Denim-Medium', sans-serif",
                  color: isSelected ? '#fff' : '#667085',
                  letterSpacing: '0.5px',
                }}>
                  {opt.badge}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontFamily: "'Denim-Medium', sans-serif", color: '#062351', letterSpacing: '0.13px' }}>
                      {opt.badge} — {opt.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, fontFamily: "'Denim-Regular', sans-serif", color: '#667085', marginTop: 2, letterSpacing: '0.24px' }}>
                    {opt.description}
                  </div>
                </div>

                {/* Check */}
                {isSelected && (
                  <CheckCircleIcon size={20} color="#062351" weight="fill" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}
