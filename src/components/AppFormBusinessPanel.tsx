import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CaretDownIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { DatePicker } from './DatePicker'
import { Button } from '#ui/Button/Button'
import { SectionTitle } from './SectionTitle'
import {
  panelWrapper,
  panelWrapperOpen,
  panel,
  panelHeader,
  panelHeaderTitle,
  panelHeaderTitleAccent,
  panelContent,
  panelFooter,
  fieldInput,
  fieldSelect,
  sectionTitleRow,
  sectionTitleLeft,
} from './BusinessInfoPanel.css'
import {
  radioGroup,
  radioOption,
  radioOptionSelected,
  radioCircle,
  radioCircleSelected,
  radioCircleDot,
  radioLabel,
  formSectionFirst,
  formSectionDivided,
  fieldRow,
  fieldQuestion,
  fieldQuestionOptional,
  fieldHintBlue,
  fieldHintGrey,
  hintLink,
  conditionalBlock,
} from './AppFormBusinessPanel.css'

// ─── Address search ────────────────────────────────────────────────────────────

const ADDRESS_POOL = [
  '10 City Road, London, EC1Y 2AG',
  '22 Baker Street, London, W1U 3BT',
  '1 Canada Square, Canary Wharf, London, E14 5AB',
  '5 Victoria Street, Westminster, London, SW1H 0ET',
  '14 Oxford Street, London, W1D 1AN',
  '100 Euston Road, London, NW1 2DB',
  '25 Cannon Street, London, EC4M 5TA',
  '18 Baltic Place, Lanarkshire, Glasgow, G40 3EG',
  '8 King Street, Manchester, M2 6AQ',
  '3 Deansgate, Manchester, M3 4EN',
  '7 Cross Street, Manchester, M2 1WJ',
  '30 Wellington Street, Leeds, LS1 2DE',
  '2 Bridgewater Place, Leeds, LS1 4AP',
  '20 Park Row, Leeds, LS1 5JF',
  '15 Castle Street, Edinburgh, EH2 3AT',
  '45 George Street, Edinburgh, EH2 2HT',
  '7 Buchanan Street, Glasgow, G1 3HL',
  '6 Broad Street, Birmingham, B1 2HF',
  '33 Colmore Row, Birmingham, B3 2BS',
  '11 Temple Way, Bristol, BS2 0BQ',
  '4 Harbourside, Bristol, BS1 5TR',
  '19 Grey Street, Newcastle upon Tyne, NE1 6EE',
  '12 High Street, Oxford, OX1 4BZ',
  '9 St Andrews Street, Cambridge, CB2 3AX',
  '50 Kings Road, Brighton, BN1 1NA',
  '77 Talbot Street, Cardiff, CF10 1JE',
  '3 Millennium Plaza, Cardiff, CF10 2WF',
  '21 Botanic Avenue, Belfast, BT7 1JG',
  '6 Donegall Square, Belfast, BT1 5GB',
  '88 Commercial Road, Southampton, SO15 1GE',
]

function matchAddresses(query: string): string[] {
  if (!query || query.length < 2) return ADDRESS_POOL.slice(0, 6)
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const scored = ADDRESS_POOL.map(addr => {
    const lower = addr.toLowerCase()
    const score = words.reduce((s, w) => s + (lower.includes(w) ? 1 : 0), 0)
    return { addr, score }
  })
  const matches = scored.filter(x => x.score > 0).sort((a, b) => b.score - a.score)
  return matches.length > 0 ? matches.slice(0, 6).map(x => x.addr) : ADDRESS_POOL.slice(0, 6)
}

