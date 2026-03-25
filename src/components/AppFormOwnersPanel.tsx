import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  CheckCircleIcon,
  PencilSimpleIcon,
  TrashIcon,
  XIcon,
} from '@phosphor-icons/react'
import { DatePicker, parseDateDisplay } from './DatePicker'
import { DocumentUpload, type DocumentUploadFile, type FileRejection } from './DocumentUpload'
import { SectionTitle } from './SectionTitle'
import { Button } from '#ui/Button/Button'
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
} from './AppFormBusinessPanel.css'

// ─── Design tokens ─────────────────────────────────────────────────────────────

const NAVY = '#062351'
const BLUE = '#4367a2'
const BORDER = '#d5ddea'
const BG1 = '#fbfcfd'

// ─── Shared UI helpers ─────────────────────────────────────────────────────────

/** ALL CAPS Space Mono label + optional "(OPTIONAL)" suffix */
function FieldLabel({ children, optional }: { children: string; optional?: boolean }) {
  return (
    <label style={{ display: 'block', fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 400, lineHeight: '14px', letterSpacing: '0.8px', textTransform: 'uppercase', color: NAVY, marginBottom: 6 }}>
      {children}
      {optional && <span style={{ fontFamily: 'inherit', textTransform: 'none', color: BLUE, marginLeft: 4, letterSpacing: 0 }}>(Optional)</span>}
    </label>
  )
}

