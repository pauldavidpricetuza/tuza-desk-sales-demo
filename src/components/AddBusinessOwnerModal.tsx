import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircleIcon, TrashIcon, XIcon } from '@phosphor-icons/react'
import { DatePicker, parseDateDisplay } from './DatePicker'
import { SectionTitle } from './SectionTitle'
import { Button } from '#ui/Button/Button'
import {
  fieldInput,
  fieldSelect,
} from './BusinessInfoPanel.css'

const NAVY = '#062351'
const BLUE = '#4367a2'
const BORDER = '#d5ddea'

function FieldLabel({ children, optional }: { children: string; optional?: boolean }) {
  return (
    <label style={{ display: 'block', fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 400, lineHeight: '14px', letterSpacing: '0.8px', textTransform: 'uppercase', color: NAVY, marginBottom: 6 }}>
      {children}
      {optional && (
        <span style={{ fontFamily: 'inherit', textTransform: 'none', color: BLUE, marginLeft: 4, letterSpacing: 0 }}>(Optional)</span>
      )}
    </label>
  )
}

function ValidatedInput({ value, onChange, placeholder, type = 'text' }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        className={fieldInput}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingRight: value ? 32 : undefined }}
      />
      {value && (
        <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none' }}>
          <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
        </span>
      )}
    </div>
  )
}

function ValidatedSelect({ value, onChange, children }: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <div style={{ position: 'relative' }}>
      <select className={fieldSelect} value={value} onChange={e => onChange(e.target.value)} style={{ paddingRight: value ? 40 : undefined }}>
        {children}
      </select>
      {value && (
        <span style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none' }}>
          <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
        </span>
      )}
    </div>
  )
}

export interface OwnerAddress {
  line: string
  moveInDate: string
}

export interface BusinessOwner {
  id: string
  title: string
  firstName: string
  middleName: string
  lastName: string
  dob: string
  nationality: string
  ownershipPct: string
  position: string
  addresses: OwnerAddress[]
}

function hasThreeYearsHistory(addresses: OwnerAddress[]): boolean {
  const dates = addresses
    .map(a => parseDateDisplay(a.moveInDate))
    .filter((d): d is Date => d !== null)
  if (dates.length === 0) return false
  const earliest = new Date(Math.min(...dates.map(d => d.getTime())))
  const threeYearsAgo = new Date()
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3)
  return earliest <= threeYearsAgo
}

interface AddBusinessOwnerModalProps {
  initial?: BusinessOwner
  onSave: (o: BusinessOwner) => void
  onClose: () => void
}