function AddressSearch({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [query, setQuery] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = matchAddresses(query)

  useEffect(() => {
    if (!isOpen) return
    function onDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        const cal = document.getElementById('addr-dropdown')
        if (cal && cal.contains(e.target as Node)) return
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [isOpen])

  function openWithPos() {
    if (inputRef.current) {
      const r = inputRef.current.getBoundingClientRect()
      setPos({ top: r.bottom + 2, left: r.left, width: r.width })
    }
    setIsOpen(true)
  }

  function handleSelect(addr: string) {
    setQuery(addr)
    onChange(addr)
    setIsOpen(false)
  }

  function handleChange(v: string) {
    setQuery(v)
    onChange(v)
    openWithPos()
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <MagnifyingGlassIcon
          size={14}
          color="#9aa5b8"
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        />
        <input
          ref={inputRef}
          className={fieldInput}
          type="text"
          value={query}
          placeholder={placeholder ?? 'Start typing to search…'}
          style={{ paddingLeft: 32 }}
          onChange={e => handleChange(e.target.value)}
          onFocus={openWithPos}
        />
      </div>

      {isOpen && results.length > 0 && createPortal(
        <div
          id="addr-dropdown"
          style={{
            position: 'fixed', top: pos.top, left: pos.left, width: pos.width,
            zIndex: 9999, backgroundColor: '#fff',
            border: '1px solid #dce3ed', borderRadius: 6,
            boxShadow: '0 8px 24px rgba(6,35,81,0.12)',
            overflow: 'hidden',
          }}
        >
          {results.map((addr, i) => (
            <div
              key={addr}
              onMouseDown={e => { e.preventDefault(); handleSelect(addr) }}
              style={{
                padding: '10px 14px',
                fontSize: 13,
                color: '#062351',
                cursor: 'pointer',
                borderTop: i > 0 ? '1px solid #f0f4fa' : 'none',
                backgroundColor: '#fff',
                transition: 'background-color 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f5f7fa')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              {addr}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}


interface RadioGroupProps {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}

function RadioGroup({ value, onChange, options }: RadioGroupProps) {
  return (
    <div className={radioGroup}>
      {options.map((opt, i) => {
        const isSelected = value === opt.value
        const isFirst = i === 0
        const isLast = i === options.length - 1
        return (
          <button
            key={opt.value}
            type="button"
            className={`${radioOption}${isSelected ? ` ${radioOptionSelected}` : ''}`}
            style={{
              ...(isFirst ? { borderRadius: '4px 0 0 4px' } : {}),
              ...(isLast ? { borderRight: `1px solid ${isSelected ? '#4367a2' : '#dce3ed'}`, borderRadius: '0 4px 4px 0' } : {}),
            }}
            onClick={() => onChange(opt.value)}
          >
            <div className={`${radioCircle}${isSelected ? ` ${radioCircleSelected}` : ''}`}>
              {isSelected && <div className={radioCircleDot} />}
            </div>
            <span className={radioLabel}>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

interface AppFormBusinessPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  merchantName?: string
  initialBusinessType?: string
  initialPhone?: string
}

const BUSINESS_TYPES = [
  'Private limited company (Ltd)',
  'Public limited company (PLC)',
  'Limited liability partnership (LLP)',
  'General partnership',
  'Limited partnership',
  'Sole trader',
  'Community interest company (CIC)',
  'Charitable incorporated organisation (CIO)',
  'Co-operative society',
  'Other',
]

export function AppFormBusinessPanel({
  isOpen,
  onClose,
  onComplete,
  merchantName,
  initialBusinessType = '',
  initialPhone = '',
}: AppFormBusinessPanelProps) {
  // Business details
  const [businessType, setBusinessType] = useState(initialBusinessType)
  const [regDate, setRegDate] = useState('')
  const [regName, setRegName] = useState(merchantName ?? '')

  // Trading name
  const [tradingNameDifferent, setTradingNameDifferent] = useState('')
  const [tradingName, setTradingName] = useState('')

  // Registered address
  const [regAddress, setRegAddress] = useState('')

  // Trading address
  const [tradingAddress, setTradingAddress] = useState('')
  const [tradeAddressLine1, setTradeAddressLine1] = useState('')

  // VAT
  const [vatNumber, setVatNumber] = useState('')

  // Phone
  const [businessPhone, setBusinessPhone] = useState(initialPhone)
  const [csPhone, setCsPhone] = useState('')

  // Website
  const [website, setWebsite] = useState('')

  const isComplete =
    businessType !== '' &&
    regDate !== '' &&
    regName.trim() !== '' &&
    tradingNameDifferent !== '' &&
    (tradingNameDifferent === 'no' || tradingName.trim() !== '') &&
    regAddress.trim() !== '' &&
    tradingAddress !== '' &&
    (tradingAddress === 'same' || tradeAddressLine1.trim() !== '') &&
    businessPhone.trim() !== ''

  return (
    <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
      <div className={panel}>

        <div className={panelContent}>

        <div className={panelHeader}>
          <span className={panelHeaderTitle}>
            <span className={panelHeaderTitleAccent}>Application Form:</span> Business Information
          </span>
        </div>

          {/* ── 1. Business details ───────────────────────────────────── */}
          <div className={formSectionFirst}>
            <SectionTitle>Business details</SectionTitle>

            <div className={fieldRow}>
              <label className={fieldQuestion}>What is the business type?</label>
              <select
                className={fieldSelect}
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
              >
                <option value="">Select business type</option>
                {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className={fieldRow}>
              <label className={fieldQuestion}>
                When was the business registered with Companies House?
              </label>
              <DatePicker value={regDate} onChange={setRegDate} />
            </div>

            <div className={fieldRow}>
              <label className={fieldQuestion}>
                What is the name of the business as it's registered with Companies House?
              </label>
              <input
                className={fieldInput}
                type="text"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                placeholder="e.g. Rosy's Pizzas Ltd"
              />
            </div>
          </div>

          {/* ── 2. Trading name ───────────────────────────────────────── */}
          <div className={formSectionDivided}>
            <SectionTitle>Trading name</SectionTitle>

            <div className={fieldRow}>
              <label className={fieldQuestion}>
                Is your trading name different to the merchant's legal name?
              </label>
              <RadioGroup
                value={tradingNameDifferent}
                onChange={setTradingNameDifferent}
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              />
              {tradingNameDifferent === 'yes' && (
                <div className={conditionalBlock}>
                  <label className={fieldQuestion}>What is the trading name of the business?</label>
                  <input
                    className={fieldInput}
                    type="text"
                    value={tradingName}
                    onChange={e => setTradingName(e.target.value)}
                    placeholder="e.g. Tuza"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── 3. Registered address ─────────────────────────────────── */}
          <div className={formSectionDivided}>
            <SectionTitle>Registered address</SectionTitle>

            <div className={fieldRow}>
              <label className={fieldQuestion}>What is the registered address of the business?</label>
              <AddressSearch
                value={regAddress}
                onChange={setRegAddress}
                placeholder="Start typing to search…"
              />
              <span className={fieldHintBlue}>
                This is the address the business is registered with on Companies House
              </span>
            </div>
          </div>

          {/* ── 4. Trading address ────────────────────────────────────── */}
          <div className={formSectionDivided}>
            <SectionTitle>Trading address</SectionTitle>
            <p style={{ margin: 0, fontSize: 13, color: '#062351', opacity: 0.65, lineHeight: '18px' }}>
              This is the address where the merchant operates their business from.
            </p>

            <div className={fieldRow}>
              <label className={fieldQuestion}>What is the trading address of the business?</label>
              <RadioGroup
                value={tradingAddress}
                onChange={setTradingAddress}
                options={[
                  { value: 'same', label: 'Same as registered address' },
                  { value: 'another', label: 'Another address' },
                ]}
              />
              {tradingAddress === 'another' && (
                <div className={conditionalBlock}>
                  <AddressSearch
                    value={tradeAddressLine1}
                    onChange={setTradeAddressLine1}
                    placeholder="Start typing to search…"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── 5. VAT number ─────────────────────────────────────────── */}
          <div className={formSectionDivided}>
            <SectionTitle>VAT number</SectionTitle>

            <div className={fieldRow}>
              <label className={fieldQuestion}>
                What is the business's VAT number?{' '}
                <span className={fieldQuestionOptional}>(optional)</span>
              </label>
              <input
                className={fieldInput}
                type="text"
                value={vatNumber}
                onChange={e => setVatNumber(e.target.value)}
                placeholder="e.g. 123456789"
              />
              <span className={fieldHintBlue}>
                This is the 9-digit number that comes after 'GB' in the VAT number
              </span>
            </div>
          </div>

          {/* ── 6. Phone number ───────────────────────────────────────── */}
          <div className={formSectionDivided}>
            <SectionTitle>Phone number</SectionTitle>

            <div className={fieldRow}>
              <label className={fieldQuestion}>What is the business's phone number?</label>
              <input
                className={fieldInput}
                type="tel"
                value={businessPhone}
                onChange={e => setBusinessPhone(e.target.value)}
                placeholder="e.g. 07700 900000"
              />
            </div>

            <div className={fieldRow}>
              <label className={fieldQuestion}>
                What is the customer service phone number?{' '}
                <span className={fieldQuestionOptional}>(optional)</span>
              </label>
              <input
                className={fieldInput}
                type="tel"
                value={csPhone}
                onChange={e => setCsPhone(e.target.value)}
                placeholder="e.g. 07700 900001"
              />
            </div>
          </div>

          {/* ── 7. Website ────────────────────────────────────────────── */}
          <div className={formSectionDivided}>
            <SectionTitle>Website</SectionTitle>

            <div className={fieldRow}>
              <label className={fieldQuestion}>What is the business's website?</label>
              <input
                className={fieldInput}
                type="url"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="e.g. www.example.com"
              />
              <span className={fieldHintGrey}>
                Provide the website in the format of www.example.com
              </span>
            </div>
          </div>

        </div>

        <div className={panelFooter}>
          <Button variant="secondary" onClick={onClose}>Save &amp; close</Button>
          <Button onClick={onComplete} isDisabled={!isComplete}>Complete section</Button>
        </div>

      </div>
    </div>
  )
}