/** Input with optional green check when filled */
function ValidatedInput({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
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

/** Select with optional green check when filled */
function ValidatedSelect({ value, onChange, children }: {
  value: string; onChange: (v: string) => void; children: React.ReactNode
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

function SectionDescription({ children }: { children: string }) {
  return (
    <p style={{ margin: 0, fontFamily: "'Denim-Regular', sans-serif", fontSize: 14, lineHeight: '20px', letterSpacing: '0.42px', color: NAVY }}>
      {children}
    </p>
  )
}

// ─── Types ─────────────────────────────────────────────────────────────────────

interface OwnerAddress {
  line: string
  moveInDate: string
}

interface Owner {
  id: number
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

/** Check if earliest move-in date is >= 3 years ago */
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

// ─── Add/Edit owner modal ──────────────────────────────────────────────────────

function AddOwnerModal({ initial, onSave, onClose }: {
  initial?: Owner
  onSave: (o: Owner) => void
  onClose: () => void
}) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [firstName, setFirstName] = useState(initial?.firstName ?? '')
  const [middleName, setMiddleName] = useState(initial?.middleName ?? '')
  const [lastName, setLastName] = useState(initial?.lastName ?? '')
  const [dob, setDob] = useState(initial?.dob ?? '')
  const [nationality, setNationality] = useState(initial?.nationality ?? '')
  const [ownershipPct, setOwnershipPct] = useState(initial?.ownershipPct ?? '')
  const [position, setPosition] = useState(initial?.position ?? '')
  const [addresses, setAddresses] = useState<OwnerAddress[]>(
    initial?.addresses ?? [{ line: '', moveInDate: '' }]
  )

  const enoughHistory = hasThreeYearsHistory(addresses)
  const canSave = title && firstName && lastName && dob && nationality && ownershipPct && position && enoughHistory

  function updateAddress(idx: number, field: keyof OwnerAddress, val: string) {
    setAddresses(prev => prev.map((a, i) => i === idx ? { ...a, [field]: val } : a))
  }

  function removeAddress(idx: number) {
    setAddresses(prev => prev.filter((_, i) => i !== idx))
  }

  function addAddress() {
    setAddresses(prev => [...prev, { line: '', moveInDate: '' }])
  }

  function handleSave() {
    if (!canSave) return
    onSave({ id: initial?.id ?? Date.now(), title, firstName, middleName, lastName, dob, nationality, ownershipPct, position, addresses })
  }

  const sectionDivStyle: React.CSSProperties = { paddingTop: 24, marginTop: 24, borderTop: `1px solid ${BORDER}` }
  const fieldSpacing: React.CSSProperties = { marginBottom: 16 }

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(6,35,81,0.4)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ backgroundColor: '#fff', borderRadius: 8, width: 620, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 16px 48px rgba(6,35,81,0.22)', display: 'flex', flexDirection: 'column', position: 'relative' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${BORDER}`, position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
          <span style={{ fontFamily: "'Denim-Medium', sans-serif", fontWeight: 500, fontSize: 18, letterSpacing: '-0.3px', color: NAVY }}>
            {initial ? 'Edit business owner' : 'Add business owner'}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: NAVY, display: 'flex', padding: 4 }}>
            <XIcon size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 24 }}>

          {/* ── Personal information ── */}
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
              {['British', 'Irish', 'American', 'Australian', 'Canadian', 'French', 'German', 'Italian', 'Spanish', 'Other'].map(n => <option key={n}>{n}</option>)}
            </ValidatedSelect>
          </div>

          {/* ── Business information ── */}
          <div style={sectionDivStyle}>
            <SectionTitle>Business Information</SectionTitle>

            <div style={fieldSpacing}>
              <FieldLabel>Ownership percentage</FieldLabel>
              <div style={{ position: 'relative' }}>
                <input
                  className={fieldInput}
                  type="number"
                  min={0} max={100}
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
                {['Director', 'Shareholder', 'Director & Shareholder', 'Partner', 'Beneficial Owner', 'Secretary'].map(r => <option key={r}>{r}</option>)}
              </ValidatedSelect>
            </div>
          </div>

          {/* ── Address history ── */}
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
                      onClick={() => removeAddress(idx)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9aa5b8', display: 'flex', padding: 4 }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  )}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <FieldLabel>Address</FieldLabel>
                  <ValidatedInput value={addr.line} onChange={v => updateAddress(idx, 'line', v)} placeholder="e.g. 47 Wallby Way, Sydney" />
                </div>
                <div>
                  <FieldLabel>Move in date</FieldLabel>
                  <DatePicker value={addr.moveInDate} onChange={v => updateAddress(idx, 'moveInDate', v)} />
                </div>
              </div>
            ))}

            <button
              onClick={addAddress}
              style={{ background: 'none', border: `1px solid ${BLUE}`, borderRadius: 4, padding: '8px 14px', cursor: 'pointer', color: BLUE, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              + Add Address
            </button>
          </div>

        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, padding: '16px 20px', borderTop: `1px solid ${BORDER}`, position: 'sticky', bottom: 0, backgroundColor: '#fff' }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} isDisabled={!canSave}>Save business owner</Button>
        </div>

      </div>
    </div>,
    document.body
  )
}

// ─── Main Owners panel ─────────────────────────────────────────────────────────

interface AppFormOwnersPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function AppFormOwnersPanel({ isOpen, onClose, onComplete }: AppFormOwnersPanelProps) {
  const [owners, setOwners] = useState<Owner[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingOwner, setEditingOwner] = useState<Owner | undefined>(undefined)
  const [authorisedSigner, setAuthorisedSigner] = useState('')
  const [idDocType, setIdDocType] = useState('')
  const [idFiles, setIdFiles] = useState<DocumentUploadFile[]>([])
  const nextFileId = useRef(0)

  const hasOwners = owners.length > 0
  const hasSigner = authorisedSigner !== ''
  const selectedSignerOwner = owners.find(o => String(o.id) === authorisedSigner)
  const signerName = selectedSignerOwner ? `${selectedSignerOwner.firstName} ${selectedSignerOwner.lastName}` : null
  const idDocUploaded = idFiles.some(f => (f.status ?? 'success') === 'success')
  const isComplete = hasOwners && hasSigner && idDocType !== '' && idDocUploaded

