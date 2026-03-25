import { useState } from 'react'
import { CheckCircleIcon, XIcon } from '@phosphor-icons/react'
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

// ─── Shared helpers ─────────────────────────────────────────────────────────────

/** Yes / No radio pair */
function YesNoField({
  question,
  value,
  onChange,
}: {
  question: string
  value: boolean | null
  onChange: (v: boolean) => void
}) {
  return (
    <div className={fieldRow}>
      <span className={fieldQuestion}>{question}</span>
      <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
        <RadioOption label="Yes" selected={value === true} onClick={() => onChange(true)} />
        <RadioOption label="No" selected={value === false} onClick={() => onChange(false)} />
      </div>
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

/** Input with a right-side suffix label (e.g. "%" or "days" or "months") and green check */
function SuffixInput({
  value,
  onChange,
  suffix,
  placeholder,
  type = 'number',
}: {
  value: string
  onChange: (v: string) => void
  suffix: string
  placeholder?: string
  type?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 2, backgroundColor: BG1, padding: '6px 8px', gap: 8, minHeight: 38 }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: NAVY, letterSpacing: '0.42px', minWidth: 0 }}
      />
      <span style={{ fontSize: 14, color: BLUE, flexShrink: 0, whiteSpace: 'nowrap' }}>{suffix}</span>
      {value && <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" style={{ flexShrink: 0 }} />}
    </div>
  )
}

/** Plain text input with green check */
function TextInput({
  value,
  onChange,
  placeholder,
  clearable,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  clearable?: boolean
}) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 2, backgroundColor: BG1, padding: '6px 8px', gap: 8, minHeight: 38 }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: NAVY, letterSpacing: '0.42px', minWidth: 0 }}
      />
      {clearable && value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 2, color: '#9aa5b8', flexShrink: 0 }}
        >
          <XIcon size={12} />
        </button>
      ) : value ? (
        <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" style={{ flexShrink: 0 }} />
      ) : null}
    </div>
  )
}

