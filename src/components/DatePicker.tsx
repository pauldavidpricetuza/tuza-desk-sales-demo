import { CheckCircleIcon } from '@phosphor-icons/react'

// ─── Date parsing helper (used externally for 3-year address history check) ────

/** Parse DD/MM/YYYY string → Date, or null if invalid */
export function parseDateDisplay(s: string): Date | null {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!m) return null
  const [, d, mo, y] = m.map(Number)
  const date = new Date(y, mo - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null
  return date
}

// ─── Simple date input ──────────────────────────────────────────────────────────

interface DatePickerProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  id?: string
  showCheck?: boolean
}

export function DatePicker({ value, onChange, placeholder = 'DD/MM/YYYY', showCheck = true }: DatePickerProps) {
  const isValid = parseDateDisplay(value) !== null

  function handleChange(raw: string) {
    // Strip non-digits and slashes, then auto-insert slashes at positions 2 and 5
    let digits = raw.replace(/[^\d]/g, '')
    if (digits.length > 8) digits = digits.slice(0, 8)
    let out = ''
    if (digits.length <= 2) {
      out = digits
    } else if (digits.length <= 4) {
      out = digits.slice(0, 2) + '/' + digits.slice(2)
    } else {
      out = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4)
    }
    // If user is deleting a slash, remove the digit before it too
    if (raw.endsWith('/') && (raw.length === 2 || raw.length === 5)) {
      out = raw.slice(0, -1)
    }
    onChange(out)
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={e => handleChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          height: 36,
          padding: '0 32px 0 10px',
          border: '1px solid #d5ddea',
          borderRadius: 2,
          fontSize: 14,
          fontFamily: "'Denim-Regular', sans-serif",
          color: '#062351',
          background: '#fff',
          outline: 'none',
          letterSpacing: '0.42px',
        }}
      />
      {showCheck && isValid && (
        <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none' }}>
          <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
        </span>
      )}
    </div>
  )
}
