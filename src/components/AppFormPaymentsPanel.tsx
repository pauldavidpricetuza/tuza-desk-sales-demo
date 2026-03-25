import { useState } from 'react'
import { CheckCircleIcon } from '@phosphor-icons/react'
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
} from './BusinessInfoPanel.css'
import {
  formSectionFirst,
  formSectionDivided,
  fieldRow,
  fieldQuestion,
  fieldHintBlue,
} from './AppFormBusinessPanel.css'

// ─── Design tokens ─────────────────────────────────────────────────────────────

const NAVY = '#062351'
const BLUE = '#4367a2'
const BORDER = '#d5ddea'
const BG1 = '#fbfcfd'

// ─── MCC data ──────────────────────────────────────────────────────────────────

const MCC_LIST = [
  { code: '0742', label: 'Veterinary Services' },
  { code: '1731', label: 'Electrical Contractors' },
  { code: '5812', label: 'Eating Places, Restaurants' },
  { code: '5813', label: 'Drinking Places' },
  { code: '5912', label: 'Drug Stores and Pharmacies' },
  { code: '5992', label: 'Florists' },
  { code: '6282', label: 'Investment Advisory Services' },
  { code: '7011', label: 'Hotels, Motels and Resorts' },
  { code: '7322', label: 'Adjusted and Collection Agencies' },
  { code: '7361', label: 'Help Supply Services' },
  { code: '7941', label: 'Athletic Fields, Sports Clubs' },
  { code: '7929', label: 'Bands, Orchestras, Entertainers' },
  { code: '7999', label: 'Recreation Services' },
  { code: '8021', label: 'Dentists, Orthodontists' },
  { code: '8099', label: 'Health Practitioners' },
  { code: '8299', label: 'Schools and Educational Services' },
  { code: '10472', label: 'Bakery' },
]

// ─── Shared helpers ─────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: string }) {
  return (
    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 400, lineHeight: '14px', letterSpacing: '0.8px', textTransform: 'uppercase', color: NAVY, display: 'block', marginBottom: 4 }}>
      {children}
    </label>
  )
}

/** Currency input with £ prefix and green check when filled */
function CurrencyInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 2, backgroundColor: BG1, padding: '6px 8px', gap: 2, minHeight: 38 }}>
      <span style={{ fontSize: 14, color: BLUE, flexShrink: 0 }}>£</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: NAVY, letterSpacing: '0.42px', paddingRight: value ? 24 : 0 }}
      />
      {value && (
        <span style={{ flexShrink: 0, display: 'flex' }}>
          <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
        </span>
      )}
    </div>
  )
}

/** Percentage input with % suffix and green check when filled */
function PercentInput({ value, onChange, label }: { value: string; onChange: (v: string) => void; label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 2, backgroundColor: BG1, padding: '6px 8px', gap: 8, minHeight: 38 }}>
        <input
          type="number"
          min={0} max={100}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: NAVY, letterSpacing: '0.42px', minWidth: 0 }}
        />
        <span style={{ fontSize: 14, color: BLUE, flexShrink: 0 }}>%</span>
        {value && (
          <span style={{ flexShrink: 0, display: 'flex' }}>
            <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
          </span>
        )}
      </div>
    </div>
  )
}