/** Currency input with £ prefix */
function CurrencyInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${BORDER}`, borderRadius: 2, backgroundColor: BG1, padding: '6px 8px', gap: 4, minHeight: 38 }}>
      <span style={{ fontSize: 14, color: BLUE, flexShrink: 0 }}>£</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: NAVY, letterSpacing: '0.42px', minWidth: 0 }}
      />
      {value && <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" style={{ flexShrink: 0 }} />}
    </div>
  )
}

// ─── Panel ──────────────────────────────────────────────────────────────────────

interface AppFormGoodsPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function AppFormGoodsPanel({ isOpen, onClose, onComplete }: AppFormGoodsPanelProps) {

  // ── 1. Deposits ──
  const [takesDeposits, setTakesDeposits] = useState<boolean | null>(null)
  const [depositPct, setDepositPct] = useState('')
  const [depositSizePct, setDepositSizePct] = useState('')
  const [depositAdvanceDays, setDepositAdvanceDays] = useState('')
  const [depositDeliveryDays, setDepositDeliveryDays] = useState('')

  // ── 2. Prepayments ──
  const [takesPrepayments, setTakesPrepayments] = useState<boolean | null>(null)
  const [prepaymentPct, setPrepaymentPct] = useState('')
  const [prepaymentAdvanceDays, setPrepaymentAdvanceDays] = useState('')

  // ── 3. Warranties ──
  const [hasWarranties, setHasWarranties] = useState<boolean | null>(null)
  const [warrantyTurnoverPct, setWarrantyTurnoverPct] = useState('')
  const [warrantyLengthMonths, setWarrantyLengthMonths] = useState('')
  const [warrantyReturnPct, setWarrantyReturnPct] = useState('')
  const [warrantyProvider, setWarrantyProvider] = useState('')

  // ── 4. Memberships / subscriptions ──
  const [hasMemberships, setHasMemberships] = useState<boolean | null>(null)
  const [membershipTurnoverPct, setMembershipTurnoverPct] = useState('')
  const [membershipLengthMonths, setMembershipLengthMonths] = useState('')
  const [membershipAvgCost, setMembershipAvgCost] = useState('')

  // ── 5. Location of stock ──
  const [stockSameAddress, setStockSameAddress] = useState<boolean | null>(null)
  const [stockAddress, setStockAddress] = useState('')

  // ── Validation ──
  const depositsOk = takesDeposits === false || (
    takesDeposits === true &&
    depositPct !== '' && depositSizePct !== '' &&
    depositAdvanceDays !== '' && depositDeliveryDays !== ''
  )
  const prepaymentsOk = takesPrepayments === false || (
    takesPrepayments === true &&
    prepaymentPct !== '' && prepaymentAdvanceDays !== ''
  )
  const warrantiesOk = hasWarranties === false || (
    hasWarranties === true &&
    warrantyTurnoverPct !== '' && warrantyLengthMonths !== '' &&
    warrantyReturnPct !== '' && warrantyProvider !== ''
  )
  const membershipsOk = hasMemberships === false || (
    hasMemberships === true &&
    membershipTurnoverPct !== '' && membershipLengthMonths !== '' && membershipAvgCost !== ''
  )
  const stockOk = stockSameAddress === true || (
    stockSameAddress === false && stockAddress !== ''
  )

  const allAnswered = takesDeposits !== null && takesPrepayments !== null && hasWarranties !== null && hasMemberships !== null && stockSameAddress !== null
  const canComplete = allAnswered && depositsOk && prepaymentsOk && warrantiesOk && membershipsOk && stockOk

  return (
    <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
      <div className={panel}>

        {/* Title */}
        <div className={panelHeader}>
          <span className={panelHeaderTitle}>
            <span className={panelHeaderTitleAccent}>Application Form:</span> Goods and services
          </span>
        </div>

        <div className={panelContent}>

          {/* ── 1. Deposits ── */}
          <div className={formSectionFirst}>
            <SectionTitle>Deposits</SectionTitle>

            <YesNoField
              question="Does the business take deposits before they supply goods and services?"
              value={takesDeposits}
              onChange={setTakesDeposits}
            />

            {takesDeposits === true && (
              <>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What percentage of goods or services require a deposit to be taken?</span>
                  <SuffixInput value={depositPct} onChange={setDepositPct} suffix="%" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What is the average size of a deposit taken, as a percentage of the size of the full payment?</span>
                  <SuffixInput value={depositSizePct} onChange={setDepositSizePct} suffix="%" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>How far in advance of full payment is the deposit taken?</span>
                  <SuffixInput value={depositAdvanceDays} onChange={setDepositAdvanceDays} suffix="days" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>How far in advance of the delivery of goods and services is the full payment taken?</span>
                  <SuffixInput value={depositDeliveryDays} onChange={setDepositDeliveryDays} suffix="days" />
                </div>
              </>
            )}
          </div>

          {/* ── 2. Prepayments ── */}
          <div className={formSectionDivided}>
            <SectionTitle>Prepayments</SectionTitle>

            <YesNoField
              question="Does the business accept full payment prior to the delivery of goods or services?"
              value={takesPrepayments}
              onChange={setTakesPrepayments}
            />

            {takesPrepayments === true && (
              <>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What percentage of goods or services does the business take full payment for prior to delivery?</span>
                  <SuffixInput value={prepaymentPct} onChange={setPrepaymentPct} suffix="%" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>How far in advance of the delivery of goods and services is full payment is taken?</span>
                  <SuffixInput value={prepaymentAdvanceDays} onChange={setPrepaymentAdvanceDays} suffix="days" />
                </div>
              </>
            )}
          </div>

          {/* ── 3. Warranties ── */}
          <div className={formSectionDivided}>
            <SectionTitle>Warranties</SectionTitle>

            <YesNoField
              question="Does the business charge for any guarantees or extended warranties?"
              value={hasWarranties}
              onChange={setHasWarranties}
            />

            {hasWarranties === true && (
              <>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What percentage of annual card turnover comes from guarantees or warranties?</span>
                  <SuffixInput value={warrantyTurnoverPct} onChange={setWarrantyTurnoverPct} suffix="%" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What is the average length of the guarantees or warranties sold?</span>
                  <SuffixInput value={warrantyLengthMonths} onChange={setWarrantyLengthMonths} suffix="months" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What percentage of goods or services sold are returned under guarantee or warranty?</span>
                  <SuffixInput value={warrantyReturnPct} onChange={setWarrantyReturnPct} suffix="%" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What third party provider is used for guarantees and warranties?</span>
                  <TextInput value={warrantyProvider} onChange={setWarrantyProvider} placeholder="e.g. Chinese Tonight Ltd" />
                </div>
              </>
            )}
          </div>

          {/* ── 4. Memberships, subscriptions and insurance premiums ── */}
          <div className={formSectionDivided}>
            <SectionTitle>Memberships, subscriptions and insurance premiums</SectionTitle>

            <YesNoField
              question="Does the business sell memberships, subscriptions or insurance premiums?"
              value={hasMemberships}
              onChange={setHasMemberships}
            />

            {hasMemberships === true && (
              <>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What percentage of annual card turnover comes from memberships, subscriptions or insurance premiums?</span>
                  <SuffixInput value={membershipTurnoverPct} onChange={setMembershipTurnoverPct} suffix="%" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What is the average length of membership, subscription or insurance premiums?</span>
                  <SuffixInput value={membershipLengthMonths} onChange={setMembershipLengthMonths} suffix="months" />
                </div>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What is the average cost of membership, subscription or insurance premiums?</span>
                  <CurrencyInput value={membershipAvgCost} onChange={setMembershipAvgCost} placeholder="e.g. 200" />
                </div>
              </>
            )}
          </div>

          {/* ── 5. Location of stock ── */}
          <div className={formSectionDivided}>
            <SectionTitle>Location of stock</SectionTitle>

            <YesNoField
              question="Is stock held at the same address as the trading address?"
              value={stockSameAddress}
              onChange={setStockSameAddress}
            />

            {stockSameAddress === false && (
              <>
                <div className={fieldRow}>
                  <span className={fieldQuestion}>What address is stock held at?</span>
                  <TextInput
                    value={stockAddress}
                    onChange={setStockAddress}
                    placeholder="e.g. 10 Baltic Place, Lanarkshire, Scotland, G40 3EG"
                    clearable
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStockAddress('')}
                  className={fieldHintBlue}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline', textAlign: 'left' }}
                >
                  Enter address manually
                </button>
              </>
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
