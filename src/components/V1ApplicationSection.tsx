import React, { useState, useRef, useCallback, useEffect } from 'react'
import { PlusIcon, TrashSimpleIcon, PencilSimpleIcon, CaretDoubleDownIcon } from '@phosphor-icons/react'
import { Button } from '#ui/Button/Button'
import { TextInput } from '#ui/TextInput/TextInput'
import { Select } from '#ui/Select/Select'
import { Textarea } from '#ui/Textarea/Textarea'
import { Text } from '#ui/Text/Text'
import { TextLink } from '#ui/TextLink/TextLink'
import clsx from 'clsx'
import * as s from './V1ApplicationSection.css'
import { inputContainer, input } from '#ui/TextInput/TextInput.css'
import {
  fieldHintBlue,
  radioCircle,
  radioCircleSelected,
  radioCircleDot,
  radioLabel,
} from './AppFormBusinessPanel.css'
import { AddBusinessOwnerModal, type BusinessOwner } from './AddBusinessOwnerModal'
import { DocumentUpload, type DocumentUploadFile, type FileRejection } from './DocumentUpload'
import type { ApplicationVoicePatch } from '../voice/fieldSchemas'

const GOODS_DESC_MAX = 500

function QuestionField({ question, hint, children }: { question: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className={s.fieldBlock}>
      <Text font="body1" as="p" color="brandDefault" className={s.questionPara}>{question}</Text>
      {children}
      {hint && <Text font="body2" as="p" color="brandSecondary" className={s.hintPara}>{hint}</Text>}
    </div>
  )
}

