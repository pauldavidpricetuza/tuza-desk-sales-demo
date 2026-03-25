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

// ─── Helpers ───────────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: string }) {
  return (
    <label style={{ display: 'block', fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 400, lineHeight: '14px', letterSpacing: '0.8px', textTransform: 'uppercase', color: NAVY, marginBottom: 4 }}>
      {children}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 2, backgroundColor: BG1, padding: '6px 8px', gap: 8, minHeight: 38 }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? 'Enter value'}
        style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: NAVY, letterSpacing: '0.42px', minWidth: 0 }}
      />
      {value && <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" style={{ flexShrink: 0 }} />}
    </div>
  )
}

function RadioOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: 12,
        padding: '6px 8px', minHeight: 38,
        border: `1px solid ${selected ? BLUE : BORDER}`,
        borderRadius: 2,
        backgroundColor: selected ? '#f5f7fa' : BG1,
        cursor: 'pointer',
      }}
    >
      <span style={{
        width: 16, height: 16, borderRadius: '50%',
        border: `1.5px solid ${selected ? NAVY : '#c5cdd9'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {selected && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: NAVY }} />}
      </span>
      <span style={{ fontSize: 14, color: NAVY, letterSpacing: '0.42px' }}>{label}</span>
    </button>
  )
}

/** Reusable 4-field bank account block */
function BankAccountFields({
  holderName, onHolderName,
  sortCode, onSortCode,
  accountNumber, onAccountNumber,
  bankName, onBankName,
}: {
  holderName: string; onHolderName: (v: string) => void
  sortCode: string; onSortCode: (v: string) => void
  accountNumber: string; onAccountNumber: (v: string) => void
  bankName: string; onBankName: (v: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <FieldLabel>Account holder name</FieldLabel>
        <TextInput value={holderName} onChange={onHolderName} placeholder="e.g. John Smith" />
      </div>
      <div>
        <FieldLabel>Sort code</FieldLabel>
        <TextInput value={sortCode} onChange={onSortCode} placeholder="e.g. 12-34-56" />
      </div>
      <div>
        <FieldLabel>Account number</FieldLabel>
        <TextInput value={accountNumber} onChange={onAccountNumber} placeholder="e.g. 12345678" />
      </div>
      <div>
        <FieldLabel>Bank name</FieldLabel>
        <TextInput value={bankName} onChange={onBankName} placeholder="e.g. Barclays" />
      </div>
    </div>
  )
}

// ─── Panel ──────────────────────────────────────────────────────────────────────

interface AppFormBankPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  initialEmail?: string
}

export function AppFormBankPanel({ isOpen, onClose, onComplete, initialEmail = '' }: AppFormBankPanelProps) {

  // ── Settlement account ──
  const [settleHolder, setSettleHolder] = useState('')
  const [settleSort, setSettleSort] = useState('')
  const [settleAccount, setSettleAccount] = useState('')
  const [settleBank, setSettleBank] = useState('')
  const [chargesSameAccount, setChargesSameAccount] = useState<boolean | null>(null)

  // ── Charges account (shown when chargesSameAccount === false) ──
  const [chargesHolder, setChargesHolder] = useState('')
  const [chargesSort, setChargesSort] = useState('')
  const [chargesAccount, setChargesAccount] = useState('')
  const [chargesBank, setChargesBank] = useState('')

  // ── Paperless direct debit ──
  const [paperlessDD, setPaperlessDD] = useState<boolean | null>(null)
  const [ddEmail, setDdEmail] = useState(initialEmail)

  // ── Validation ──
  const settlementOk =
    settleHolder !== '' && settleSort !== '' && settleAccount !== '' && settleBank !== '' && chargesSameAccount !== null

  const chargesOk =
    chargesSameAccount === true || (
      chargesSameAccount === false &&
      chargesHolder !== '' && chargesSort !== '' && chargesAccount !== '' && chargesBank !== ''
    )

  const ddOk =
    paperlessDD === false || (paperlessDD === true && ddEmail !== '')

  const canComplete = settlementOk && chargesOk && paperlessDD !== null && ddOk

  return (
    <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
      <div className={panel}>

        {/* Title */}
        <div className={panelHeader}>
          <span className={panelHeaderTitle}>
            <span className={panelHeaderTitleAccent}>Application Form:</span> Bank details
          </span>
        </div>

        <div className={panelContent}>

          {/* ── 1. Settlement bank account ── */}
          <div className={formSectionFirst}>
            <SectionTitle>Settlement bank account</SectionTitle>

            <BankAccountFields
              holderName={settleHolder} onHolderName={setSettleHolder}
              sortCode={settleSort} onSortCode={setSettleSort}
              accountNumber={settleAccount} onAccountNumber={setSettleAccount}
              bankName={settleBank} onBankName={setSettleBank}
            />

            <div className={fieldRow}>
              <span className={fieldQuestion}>Does the merchant want to pay your charges from the same account?</span>
              <div style={{ display: 'flex', gap: 16 }}>
                <RadioOption label="Yes" selected={chargesSameAccount === true} onClick={() => setChargesSameAccount(true)} />
                <RadioOption label="No" selected={chargesSameAccount === false} onClick={() => setChargesSameAccount(false)} />
              </div>
            </div>
          </div>

          {/* ── 2. Charges bank account (conditional) ── */}
          {chargesSameAccount === false && (
            <div className={formSectionDivided}>
              <SectionTitle>Charges bank account</SectionTitle>
              <BankAccountFields
                holderName={chargesHolder} onHolderName={setChargesHolder}
                sortCode={chargesSort} onSortCode={setChargesSort}
                accountNumber={chargesAccount} onAccountNumber={setChargesAccount}
                bankName={chargesBank} onBankName={setChargesBank}
              />
            </div>
          )}

          {/* ── 3. Paperless direct debit ── */}
          <div className={formSectionDivided}>
            <SectionTitle>Paperless direct debit</SectionTitle>

            <p style={{ margin: 0, fontSize: 14, color: NAVY, lineHeight: '20px', letterSpacing: '0.42px' }}>
              Paperless Direct Debit allows the merchant to set up a Direct Debit online without the need to complete and submit a paper mandate. If you choose 'Yes', we'll send the merchant an email with a link to set up their{' '}
              <span style={{ color: BLUE, textDecoration: 'underline', cursor: 'pointer' }}>Direct Debit</span>.
            </p>

            <div className={fieldRow}>
              <span className={fieldQuestion}>Would the merchant like to setup paperless Direct Debit?</span>
              <div style={{ display: 'flex', gap: 16 }}>
                <RadioOption label="Yes" selected={paperlessDD === true} onClick={() => setPaperlessDD(true)} />
                <RadioOption label="No" selected={paperlessDD === false} onClick={() => setPaperlessDD(false)} />
              </div>
            </div>

            {paperlessDD === true && (
              <div className={fieldRow}>
                <span className={fieldQuestion}>What email address shall we use for the merchant to setup paperless Direct Debit?</span>
                <TextInput
                  value={ddEmail}
                  onChange={setDdEmail}
                  placeholder="e.g. paul@tuza.ai"
                  type="email"
                />
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