  function handleSaveOwner(owner: Owner) {
    setOwners(prev => {
      const exists = prev.find(o => o.id === owner.id)
      return exists ? prev.map(o => o.id === owner.id ? owner : o) : [...prev, owner]
    })
    setShowModal(false)
    setEditingOwner(undefined)
  }

  function handleDelete(id: number) {
    setOwners(prev => prev.filter(o => o.id !== id))
    if (authorisedSigner === String(id)) { setAuthorisedSigner(''); setIdDocType(''); setIdFiles([]) }
  }

  function handleFilesAdded(incoming: File[]) {
    const newFiles: DocumentUploadFile[] = incoming.map(f => ({
      id: String(nextFileId.current++),
      name: f.name,
      size: f.size,
      status: 'success' as const,
    }))
    setIdFiles(prev => [...prev, ...newFiles])
  }

  function handleFileRejected(rejections: FileRejection[]) {
    const newFiles: DocumentUploadFile[] = rejections.map(r => ({
      id: String(nextFileId.current++),
      name: r.file.name,
      size: r.file.size,
      status: 'error' as const,
      errorMessage: r.reason === 'type'
        ? 'File type not accepted — upload a .jpeg, .png, or .pdf'
        : 'This file is too large - upload a file smaller than 8 MB',
    }))
    setIdFiles(prev => [...prev, ...newFiles])
  }

  function handleFileRemove(id: string) {
    setIdFiles(prev => prev.filter(f => f.id !== id))
  }