export function AddBusinessOwnerModal({ initial, onSave, onClose }: AddBusinessOwnerModalProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [firstName, setFirstName] = useState(initial?.firstName ?? '')
  const [middleName, setMiddleName] = useState(initial?.middleName ?? '')
  const [lastName, setLastName] = useState(initial?.lastName ?? '')
  const [dob, setDob] = useState(initial?.dob ?? '')
  const [nationality, setNationality] = useState(initial?.nationality ?? '')
  const [ownershipPct, setOwnershipPct] = useState(initial?.ownershipPct ?? '')
  const [position, setPosition] = useState(initial?.position ?? '')
  const [addresses, setAddresses] = useState<OwnerAddress[]>(
    initial?.addresses ?? [{ line: '', moveInDate: '' }],
  )

  const enoughHistory = hasThreeYearsHistory(addresses)
  const canSave = !!(title && firstName && lastName && dob && nationality && ownershipPct && position && enoughHistory)

  function updateAddress(idx: number, field: keyof OwnerAddress, val: string) {
    setAddresses(prev => prev.map((a, i) => (i === idx ? { ...a, [field]: val } : a)))
  }

  function removeAddress(idx: number) {
    setAddresses(prev => prev.filter((_, i) => i !== idx))
  }

  function addAddress() {
    setAddresses(prev => [...prev, { line: '', moveInDate: '' }])
  }

  function handleSave() {
    if (!canSave) return
    onSave({
      id: initial?.id ?? `${Date.now()}`,
      title,
      firstName,
      middleName,
      lastName,
      dob,
      nationality,
      ownershipPct,
      position,
      addresses,
    })
  }

  const sectionDivStyle: React.CSSProperties = { paddingTop: 24, marginTop: 24, borderTop: `1px solid ${BORDER}` }
  const fieldSpacing: React.CSSProperties = { marginBottom: 16 }

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(6,35,81,0.4)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ backgroundColor: '#fff', borderRadius: 8, width: 620, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 16px 48px rgba(6,35,81,0.22)', display: 'flex', flexDirection: 'column', position: 'relative' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${BORDER}`, position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
          <span style={{ fontFamily: "'Denim-Medium', sans-serif", fontWeight: 500, fontSize: 18, letterSpacing: '-0.3px', color: NAVY }}>
            {initial ? 'Edit business owner' : 'Add business owner'}
          </span>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: NAVY, display: 'flex', padding: 4 }}>
            <XIcon size={16} />
          </button>
        </div>

        <div style={{ padding: 24 }}>

          <SectionTitle>Personal information</SectionTitle>

          <div style={fieldSpacing}>
            <FieldLabel>Title</FieldLabel>
            <ValidatedSelect value={title} onChange={setTitle}>
              <option value=""></option>
              {['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Rev'].map(t => <option key={t}>{t}</option>)}
            </ValidatedSelect>
          </div>

          <div style={fieldSpacing}>
            <FieldLabel>First name</FieldLabel>
            <ValidatedInput value={firstName} onChange={setFirstName} placeholder="e.g. Rosy" />
          </div>

          <div style={fieldSpacing}>
            <FieldLabel optional>Middle name</FieldLabel>
            <ValidatedInput value={middleName} onChange={setMiddleName} />
          </div>

          <div style={fieldSpacing}>
            <FieldLabel>Last name</FieldLabel>
            <ValidatedInput value={lastName} onChange={setLastName} placeholder="e.g. Marino" />
          </div>

          <div style={fieldSpacing}>
            <FieldLabel>Date of birth</FieldLabel>
            <DatePicker value={dob} onChange={setDob} />
          </div>

          <div>
            <FieldLabel>Nationality</FieldLabel>
            <ValidatedSelect value={nationality} onChange={setNationality}>
              <option value=""></option>
              {['British', 'Irish', 'American', 'Australian', 'Canadian', 'French', 'German', 'Italian', 'Spanish', 'Other'].map(n => (
                <option key={n}>{n}</option>
              ))}
            </ValidatedSelect>
          </div>

          <div style={sectionDivStyle}>
            <SectionTitle>Business Information</SectionTitle>

            <div style={fieldSpacing}>
              <FieldLabel>Ownership percentage</FieldLabel>
              <div style={{ position: 'relative' }}>
                <input
                  className={fieldInput}
                  type="number"
                  min={0}
                  max={100}
                  value={ownershipPct}
                  onChange={e => setOwnershipPct(e.target.value)}
                  placeholder="e.g. 25"
                  style={{ paddingRight: ownershipPct ? 52 : 28 }}
                />
                <span style={{ position: 'absolute', right: ownershipPct ? 32 : 8, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#9aa5b8', pointerEvents: 'none' }}>%</span>
                {ownershipPct && (
                  <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none' }}>
                    <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
                  </span>
                )}
              </div>
            </div>

            <div>
              <FieldLabel>Position in the business</FieldLabel>
              <ValidatedSelect value={position} onChange={setPosition}>
                <option value=""></option>
                {['Director', 'Shareholder', 'Director & Shareholder', 'Partner', 'Beneficial Owner', 'Secretary'].map(r => (
                  <option key={r}>{r}</option>
                ))}
              </ValidatedSelect>
            </div>
          </div>

          <div style={sectionDivStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <SectionTitle>Address history (past 3 years)</SectionTitle>
              {enoughHistory && (
                <span style={{ fontSize: 12, fontWeight: 600, color: '#2a7a4f', background: '#e6f4ee', padding: '2px 10px', borderRadius: 99 }}>3 years covered</span>
              )}
            </div>

            {!enoughHistory && (
              <p style={{ margin: '0 0 16px', fontSize: 13, color: BLUE }}>
                Add addresses until the earliest move-in date covers at least 3 years ago.
              </p>
            )}

            {addresses.map((addr, idx) => (
              <div key={idx} style={{ border: `1px solid ${BORDER}`, borderRadius: 6, padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontFamily: "'Denim-Medium', sans-serif", fontSize: 14, fontWeight: 500, color: NAVY }}>Address {idx + 1}</span>
                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAddress(idx)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9aa5b8', display: 'flex', padding: 4 }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  )}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <FieldLabel>Address</FieldLabel>
                  <ValidatedInput value={addr.line} onChange={v => updateAddress(idx, 'line', v)} placeholder="e.g. 47 Wallaby Way, Sydney" />
                </div>
                <div>
                  <FieldLabel>Move in date</FieldLabel>
                  <DatePicker value={addr.moveInDate} onChange={v => updateAddress(idx, 'moveInDate', v)} />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAddress}
              style={{ background: 'none', border: `1px solid ${BLUE}`, borderRadius: 4, padding: '8px 14px', cursor: 'pointer', color: BLUE, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              + Add Address
            </button>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, padding: '16px 20px', borderTop: `1px solid ${BORDER}`, position: 'sticky', bottom: 0, backgroundColor: '#fff' }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} isDisabled={!canSave}>Save business owner</Button>
        </div>

      </div>
    </div>,
    document.body,
  )
}