/** Figma 8529-136442: two bordered radio cards, gap 16px — not a single segmented bar */
function RadioCards({ name, value, onChange, options }: {
  name: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className={s.radioCardRow} role="radiogroup" aria-label={name}>
      {options.map(opt => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            className={clsx(s.radioCard, isSelected && s.radioCardSelected)}
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

function YesNo({ name, value, onChange }: { name: string; value: '' | 'yes' | 'no'; onChange: (v: 'yes' | 'no') => void }) {
  return (
    <RadioCards
      name={name}
      value={value}
      onChange={v => onChange(v as 'yes' | 'no')}
      options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
    />
  )
}

function CurrencyInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className={inputContainer}>
      <span style={{ fontSize: 14, color: '#5475ab', paddingLeft: 4 }}>£</span>
      <input className={input} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

function SuffixInput({ value, onChange, placeholder, suffix }: { value: string; onChange: (v: string) => void; placeholder?: string; suffix: string }) {
  return (
    <div className={inputContainer}>
      <input className={input} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      <span style={{ fontSize: 14, color: '#5475ab', paddingRight: 4 }}>{suffix}</span>
    </div>
  )
}

function SectionCard({ id, title, isLocked, lockedBy, children }: {
  id: string
  title: string
  isLocked: boolean
  lockedBy?: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className={s.sectionCardWrap}>
      <div className={s.sectionCardHeader}>
        <CaretDoubleDownIcon size={12} color="#E07B39" weight="bold" />
        <span className={s.sectionTitle}>{title}</span>
      </div>

      {isLocked ? (
        <div className={s.lockedOverlay}>
          <div className={s.lockedMessage}>
            Complete <strong className={s.lockedHighlight}>{lockedBy}</strong> to unlock this section
          </div>
        </div>
      ) : (
        <div className={s.sectionCardContent}>
          <div className={s.sectionCardInner}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx(s.subSectionTitleRow, s.subSectionHead)}>
      <Text font="heading3" weight="medium" as="p" color="brandDefault">{children}</Text>
    </div>
  )
}

const MCC_OPTIONS = [
  '5812 – Eating Places, Restaurants',
  '5814 – Fast Food Restaurants',
  '7011 – Hotels, Motels, and Resorts',
  '5411 – Grocery Stores, Supermarkets',
  '5912 – Drug Stores, Pharmacies',
  '5999 – Miscellaneous Retail Stores',
  '7299 – Services (Not Elsewhere Classified)',
  '5734 – Computer and Computer Software Stores',
  '5045 – Computers, Peripherals, and Software',
  '7372 – Computer Programming, Data Processing',
  '5411 – Grocery Stores',
  '5651 – Family Clothing Stores',
  '5661 – Shoe Stores',
  '7011 – Lodging',
  '5511 – Car Dealers (New)',
  '5521 – Car Dealers (Used)',
  '7549 – Towing Services',
]

interface V1ApplicationSectionProps {
  merchantName?: string
  businessType?: string
  phone?: string
  email?: string
  mcc?: string
  isMobile?: boolean
  voicePatch?: ApplicationVoicePatch
  voicePatchNonce?: number
  onContinue: () => void
}

export function V1ApplicationSection({
  merchantName, businessType: initialBizType, phone: initialPhone, email: initialEmail, mcc: initialMcc,
  isMobile = false, voicePatch, voicePatchNonce = 0, onContinue,
}: V1ApplicationSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextFileId = useRef(0)

  const [bizType, setBizType] = useState(initialBizType ?? '')
  const [regDate, setRegDate] = useState('')
  const [companyName, setCompanyName] = useState(merchantName ?? '')
  const [tradingDiff, setTradingDiff] = useState<'' | 'yes' | 'no'>('')
  const [tradingName, setTradingName] = useState('')
  const [regAddress, setRegAddress] = useState('')
  const [tradingAddressMode, setTradingAddressMode] = useState<'' | 'same' | 'other'>('')
  const [tradingAddress, setTradingAddress] = useState('')
  const [vatNumber, setVatNumber] = useState('')
  const [bizPhone, setBizPhone] = useState(initialPhone ?? '')
  const [csPhone, setCsPhone] = useState('')
  const [website, setWebsite] = useState('')

  const [owners, setOwners] = useState<BusinessOwner[]>([])
  const [signer, setSigner] = useState('')
  const [showOwnerModal, setShowOwnerModal] = useState(false)
  const [editingOwner, setEditingOwner] = useState<BusinessOwner | undefined>(undefined)
  const [idDocType, setIdDocType] = useState('')
  const [idFiles, setIdFiles] = useState<DocumentUploadFile[]>([])

  const [mcc, setMcc] = useState(initialMcc ?? '')
  const [goodsDesc, setGoodsDesc] = useState('')
  const [bizTurnover, setBizTurnover] = useState('')
  const [cardTurnover, setCardTurnover] = useState('')
  const [avgTx, setAvgTx] = useState('')
  const [debitPct, setDebitPct] = useState('')
  const [creditPct, setCreditPct] = useState('')
  const [onlinePhonePct, setOnlinePhonePct] = useState('')
  const [inPerson, setInPerson] = useState<'' | 'yes' | 'no'>('')
  const [online, setOnline] = useState<'' | 'yes' | 'no'>('')
  const [phonePayments, setPhonePayments] = useState<'' | 'yes' | 'no'>('')

  const [deposits, setDeposits] = useState<'' | 'yes' | 'no'>('')
  const [depositPct, setDepositPct] = useState('')
  const [depositSize, setDepositSize] = useState('')
  const [depositAdvance, setDepositAdvance] = useState('')
  const [depositPayment, setDepositPayment] = useState('')
  const [prepayments, setPrepayments] = useState<'' | 'yes' | 'no'>('')
  const [prepayPct, setPrepayPct] = useState('')
  const [prepayDays, setPrepayDays] = useState('')
  const [warranties, setWarranties] = useState<'' | 'yes' | 'no'>('')
  const [warrantyCt, setWarrantyCt] = useState('')
  const [warrantyLen, setWarrantyLen] = useState('')
  const [warrantyReturn, setWarrantyReturn] = useState('')
  const [warrantyProvider, setWarrantyProvider] = useState('')
  const [memberships, setMemberships] = useState<'' | 'yes' | 'no'>('')
  const [membershipPct, setMembershipPct] = useState('')
  const [membershipLen, setMembershipLen] = useState('')
  const [membershipCost, setMembershipCost] = useState('')
  const [stockSame, setStockSame] = useState<'' | 'yes' | 'no'>('')
  const [stockAddress, setStockAddress] = useState('')

  const [acctHolder, setAcctHolder] = useState('')
  const [sortCode, setSortCode] = useState('')
  const [acctNumber, setAcctNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [sameCharges, setSameCharges] = useState<'' | 'yes' | 'no'>('')
  const [chHolder, setChHolder] = useState('')
  const [chSort, setChSort] = useState('')
  const [chAcct, setChAcct] = useState('')
  const [chBank, setChBank] = useState('')
  const [paperlessDD, setPaperlessDD] = useState<'' | 'yes' | 'no'>('')
  const [ddEmail, setDdEmail] = useState(initialEmail ?? '')

  const selectedSigner = owners.find(o => o.id === signer)
  const signerDisplayName = selectedSigner ? `${selectedSigner.firstName} ${selectedSigner.lastName}` : ''
  const hasOwners = owners.length > 0

  useEffect(() => {
    if (!voicePatch || !voicePatchNonce) return
    const p = voicePatch
    const s = (v: string | undefined, set: (x: string) => void) => {
      if (v !== undefined && v !== '') set(v)
    }
    const yn = (v: 'yes' | 'no' | undefined, set: (x: '' | 'yes' | 'no') => void) => {
      if (v === 'yes' || v === 'no') set(v)
    }
    s(p.bizType, setBizType)
    s(p.regDate, setRegDate)
    s(p.companyName, setCompanyName)
    yn(p.tradingDiff, setTradingDiff)
    s(p.tradingName, setTradingName)
    s(p.regAddress, setRegAddress)
    if (p.tradingAddressMode === 'same' || p.tradingAddressMode === 'other') setTradingAddressMode(p.tradingAddressMode)
    s(p.tradingAddress, setTradingAddress)
    s(p.vatNumber, setVatNumber)
    s(p.bizPhone, setBizPhone)
    s(p.csPhone, setCsPhone)
    s(p.website, setWebsite)
    s(p.mcc, setMcc)
    s(p.goodsDesc, setGoodsDesc)
    s(p.bizTurnover, setBizTurnover)
    s(p.cardTurnover, setCardTurnover)
    s(p.avgTx, setAvgTx)
    s(p.debitPct, setDebitPct)
    s(p.creditPct, setCreditPct)
    s(p.onlinePhonePct, setOnlinePhonePct)
    yn(p.inPerson, v => setInPerson(v))
    yn(p.online, v => setOnline(v))
    yn(p.phonePayments, v => setPhonePayments(v))
    yn(p.deposits, v => setDeposits(v))
    s(p.depositPct, setDepositPct)
    s(p.depositSize, setDepositSize)
    s(p.depositAdvance, setDepositAdvance)
    s(p.depositPayment, setDepositPayment)
    yn(p.prepayments, v => setPrepayments(v))
    s(p.prepayPct, setPrepayPct)
    s(p.prepayDays, setPrepayDays)
    yn(p.warranties, v => setWarranties(v))
    s(p.warrantyCt, setWarrantyCt)
    s(p.warrantyLen, setWarrantyLen)
    s(p.warrantyReturn, setWarrantyReturn)
    s(p.warrantyProvider, setWarrantyProvider)
    yn(p.memberships, v => setMemberships(v))
    s(p.membershipPct, setMembershipPct)
    s(p.membershipLen, setMembershipLen)
    s(p.membershipCost, setMembershipCost)
    yn(p.stockSame, v => setStockSame(v))
    s(p.stockAddress, setStockAddress)
    s(p.acctHolder, setAcctHolder)
    s(p.sortCode, setSortCode)
    s(p.acctNumber, setAcctNumber)
    s(p.bankName, setBankName)
    yn(p.sameCharges, v => setSameCharges(v))
    s(p.chHolder, setChHolder)
    s(p.chSort, setChSort)
    s(p.chAcct, setChAcct)
    s(p.chBank, setChBank)
    yn(p.paperlessDD, v => setPaperlessDD(v))
    s(p.ddEmail, setDdEmail)
  }, [voicePatchNonce, voicePatch])

  const handleFilesAdded = useCallback((incoming: File[]) => {
    const newFiles: DocumentUploadFile[] = incoming.map(f => ({
      id: String(nextFileId.current++),
      name: f.name,
      size: f.size,
      status: 'success' as const,
    }))
    setIdFiles(prev => [...prev, ...newFiles])
  }, [])

  const handleFileRejected = useCallback((rejections: FileRejection[]) => {
    const newFiles: DocumentUploadFile[] = rejections.map(r => ({
      id: String(nextFileId.current++),
      name: r.file.name,
      size: r.file.size,
      status: 'error' as const,
      errorMessage: r.reason === 'type'
        ? 'File type not accepted — upload a .jpeg, .png, or .pdf'
        : 'This file is too large — upload a file smaller than 8 MB',
    }))
    setIdFiles(prev => [...prev, ...newFiles])
  }, [])

  const handleFileRemove = useCallback((id: string) => {
    setIdFiles(prev => prev.filter(f => f.id !== id))
  }, [])

  function saveOwner(owner: BusinessOwner) {
    setOwners(prev => {
      const exists = prev.find(o => o.id === owner.id)
      return exists ? prev.map(o => (o.id === owner.id ? owner : o)) : [...prev, owner]
    })
    setShowOwnerModal(false)
    setEditingOwner(undefined)
  }

  function removeOwner(id: string) {
    setOwners(prev => prev.filter(o => o.id !== id))
    if (signer === id) {
      setSigner('')
      setIdDocType('')
      setIdFiles([])
    }
  }

  return (
    <div className={clsx(s.root, isMobile ? s.rootMobile : s.rootDesktop)}>

      <div ref={scrollRef} className={clsx(s.scrollArea, isMobile ? s.scrollAreaMobile : s.scrollAreaDesktop)}>
        <div className={clsx(s.contentWrapper, isMobile ? s.contentWrapperMobile : s.contentWrapperDesktop)}>

        {/* ── 1. Business ── */}
        <SectionCard
          id="section-business"
          title="Business"
          isLocked={false}
        >
          <SubHeading>Business details</SubHeading>
          <QuestionField question="What is the business type?">
            <Select
              label=""
              fullWidth
              value={bizType}
              onChange={setBizType}
              placeholder="Select…"
              showStatusIcon={!!bizType}
              items={['Private limited company (Ltd)', 'PLC', 'LLP', 'General partnership', 'Limited partnership', 'Sole trader', 'CIC', 'CIO', 'Co-operative society', 'Other'].map(o => ({ value: o, label: o }))}
            />
          </QuestionField>

          <QuestionField question="What is the name of the business as it&apos;s registered with Companies House?">
            <TextInput label="" fullWidth value={companyName} onChange={setCompanyName} placeholder="e.g. Rosy's Pizzas Ltd" showStatusIcon={!!companyName} />
          </QuestionField>

          <QuestionField question="When was the business registered with Companies House?">
            <TextInput label="" fullWidth value={regDate} onChange={setRegDate} placeholder="DD/MM/YYYY" showStatusIcon={!!regDate} />
          </QuestionField>

          <SubHeading>Registered address</SubHeading>
          <QuestionField question="What is the registered address of the business?" hint="This is the address the business is registered with on Companies House">
            <TextInput label="" fullWidth value={regAddress} onChange={setRegAddress} placeholder="e.g. 10 Baltic Place, Lanarkshire, Scotland, G40 3EG" showStatusIcon={!!regAddress} />
          </QuestionField>
          <TextLink onClick={() => {}}>Enter address manually</TextLink>

          <SubHeading>Trading name</SubHeading>
          <QuestionField question="Is your trading name different to the merchants legal name?">
            <YesNo name="tradingDiff" value={tradingDiff} onChange={setTradingDiff} />
          </QuestionField>
          {tradingDiff === 'yes' && (
            <QuestionField question="What is the trading name of the business?">
              <TextInput label="" fullWidth value={tradingName} onChange={setTradingName} placeholder="e.g. Rosy's Pizza" showStatusIcon={!!tradingName} />
            </QuestionField>
          )}

          <div className={clsx(s.subSectionIntro, s.subSectionHead)}>
            <div className={s.subSectionTitleRow}>
              <Text font="heading3" weight="medium" as="p" color="brandDefault">Trading address</Text>
            </div>
            <Text font="body2" as="p" color="brandSecondary" className={clsx(s.mutedPara, s.mutedParaFlush)}>
              This is the address where the merchant operates their business from.
            </Text>
          </div>
          <QuestionField question="What is the trading address of the business?">
            <RadioCards
              name="tradingAddressMode"
              value={tradingAddressMode}
              onChange={v => setTradingAddressMode(v as 'same' | 'other')}
              options={[
                { value: 'same', label: 'Same as registered address' },
                { value: 'other', label: 'Another address' },
              ]}
            />
          </QuestionField>
          {tradingAddressMode === 'other' && (
            <>
              <TextInput label="" fullWidth value={tradingAddress} onChange={setTradingAddress} placeholder="e.g. 10 Baker Street, London, W1U 3BW" showStatusIcon={!!tradingAddress} />
              <TextLink onClick={() => {}}>Enter address manually</TextLink>
            </>
          )}

          <SubHeading>VAT number</SubHeading>
          <QuestionField question="What is the business&apos;s VAT number? (optional)" hint="This is the 9-digit number that comes after &apos;GB&apos; in the VAT number">
            <TextInput label="" fullWidth value={vatNumber} onChange={setVatNumber} placeholder="e.g. 123456789" showStatusIcon={!!vatNumber} />
          </QuestionField>

          <SubHeading>Phone number</SubHeading>
          <div className={s.stackedFieldsColumn}>
            <QuestionField question="What is the business&apos;s phone number?">
              <TextInput label="" fullWidth type="tel" value={bizPhone} onChange={setBizPhone} placeholder="e.g. 07700 900000" showStatusIcon={!!bizPhone} />
            </QuestionField>
            <QuestionField question="What is the customer service phone number? (optional)">
              <TextInput label="" fullWidth type="tel" value={csPhone} onChange={setCsPhone} placeholder="e.g. 07700 900001" showStatusIcon={!!csPhone} />
            </QuestionField>
          </div>

          <SubHeading>Website</SubHeading>
          <QuestionField question="What is the business&apos;s website?" hint="Provide the website in the format of www.example.com">
            <TextInput label="" fullWidth type="url" value={website} onChange={setWebsite} placeholder="e.g. www.example.com" showStatusIcon={!!website} />
          </QuestionField>
        </SectionCard>

        {/* ── 2. Owners ── */}
        <SectionCard
          id="section-owners"
          title="Owners"
          isLocked={false}
        >
          <SubHeading>Business owners</SubHeading>
          <Text font="body2" as="p" color="brandSecondary" className={s.mutedPara}>
            Add the details of any business owners who own 25% or more of your business or have a controlling influence. This should match the latest information held by Companies House.
          </Text>

          {hasOwners && (
            <div className={s.ownersTable}>
              <div className={s.ownersTableHead}>
                <span className={s.ownersTableHeadCell}>Business owner</span>
                <span className={s.ownersTableHeadCell}>Ownership</span>
                <span className={s.ownersTableHeadCell}>Position</span>
                <span className={s.ownersTableHeadCell} />
              </div>
              {owners.map((o, i) => (
                <div key={o.id} className={clsx(s.ownersTableRow, i > 0 && s.ownersTableRowBorder)}>
                  <span className={s.ownerName}>{o.firstName} {o.lastName}</span>
                  <span className={s.ownerDetail}>{o.ownershipPct}%</span>
                  <span className={s.ownerDetail}>{o.position}</span>
                  <div className={s.ownersTableActions}>
                    <button
                      type="button"
                      className={s.ownerIconBtn}
                      onClick={() => removeOwner(o.id)}
                      title="Remove owner"
                    >
                      <TrashSimpleIcon size={15} />
                    </button>
                    <button
                      type="button"
                      className={s.ownerIconBtn}
                      onClick={() => { setEditingOwner(o); setShowOwnerModal(true) }}
                      title="Edit owner"
                    >
                      <PencilSimpleIcon size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className={hasOwners ? s.addOwnerPrimaryBtn : s.addOwnerSecondaryBtn}
            onClick={() => { setEditingOwner(undefined); setShowOwnerModal(true) }}
          >
            <PlusIcon size={14} weight="bold" />
            Add business owner
          </button>

          <div className={s.formBlockDivider}>
            <SubHeading>Authorised signer</SubHeading>
            <Text font="body2" as="p" color="brandSecondary" className={s.mutedPara}>
              We&apos;ll send the contract to this individual&apos;s email address to sign on behalf of the business.
            </Text>
            <QuestionField question="Who will sign the contract?" hint={!hasOwners ? 'Add at least one owner first' : undefined}>
              <Select
                label=""
                fullWidth
                value={signer}
                onChange={setSigner}
                placeholder="Select…"
                isDisabled={!hasOwners}
                showStatusIcon={!!signer && hasOwners}
                items={owners.map(o => ({ value: o.id, label: `${o.firstName} ${o.lastName}` }))}
              />
            </QuestionField>
          </div>

          <div className={s.formBlockDivider}>
            <SubHeading>
              {signerDisplayName ? `Verify the identity of ${signerDisplayName}` : 'Verify identity'}
            </SubHeading>
            <Text font="body2" as="p" color="brandSecondary" className={s.mutedPara}>
              We&apos;ll use this document to confirm the signer&apos;s identity.
            </Text>
            <Select
              label="ID document type"
              fullWidth
              value={idDocType}
              onChange={setIdDocType}
              placeholder="Select…"
              isDisabled={!signer}
              showStatusIcon={!!idDocType && !!signer}
              items={['Passport', 'Driving licence', 'National Identity Card', 'Residence permit'].map(o => ({ value: o, label: o }))}
            />
            <DocumentUpload
              label="Upload ID document"
              dropText="Drag and drop your files here"
              helpText="Upload a .jpeg, .png or .pdf (up to 8MB)"
              acceptedFileTypes={['.jpeg', '.jpg', '.png', '.pdf', 'image/jpeg', 'image/png', 'application/pdf']}
              maxFileSize={8 * 1024 * 1024}
              files={idFiles}
              isDisabled={!signer}
              onSelect={handleFilesAdded}
              onDrop={handleFilesAdded}
              onRemove={handleFileRemove}
              onReject={handleFileRejected}
            />
          </div>
        </SectionCard>

        {/* ── 3. Payments ── */}
        <SectionCard
          id="section-payments"
          title="Payments"
          isLocked={false}
        >
          <SubHeading>Merchant category code</SubHeading>
          <QuestionField question="What is the business&apos;s merchant category code?" hint="The MCC has been automatically selected based on your business description. You can change it if needed.">
            <Select
              label=""
              fullWidth
              value={mcc}
              onChange={setMcc}
              placeholder="Select…"
              showStatusIcon={!!mcc}
              items={MCC_OPTIONS.map(o => ({ value: o, label: o }))}
            />
          </QuestionField>

          <SubHeading>Goods and services</SubHeading>
          <div className={s.fieldBlock}>
            <Text font="body1" as="p" color="brandDefault" className={s.questionPara}>
              Provide a 1–2 sentence description of the goods and services the business sells
            </Text>
            <div className={s.textareaLabelRow}>
              <span className={s.fieldLabel}>Description</span>
              <span className={s.charCount}>{goodsDesc.length}/{GOODS_DESC_MAX}</span>
            </div>
            <Textarea
              label=""
              fullWidth
              placeholder="e.g. They sell fresh pizza and Italian food at their restaurant…"
              rows={5}
              value={goodsDesc}
              onChange={(v: string) => setGoodsDesc(v.slice(0, GOODS_DESC_MAX))}
              showStatusIcon={goodsDesc.length > 0}
            />
          </div>

          <SubHeading>Business and card turnover</SubHeading>
          <QuestionField question="What is the annual business turnover?">
            <CurrencyInput value={bizTurnover} onChange={setBizTurnover} placeholder="e.g. 200,000" />
          </QuestionField>
          <QuestionField question="What is the annual card turnover?">
            <CurrencyInput value={cardTurnover} onChange={setCardTurnover} placeholder="e.g. 100,000" />
          </QuestionField>
          <QuestionField question="What is your average transaction value?">
            <CurrencyInput value={avgTx} onChange={setAvgTx} placeholder="e.g. 20" />
          </QuestionField>

          <QuestionField question="What percentage of card payments are from debit and credit cards?">
            <div className={s.gridTwo}>
              <div>
                <span className={s.fieldCapsLabel}>Debit cards</span>
                <SuffixInput value={debitPct} onChange={setDebitPct} placeholder="e.g. 50" suffix="%" />
              </div>
              <div>
                <span className={s.fieldCapsLabel}>Credit cards</span>
                <SuffixInput value={creditPct} onChange={setCreditPct} placeholder="e.g. 50" suffix="%" />
              </div>
            </div>
          </QuestionField>

          <SubHeading>Card payments</SubHeading>
          <QuestionField question="How does the merchant want to accept card payments?">
            <div className={s.fieldBlock}>
              <span className={s.fieldCapsLabel}>In person</span>
              <YesNo name="inPerson" value={inPerson} onChange={setInPerson} />
            </div>
            <div className={s.fieldBlock}>
              <span className={s.fieldCapsLabel}>Online</span>
              <YesNo name="online" value={online} onChange={setOnline} />
            </div>
            <div className={s.fieldBlock}>
              <span className={s.fieldCapsLabel}>Over the phone or through mail</span>
              <YesNo name="phonePayments" value={phonePayments} onChange={setPhonePayments} />
            </div>
          </QuestionField>

          <QuestionField question="What percentage of card payments are taken online or over the phone?">
            <SuffixInput value={onlinePhonePct} onChange={setOnlinePhonePct} placeholder="e.g. 50" suffix="%" />
          </QuestionField>
        </SectionCard>

        {/* ── 4. Goods & services ── */}
        <SectionCard
          id="section-goods"
          title="Goods and services"
          isLocked={false}
        >
          <SubHeading>Deposits</SubHeading>
          <QuestionField question="Does the business take deposits before they supply goods and services?">
            <YesNo name="deposits" value={deposits} onChange={setDeposits} />
          </QuestionField>
          {deposits === 'yes' && (
            <div className={s.gridTwo}>
              <QuestionField question="What percentage of goods or services require a deposit to be taken?">
                <SuffixInput value={depositPct} onChange={setDepositPct} placeholder="e.g. 50" suffix="%" />
              </QuestionField>
              <QuestionField question="What is the average size of a deposit taken, as a percentage of the size of the full payment?">
                <SuffixInput value={depositSize} onChange={setDepositSize} placeholder="e.g. 50" suffix="%" />
              </QuestionField>
              <QuestionField question="How far in advance of full payment is the deposit taken?">
                <SuffixInput value={depositAdvance} onChange={setDepositAdvance} placeholder="e.g. 10" suffix="days" />
              </QuestionField>
              <QuestionField question="How far in advance of the delivery of goods and services is the full payment is taken?">
                <SuffixInput value={depositPayment} onChange={setDepositPayment} placeholder="e.g. 10" suffix="days" />
              </QuestionField>
            </div>
          )}

          <SubHeading>Prepayments</SubHeading>
          <QuestionField question="Does the business accept full payment prior to the delivery of goods or services?">
            <YesNo name="prepayments" value={prepayments} onChange={setPrepayments} />
          </QuestionField>
          {prepayments === 'yes' && (
            <div className={s.gridTwo}>
              <QuestionField question="What percentage of goods or services does the business take full payment for prior to delivery?">
                <SuffixInput value={prepayPct} onChange={setPrepayPct} placeholder="e.g. 50" suffix="%" />
              </QuestionField>
              <QuestionField question="How far in advance of the delivery of goods and services is full payment is taken?">
                <SuffixInput value={prepayDays} onChange={setPrepayDays} placeholder="e.g. 30" suffix="days" />
              </QuestionField>
            </div>
          )}

          <SubHeading>Warranties</SubHeading>
          <QuestionField question="Does the business charge for any guarantees or extended warranties?">
            <YesNo name="warranties" value={warranties} onChange={setWarranties} />
          </QuestionField>
          {warranties === 'yes' && (
            <div className={s.gridTwo}>
              <QuestionField question="What percentage of annual card turnover comes from guarantees or warranties?">
                <SuffixInput value={warrantyCt} onChange={setWarrantyCt} placeholder="e.g. 50" suffix="%" />
              </QuestionField>
              <QuestionField question="What is the average length of the guarantees or warranties sold?">
                <SuffixInput value={warrantyLen} onChange={setWarrantyLen} placeholder="e.g. 30" suffix="months" />
              </QuestionField>
              <QuestionField question="What percentage of goods or services sold are returned under guarantee or warranty?">
                <SuffixInput value={warrantyReturn} onChange={setWarrantyReturn} placeholder="e.g. 50" suffix="%" />
              </QuestionField>
              <div style={{ gridColumn: '1 / -1' }}>
                <QuestionField question="What third party provider is used for guarantees and warranties?">
                  <TextInput label="" fullWidth value={warrantyProvider} onChange={setWarrantyProvider} placeholder="e.g. WarrantyCo Ltd" showStatusIcon={!!warrantyProvider} />
                </QuestionField>
              </div>
            </div>
          )}

          <SubHeading>Memberships, subscriptions and insurance premiums</SubHeading>
          <QuestionField question="Does the business sell memberships, subscriptions or insurance premiums?">
            <YesNo name="memberships" value={memberships} onChange={setMemberships} />
          </QuestionField>
          {memberships === 'yes' && (
            <div className={s.gridTwo}>
              <QuestionField question="What percentage of annual card turnover comes from memberships, subscriptions or insurance premiums?">
                <SuffixInput value={membershipPct} onChange={setMembershipPct} placeholder="e.g. 50" suffix="%" />
              </QuestionField>
              <QuestionField question="What is the average length of membership, subscription or insurance premiums?">
                <SuffixInput value={membershipLen} onChange={setMembershipLen} placeholder="e.g. 30" suffix="months" />
              </QuestionField>
              <QuestionField question="What is the average cost of membership, subscription or insurance premiums?">
                <CurrencyInput value={membershipCost} onChange={setMembershipCost} placeholder="e.g. 200" />
              </QuestionField>
            </div>
          )}

          <SubHeading>Location of stock</SubHeading>
          <QuestionField question="Is stock held at the same address as the trading address?">
            <YesNo name="stockSame" value={stockSame} onChange={setStockSame} />
          </QuestionField>
          {stockSame === 'no' && (
            <div className={s.fieldBlock}>
              <QuestionField question="What address is stock held at?">
                <TextInput label="" fullWidth value={stockAddress} onChange={setStockAddress} placeholder="e.g. 10 Baltic Place, Lanarkshire, Scotland, G40 3EG" showStatusIcon={!!stockAddress} />
              </QuestionField>
              <TextLink onClick={() => {}}>Enter address manually</TextLink>
            </div>
          )}
        </SectionCard>

        {/* ── 5. Bank details ── */}
        <SectionCard
          id="section-bank"
          title="Bank details"
          isLocked={false}
        >
          <SubHeading>Settlement bank account</SubHeading>
          <div className={s.fieldStack}>
            <TextInput label="Account holder name" fullWidth value={acctHolder} onChange={setAcctHolder} placeholder="e.g. Paul Price" showStatusIcon={!!acctHolder} />
            <TextInput label="Sort code" fullWidth value={sortCode} onChange={setSortCode} placeholder="e.g. 12 23 24" showStatusIcon={!!sortCode} />
            <TextInput label="Account number" fullWidth value={acctNumber} onChange={setAcctNumber} placeholder="e.g. 12345678" showStatusIcon={!!acctNumber} />
            <TextInput label="Bank name" fullWidth value={bankName} onChange={setBankName} placeholder="e.g. NatWest Ltd" showStatusIcon={!!bankName} />
          </div>

          <QuestionField question="Does the merchant want to pay their charges from the same account?">
            <YesNo name="sameCharges" value={sameCharges} onChange={setSameCharges} />
          </QuestionField>

          {sameCharges === 'no' && (
            <div className={s.formBlockDivider}>
              <SubHeading>Charges bank account</SubHeading>
              <div className={s.fieldStack}>
                <TextInput label="Account holder name" fullWidth value={chHolder} onChange={setChHolder} placeholder="e.g. Paul Price" showStatusIcon={!!chHolder} />
                <TextInput label="Sort code" fullWidth value={chSort} onChange={setChSort} placeholder="e.g. 12 23 24" showStatusIcon={!!chSort} />
                <TextInput label="Account number" fullWidth value={chAcct} onChange={setChAcct} placeholder="e.g. 12345678" showStatusIcon={!!chAcct} />
                <TextInput label="Bank name" fullWidth value={chBank} onChange={setChBank} placeholder="e.g. NatWest Ltd" showStatusIcon={!!chBank} />
              </div>
            </div>
          )}

          <div className={s.formBlockDivider}>
            <SubHeading>Paperless direct debit</SubHeading>
            <p className={fieldHintBlue} style={{ marginTop: 0, marginBottom: 16, lineHeight: 1.45 }}>
              Paperless Direct Debit allows the merchant to set up a Direct Debit online without the need to complete and submit a paper mandate. If you choose &apos;Yes&apos;, we&apos;ll send the merchant an email with a link to set up their Direct Debit.
            </p>
            <QuestionField question="Would the merchant like to setup paperless Direct Debit?">
              <YesNo name="paperlessDD" value={paperlessDD} onChange={setPaperlessDD} />
            </QuestionField>
            {paperlessDD === 'yes' && (
              <QuestionField question="What email address shall we use for the merchant to setup paperless Direct Debit?">
                <TextInput label="" fullWidth type="email" value={ddEmail} onChange={setDdEmail} placeholder="e.g. paul@tuza.ai" showStatusIcon={!!ddEmail} />
              </QuestionField>
            )}
          </div>
        </SectionCard>

        <div className={s.continueRow}>
          <Button onClick={onContinue}>Continue to Checks</Button>
        </div>
        </div>

      </div>

      {showOwnerModal && (
        <AddBusinessOwnerModal
          initial={editingOwner}
          onSave={saveOwner}
          onClose={() => { setShowOwnerModal(false); setEditingOwner(undefined) }}
        />
      )}

    </div>
  )
}