  return (
    <>
      <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
        <div className={panel}>

          <div className={panelHeader}>
            <span className={panelHeaderTitle}>
              <span className={panelHeaderTitleAccent}>Application Form:</span> Owners
            </span>
          </div>

          <div className={panelContent}>

            {/* ── Business owners ── */}
            <div className={formSectionFirst} style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SectionTitle>Business owners</SectionTitle>
                <SectionDescription>
                  Add the details of any business owners who own 25% or more of your business or have a controlling influence. This should match the latest information held by Companies House.
                </SectionDescription>
              </div>

              {/* Owners table */}
              {hasOwners && (
                <div style={{ border: `1px solid ${BORDER}`, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 150px 72px', backgroundColor: '#f5f7fa', padding: '8px 12px', borderBottom: `1px solid ${BORDER}` }}>
                    {['Business Owner', 'Ownership', 'Position', ''].map(h => (
                      <span key={h} style={{ fontSize: 10, color: NAVY, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.8px', fontFamily: "'Space Mono', monospace" }}>{h}</span>
                    ))}
                  </div>
                  {owners.map((owner, idx) => (
                    <div key={owner.id} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 150px 72px', padding: '0 12px', alignItems: 'center', minHeight: 40, borderTop: idx > 0 ? `1px solid ${BORDER}` : 'none', backgroundColor: BG1 }}>
                      <span style={{ fontSize: 13, color: NAVY, letterSpacing: '0.39px' }}>{owner.firstName} {owner.lastName}</span>
                      <span style={{ fontSize: 13, color: BLUE, letterSpacing: '0.39px' }}>{owner.ownershipPct}%</span>
                      <span style={{ fontSize: 13, color: BLUE, letterSpacing: '0.39px' }}>{owner.position}</span>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <button onClick={() => handleDelete(owner.id)}
                          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eef1f6', border: `1px solid ${BORDER}`, borderRadius: 2, cursor: 'pointer', color: NAVY, boxShadow: '0px 1px 2px 0px rgba(9,56,130,0.1)' }}>
                          <TrashIcon size={14} />
                        </button>
                        <button onClick={() => { setEditingOwner(owner); setShowModal(true) }}
                          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eef1f6', border: `1px solid ${BORDER}`, borderRadius: 2, cursor: 'pointer', color: NAVY, boxShadow: '0px 1px 2px 0px rgba(9,56,130,0.1)' }}>
                          <PencilSimpleIcon size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add business owner button — primary (dark) once owners exist */}
              <div>
                <button
                  onClick={() => { setEditingOwner(undefined); setShowModal(true) }}
                  style={{ backgroundColor: hasOwners ? '#093882' : '#eef1f6', color: hasOwners ? '#fff' : NAVY, border: `1px solid ${hasOwners ? '#093882' : BORDER}`, borderRadius: 2, padding: '6px 12px', fontSize: 14, fontFamily: "'Denim-Medium', sans-serif", fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.42px', boxShadow: '0px 1px 2px 0px rgba(9,56,130,0.1)' }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>+</span>
                  Add business owner
                </button>
              </div>
            </div>

            {/* ── Authorised signer ── */}
            <div className={formSectionDivided}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SectionTitle>Authorised signer</SectionTitle>
                <SectionDescription>We'll send the contract to this individual's email address to sign on behalf of the business.</SectionDescription>
              </div>
              <div style={{ opacity: hasOwners ? 1 : 0.5 }}>
                <label style={{ display: 'block', fontSize: 14, color: NAVY, marginBottom: 6, letterSpacing: '0.42px' }}>Who will sign the contract?</label>
                <div style={{ position: 'relative' }}>
                  <select className={fieldSelect} value={authorisedSigner} disabled={!hasOwners}
                    onChange={e => { setAuthorisedSigner(e.target.value); setIdDocType(''); setIdFiles([]) }}
                    style={{ paddingRight: hasSigner ? 52 : undefined }}>
                    <option value=""> </option>
                    {owners.map(o => <option key={o.id} value={String(o.id)}>{o.firstName} {o.lastName}</option>)}
                  </select>
                  {hasSigner && (
                    <span style={{ position: 'absolute', right: 26, top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none' }}>
                      <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── Verify identity ── */}
            <div className={formSectionDivided}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SectionTitle>{signerName ? `Verify the identity of ${signerName}` : 'Verify the identity of the authorised signer'}</SectionTitle>
                <SectionDescription>We'll send the contract to this individual's email address to sign on behalf of the business.</SectionDescription>
              </div>
              <div style={{ opacity: hasSigner ? 1 : 0.5, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <FieldLabel>ID Document Type</FieldLabel>
                  <div style={{ position: 'relative' }}>
                    <select className={fieldSelect} value={idDocType} disabled={!hasSigner}
                      onChange={e => setIdDocType(e.target.value)}
                      style={{ paddingRight: idDocType ? 52 : undefined }}>
                      <option value=""> </option>
                      <option value="passport">Passport</option>
                      <option value="driving_licence">Driving licence</option>
                      <option value="national_id">National Identity Card</option>
                      <option value="residence_permit">Residence permit</option>
                    </select>
                    {idDocType && (
                      <span style={{ position: 'absolute', right: 26, top: '50%', transform: 'translateY(-50%)', display: 'flex', pointerEvents: 'none' }}>
                        <CheckCircleIcon size={16} color="#2a9d5c" weight="fill" />
                      </span>
                    )}
                  </div>
                </div>
                <DocumentUpload
                  acceptedFileTypes={['.jpeg', '.jpg', '.png', '.pdf']}
                  maxFileSize={8 * 1024 * 1024}
                  files={idFiles}
                  isDisabled={!hasSigner}
                  onSelect={handleFilesAdded}
                  onDrop={handleFilesAdded}
                  onReject={handleFileRejected}
                  onRemove={handleFileRemove}
                />
              </div>
            </div>

          </div>

          <div className={panelFooter}>
            <Button variant="secondary" onClick={onClose}>Save &amp; close</Button>
            <Button onClick={onComplete} isDisabled={!isComplete}>Complete section</Button>
          </div>

        </div>
      </div>

      {showModal && (
        <AddOwnerModal
          initial={editingOwner}
          onSave={handleSaveOwner}
          onClose={() => { setShowModal(false); setEditingOwner(undefined) }}
        />
      )}
    </>
  )
}