/** Yes / No radio pair */
function YesNoField({ label, value, onChange }: { label: string; value: boolean | null; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', width: '100%' }}>
      {/* Yes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <FieldLabel>{label}</FieldLabel>
        <button
          type="button"
          onClick={() => onChange(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '6px 8px', border: `1px solid ${value === true ? BLUE : BORDER}`,
            borderRadius: 2, backgroundColor: value === true ? '#f5f7fa' : BG1,
            cursor: 'pointer', minHeight: 38, width: '100%',
          }}
        >
          <span style={{
            width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${value === true ? NAVY : '#c5cdd9'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {value === true && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: NAVY }} />}
          </span>
          <span style={{ fontSize: 14, color: NAVY, letterSpacing: '0.42px' }}>Yes</span>
        </button>
      </div>
      {/* No */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <span style={{ display: 'block', height: 18 }} /> {/* spacer to align with label */}
        <button
          type="button"
          onClick={() => onChange(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '6px 8px', border: `1px solid ${value === false ? BLUE : BORDER}`,
            borderRadius: 2, backgroundColor: value === false ? '#f5f7fa' : BG1,
            cursor: 'pointer', minHeight: 38, width: '100%',
          }}
        >
          <span style={{
            width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${value === false ? NAVY : '#c5cdd9'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {value === false && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: NAVY }} />}
          </span>
          <span style={{ fontSize: 14, color: NAVY, letterSpacing: '0.42px' }}>No</span>
        </button>
      </div>
    </div>
  )
}

// ─── Panel ──────────────────────────────────────────────────────────────────────

interface AppFormPaymentsPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  initialMcc?: string
}

export function AppFormPaymentsPanel({ isOpen, onClose, onComplete, initialMcc }: AppFormPaymentsPanelProps) {
  // ── Merchant category code ──
  const [mcc, setMcc] = useState(initialMcc ?? '')

  // ── Goods and services ──
  const [goodsDesc, setGoodsDesc] = useState('')
  const MAX_GOODS = 500

  // ── Business and card turnover ──
  const [bizTurnover, setBizTurnover] = useState('')
  const [cardTurnover, setCardTurnover] = useState('')
  const [avgTransaction, setAvgTransaction] = useState('')
  const [debitPct, setDebitPct] = useState('')
  const [creditPct, setCreditPct] = useState('')

  // ── Card payments ──
  const [inPerson, setInPerson] = useState<boolean | null>(null)
  const [online, setOnline] = useState<boolean | null>(null)
  const [phoneMail, setPhoneMail] = useState<boolean | null>(null)
  const [cnpPct, setCnpPct] = useState('')

  const showCnpPct = online === true || phoneMail === true

  const canComplete =
    mcc !== '' &&
    goodsDesc.trim() !== '' &&
    bizTurnover !== '' &&
    cardTurnover !== '' &&
    avgTransaction !== '' &&
    debitPct !== '' &&
    creditPct !== '' &&
    inPerson !== null &&
    online !== null &&
    phoneMail !== null &&
    (!showCnpPct || cnpPct !== '')

  return (
    <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
      <div className={panel}>

        {/* Title */}
        <div className={panelHeader}>
          <span className={panelHeaderTitle}>
            <span className={panelHeaderTitleAccent}>Application Form:</span> Payments
          </span>
        </div>

        <div className={panelContent}>

          {/* ── 1. Merchant category code ── */}
          <div className={formSectionFirst}>
            <SectionTitle>Merchant category code</SectionTitle>
            <div className={fieldRow}>
              <span className={fieldQuestion}>What is the business's merchant category code?</span>
              <div style={{ position: 'relative' }}>
                <select
                  className={fieldSelect}
                  value={mcc}
                  onChange={e => setMcc(e.target.value)}
                  style={{ paddingRight: mcc ? 56 : 32 }}
                >
                  <option value="">Select MCC…</option>
                  {MCC_LIST.map(m => (
                    <option key={m.code} value={m.code}>{m.code} – {m.label}</option>
                  ))}
                </select>
                {mcc && (
                  <span style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none' }}>
                    <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
                  </span>
                )}
              </div>
              <p className={fieldHintBlue}>
                The MCC has been automatically selected based on 'your business description'. You can change it if needed.
              </p>
            </div>
          </div>

          {/* ── 2. Goods and services ── */}
          <div className={formSectionDivided}>
            <SectionTitle>Goods and services</SectionTitle>
            <div className={fieldRow}>
              <span className={fieldQuestion}>Provide a 1-2 sentence description of the goods and services the business sells</span>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.8px', color: NAVY }}>Description</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#5475ab' }}>
                    {goodsDesc.length}/{MAX_GOODS}
                  </span>
                </div>
                <div style={{ position: 'relative', border: `1px solid ${BORDER}`, borderRadius: 2, backgroundColor: BG1, padding: '6px 8px 6px 8px' }}>
                  <textarea
                    value={goodsDesc}
                    onChange={e => setGoodsDesc(e.target.value.slice(0, MAX_GOODS))}
                    placeholder="e.g. They sell used car parts and accessories"
                    rows={3}
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', resize: 'vertical', fontSize: 14, color: NAVY, letterSpacing: '0.42px', paddingRight: goodsDesc ? 24 : 0, boxSizing: 'border-box' }}
                  />
                  {goodsDesc && (
                    <span style={{ position: 'absolute', right: 8, top: 8, display: 'flex', pointerEvents: 'none' }}>
                      <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. Business and card turnover ── */}
          <div className={formSectionDivided}>
            <SectionTitle>Business and card turnover</SectionTitle>

            <div className={fieldRow}>
              <span className={fieldQuestion}>What is the annual business turnover?</span>
              <CurrencyInput value={bizTurnover} onChange={setBizTurnover} placeholder="e.g. 200,000" />
            </div>

            <div className={fieldRow}>
              <span className={fieldQuestion}>What is the annual card turnover?</span>
              <CurrencyInput value={cardTurnover} onChange={setCardTurnover} placeholder="e.g. 100,000" />
            </div>

            <div className={fieldRow}>
              <span className={fieldQuestion}>What is your average transaction value?</span>
              <CurrencyInput value={avgTransaction} onChange={setAvgTransaction} placeholder="e.g. 20" />
            </div>

            <div className={fieldRow}>
              <span className={fieldQuestion}>What percentage of card payments are from debit and credit cards?</span>
              <div style={{ display: 'flex', gap: 20 }}>
                <PercentInput value={debitPct} onChange={setDebitPct} label="Debit cards" />
                <PercentInput value={creditPct} onChange={setCreditPct} label="Credit cards" />
              </div>
            </div>
          </div>

          {/* ── 4. Card payments ── */}
          <div className={formSectionDivided}>
            <SectionTitle>Card payments</SectionTitle>
            <span className={fieldQuestion}>How does the merchant want to accept card payments?</span>

            <YesNoField label="In person" value={inPerson} onChange={setInPerson} />
            <YesNoField label="Online" value={online} onChange={setOnline} />
            <YesNoField label="Over the phone or through mail" value={phoneMail} onChange={setPhoneMail} />

            {showCnpPct && (
              <div className={fieldRow}>
                <span className={fieldQuestion}>What percentage of card payments are taken online or over the phone?</span>
                <div style={{ display: 'flex', gap: 20 }}>
                  <PercentInput value={cnpPct} onChange={setCnpPct} />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className={panelFooter}>
          <Button variant="secondary" onClick={onClose}>Save &amp; close</Button>
          <Button onClick={onComplete} isDisabled={!canComplete}>Complete section</Button>
        </div>

      </div>
    </div>
  )
}
