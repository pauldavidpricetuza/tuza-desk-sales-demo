import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { SpinnerIcon, CaretDoubleDownIcon, CheckCircleIcon, CheckIcon, XIcon, WarningCircleIcon, AsteriskIcon } from '@phosphor-icons/react'
import { Button } from '#ui/Button/Button'
import { Select } from '#ui/Select/Select'
import { TextInput } from '#ui/TextInput/TextInput'
import { Textarea } from '#ui/Textarea/Textarea'
import { themeVars } from '#theme/theme.css'
import * as s from './V1BusinessInfoSection.css'

function FieldCheckIcon({ visible }: { visible: boolean }) {
  if (!visible) return null
  return <CheckCircleIcon size={16} color="#2e7d5a" weight="fill" className={s.fieldCheckIcon} />
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={s.sectionCard}>
      <div className={s.sectionCardHeader}>
        <CaretDoubleDownIcon size={12} color="#E07B39" weight="bold" />
        <span className={s.sectionCardTitle}>{title}</span>
      </div>
      <div className={s.sectionCardBody}>
        {children}
      </div>
    </div>
  )
}


function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <TextInput
      label={label}
      value={value}
      onChange={() => {}}
      isDisabled
      showStatusIcon
      fullWidth
    />
  )
}

interface Company {
  name: string; number: string; address: string; status: 'Active' | 'Dissolved' | 'Liquidation'
}
const STATUS_COLOURS: Record<Company['status'], string> = { Active: '#2e7d5a', Dissolved: '#b02a2a', Liquidation: '#b07d00' }
const MOCK_COMPANIES: Company[] = [
  { name: "Rosy's Pizzas Ltd", number: '12345678', address: '12 Lombard Street, London, EC3V 9AA', status: 'Active' },
  { name: 'Rosydale Holdings Ltd', number: '98765432', address: '44 Baker Street, London, W1U 7AL', status: 'Active' },
  { name: 'Rosy Bloom Flowers Ltd', number: '11223344', address: '7 Market Place, Bristol, BS1 1EP', status: 'Dissolved' },
  { name: 'The Corner Coffee Shop Ltd', number: '55667788', address: '3 High Street, Cambridge, CB2 1BY', status: 'Active' },
  { name: 'Blue Ocean Tech Ltd', number: '22334455', address: '101 Silicon Road, Manchester, M2 4WR', status: 'Active' },
  { name: 'GreenLeaf Organic Ltd', number: '33445566', address: '22 Park Lane, Edinburgh, EH1 1YZ', status: 'Active' },
  { name: 'Summit Ventures PLC', number: '44556677', address: '5 Queen Street, Leeds, LS1 2TW', status: 'Active' },
  { name: 'City Barbers Ltd', number: '66778899', address: '9 St Andrews Street, Cambridge, CB2 3AX', status: 'Active' },
  { name: 'Helix Software Ltd', number: '77889900', address: '18 Tech Park, Birmingham, B1 1AA', status: 'Active' },
  { name: 'Nova Retail Ltd', number: '88990011', address: '6 Regent Street, London, W1B 5TA', status: 'Liquidation' },
]

function CHSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState<Company[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const d = setTimeout(() => {
      if (query.trim().length >= 2) setResults(MOCK_COMPANIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase())))
      else setResults([])
    }, 300)
    return () => clearTimeout(d)
  }, [query])

  function openAt() {
    if (!inputRef.current) return
    const r = inputRef.current.getBoundingClientRect()
    setPos({ top: r.bottom + window.scrollY + 2, left: r.left + window.scrollX, width: r.width })
    setIsOpen(true)
  }

  useEffect(() => {
    function out(e: MouseEvent) { if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setIsOpen(false) }
    document.addEventListener('mousedown', out)
    return () => document.removeEventListener('mousedown', out)
  }, [])

  return (
    <div ref={wrapperRef}>
      <label className={s.label}>Business Name</label>
      <div className={s.inputWithCheckWrapper}>
        <input
          ref={inputRef}
          className={s.input}
          style={{ paddingRight: 52 }}
          value={query}
          placeholder="Search Companies House…"
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); openAt() }}
          onFocus={() => { if (query.trim().length >= 2) openAt() }}
        />
        <div className={s.inputCheckOverlayWithGap} style={{ pointerEvents: query ? 'auto' : 'none' }}>
          {query && (
            <Button
              variant="secondary"
              type="button"
              className={s.chClearBtn}
              onClick={() => { setQuery(''); onChange('') }}
              title="Clear search"
              leftIcon={<XIcon size={12} color={themeVars.semanticColour.text.brandDefault} />}
            >
              {null}
            </Button>
          )}
          <FieldCheckIcon visible={!!query.trim()} />
        </div>
      </div>
      <p className={s.hint}>This is the name you're registered with on Companies House.</p>
      {isOpen && results.length > 0 && createPortal(
        <div className={s.chDropdown} style={{ top: pos.top, left: pos.left, width: pos.width }}>
          {results.map((c, i) => (
            <div key={c.name}>
              {i > 0 && <div className={s.chDivider} />}
              <div
                onMouseDown={e => { e.preventDefault(); setQuery(c.name); onChange(c.name); setIsOpen(false) }}
                className={s.chResult}
              >
                <div className={s.chResultHeader}>
                  <span className={s.chResultName}>{c.name}</span>
                  <span style={{ fontSize: 11, color: STATUS_COLOURS[c.status], fontFamily: "'Denim-Regular', sans-serif" }}>{c.status}</span>
                </div>
                <span className={s.chResultAddress}>{c.address}</span>
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}

function suggestMcc(desc: string): string {
  const d = desc.toLowerCase()
  if (d.match(/pizza|bakery|café|cafe|pastry|bread|bake|restaurant|food|dining|takeaway|catering/)) return '5812 - Eating Places, Restaurants'
  if (d.match(/grocery|supermarket|fresh produce|farm/)) return '5411 - Grocery Stores'
  if (d.match(/software|tech|saas|digital|app|platform|developer/)) return '7372 - Computer Programming Services'
  if (d.match(/gym|fitness|sport|yoga|pilates|health club/)) return '7941 - Amusement Parks, Carnivals'
  if (d.match(/salon|hair|beauty|spa|nail/)) return '7230 - Beauty & Barber Shops'
  if (d.match(/hotel|accommodation|bed and breakfast|hostel/)) return '7011 - Lodging – Hotels, Motels'
  if (d.match(/retail|shop|store|boutique|clothing|fashion/)) return '5999 - Miscellaneous Retail'
  return '7299 - Services, Not Elsewhere Classified'
}

function CheckboxOption({ label, checked, onChange, disabled }: {
  label: string; checked: boolean; onChange: () => void; disabled?: boolean
}) {
  return (
    <div
      onClick={() => !disabled && onChange()}
      className={clsx(
        s.checkboxOption,
        checked ? s.checkboxOptionChecked : s.checkboxOptionUnchecked,
        disabled && s.checkboxOptionDisabled,
      )}
    >
      <div className={clsx(s.checkboxBox, checked ? s.checkboxBoxChecked : s.checkboxBoxUnchecked)}>
        {checked && <CheckIcon size={10} color={themeVars.backgroundColour.background0} weight="bold" />}
      </div>
      <span className={s.checkboxLabel}>{label}</span>
    </div>
  )
}

export interface BusinessInfoData {
  businessType: string
  businessName: string
  businessDescription: string
  mcc: string
  provider: string
  cardTurnover: string
  avgTransaction: string
  paymentLocation: string
}

interface V1BusinessInfoSectionProps {
  initialData?: Partial<BusinessInfoData>
  isLocked?: boolean
  showProductWarning?: boolean
  contactName?: string
  phone?: string
  email?: string
  isMobile?: boolean
  onContinue: (data: BusinessInfoData) => void
}

const MAX_DESC = 500

export function V1BusinessInfoSection({ initialData = {}, isLocked = false, showProductWarning = false, contactName, phone, email, isMobile = false, onContinue }: V1BusinessInfoSectionProps) {
  const [businessType, setBusinessType] = useState(initialData.businessType ?? '')
  const [businessName, setBusinessName] = useState(initialData.businessName ?? '')
  const [businessDescription, setBusinessDescription] = useState(initialData.businessDescription ?? '')
  const [mcc, setMcc] = useState(initialData.mcc ?? '')
  const [mccLoading, setMccLoading] = useState(false)
  const [provider, setProvider] = useState(initialData.provider ?? '')
  const [cardTurnover, setCardTurnover] = useState(initialData.cardTurnover ?? '')
  const [avgTransaction, setAvgTransaction] = useState(initialData.avgTransaction ?? '')
  const [paymentLocation, setPaymentLocation] = useState(initialData.paymentLocation ?? '')

  const isLimitedCompany = businessType === 'private-limited-company' || businessType === 'public-limited-company'

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; if (initialData.mcc) return }
    if (businessDescription.trim().length < 10) { if (!initialData.mcc) setMcc(''); setMccLoading(false); return }
    setMccLoading(true); setMcc('')
    const t = setTimeout(() => { setMcc(suggestMcc(businessDescription)); setMccLoading(false) }, 1800)
    return () => clearTimeout(t)
  }, [businessDescription])

  const isComplete =
    businessType !== '' &&
    businessName.trim() !== '' &&
    businessDescription.trim() !== '' &&
    mcc !== '' &&
    provider.trim() !== '' &&
    cardTurnover.trim() !== '' &&
    avgTransaction.trim() !== '' &&
    paymentLocation !== ''

  function handleContinue() {
    if (!isComplete) return
    onContinue({ businessType, businessName, businessDescription, mcc, provider, cardTurnover, avgTransaction, paymentLocation })
  }

  return (
    <div className={s.root}>

      <div className={isMobile ? s.contentWidthMobile : s.contentWidthDesktop}>

        {isLocked && (
          <div className={s.lockBanner}>
            <span className={s.lockEmoji}>🔒</span>
            <div>
              <div className={s.lockTitle}>
                Business Info is locked for editing
              </div>
              <div className={s.lockDescription}>
                Once you enter the Application Form, business and product selections are locked. You can view them here but cannot make changes.
              </div>
            </div>
          </div>
        )}

        {!isLocked && showProductWarning && (
          <div className={s.productWarningBanner}>
            <WarningCircleIcon size={16} color={themeVars.semanticColour.text.brandDefault} className={s.productWarningIcon} />
            <span className={s.productWarningText}>
              Making changes to Business Info will clear your Products &amp; Pricing selections.
            </span>
          </div>
        )}

        {(contactName || phone || email) && (
          <SectionCard title="Contact">
            {contactName && <ReadOnlyField label="Contact" value={contactName} />}
            {phone && <ReadOnlyField label="Phone" value={phone} />}
            {email && <ReadOnlyField label="Email" value={email} />}
          </SectionCard>
        )}

        <SectionCard title="Details">
          <Select label="Business Type" value={businessType} onChange={setBusinessType} isDisabled={isLocked} showStatusIcon={!!businessType} placeholder="Select a type" fullWidth items={[
            { value: 'sole-trader', label: 'Sole trader' },
            { value: 'private-limited-company', label: 'Private limited company (Ltd)' },
            { value: 'public-limited-company', label: 'Public limited company (PLC)' },
            { value: 'limited-liability-partnership', label: 'Limited liability partnership (LLP)' },
            { value: 'general-partnership', label: 'General partnership' },
            { value: 'limited-partnership', label: 'Limited partnership (LP)' },
            { value: 'community-interest-company', label: 'Community interest company (CIC)' },
            { value: 'charitable-incorporated-organisation', label: 'Charitable incorporated organisation (CIO)' },
            { value: 'registered-charity', label: 'Registered charity' },
            { value: 'overseas-company', label: 'Overseas company' },
            { value: 'other', label: 'Other' },
          ]} />

          {isLimitedCompany && !isLocked ? (
            <CHSearch value={businessName} onChange={setBusinessName} />
          ) : (
            <TextInput
              label="Business Name"
              value={businessName}
              onChange={setBusinessName}
              isDisabled={isLocked}
              showStatusIcon={!!businessName.trim()}
              fullWidth
            />
          )}

          <div>
            <div className={s.descriptionHeader}>
              <label className={s.descriptionLabelNoMargin}>Business Description</label>
              <span className={s.charCount}>
                {businessDescription.length}/{MAX_DESC}
              </span>
            </div>
            <Textarea
              value={businessDescription}
              onChange={v => { if (v.length <= MAX_DESC) setBusinessDescription(v) }}
              isDisabled={isLocked}
              showStatusIcon={!!businessDescription.trim()}
              rows={5}
              fullWidth
            />
            <p className={s.hint}>
              It is important to be accurate, as this will be used to generate the company's Merchant Category Code (MCC). If the MCC code is not correct the application may be rejected.
            </p>
          </div>

          <div>
            {mccLoading ? (
              <>
                <label className={s.label}>Merchant Category Code</label>
                <div className={s.mccLoadingRow}>
                  <SpinnerIcon size={14} color={themeVars.semanticColour.text.brandTertiary} className={s.spinnerIcon} />
                  <span className={s.mccLoadingText}>Generating MCC from description…</span>
                </div>
              </>
            ) : (
              <>
                <Select
                  label="Merchant Category Code"
                  value={mcc}
                  onChange={setMcc}
                  isDisabled={isLocked || !businessDescription.trim()}
                  showStatusIcon={!!mcc}
                  placeholder={businessDescription.trim() ? 'Select a category' : 'Enter a description first'}
                  fullWidth
                  items={[
                    { value: '5411 - Grocery Stores', label: '5411 - Grocery Stores' },
                    { value: '5812 - Eating Places, Restaurants', label: '5812 - Eating Places, Restaurants' },
                    { value: '5999 - Miscellaneous Retail', label: '5999 - Miscellaneous Retail' },
                    { value: '7011 - Lodging – Hotels, Motels', label: '7011 - Lodging – Hotels, Motels' },
                    { value: '7230 - Beauty & Barber Shops', label: '7230 - Beauty & Barber Shops' },
                    { value: '7299 - Services, Not Elsewhere Classified', label: '7299 - Services, Not Elsewhere Classified' },
                    { value: '7372 - Computer Programming Services', label: '7372 - Computer Programming Services' },
                    { value: '7941 - Amusement Parks, Carnivals', label: '7941 - Amusement Parks, Carnivals' },
                    { value: '19462 - Bakery', label: '19462 - Bakery' },
                  ]}
                />
                {mcc && !mccLoading && (
                  <div className={s.mccAgentRow}>
                    <div className={s.agentBadge}>
                      <AsteriskIcon size={14} color={themeVars.foregroundColour.foregroundAccent} weight="bold" />
                      <span className={s.agentBadgeLabel}>Business Agent</span>
                    </div>
                    <span className={s.mccAgentHint}>
                      The MCC has been selected based on your business description.
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Payments">
          <Select label="Current Provider" value={provider} onChange={setProvider} isDisabled={isLocked} showStatusIcon={!!provider} placeholder="Select a provider" fullWidth items={[
            { value: 'stripe', label: 'Stripe' },
            { value: 'square', label: 'Square' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'worldpay', label: 'Worldpay' },
            { value: 'barclaycard', label: 'Barclaycard' },
            { value: 'sumup', label: 'SumUp' },
            { value: 'izettle', label: 'iZettle (PayPal)' },
            { value: 'zettle', label: 'Zettle' },
            { value: 'opayo', label: 'Opayo (Sage Pay)' },
            { value: 'adyen', label: 'Adyen' },
            { value: 'braintree', label: 'Braintree' },
            { value: 'klarna', label: 'Klarna' },
            { value: 'checkout', label: 'Checkout.com' },
            { value: 'paymentsense', label: 'Paymentsense' },
            { value: 'dojo', label: 'Dojo' },
            { value: 'takepayments', label: 'takepayments' },
            { value: 'elavon', label: 'Elavon' },
            { value: 'first-data', label: 'First Data (Fiserv)' },
            { value: 'none', label: 'None / No current provider' },
            { value: 'other', label: 'Other' },
          ]} />

          <TextInput
            label="Annual Card Turnover (£)"
            placeholder="e.g. £200,000"
            value={cardTurnover}
            onChange={setCardTurnover}
            isDisabled={isLocked}
            showStatusIcon={!!cardTurnover.trim()}
            fullWidth
          />

          <TextInput
            label="Average Transaction Value (£)"
            placeholder="e.g. £100"
            value={avgTransaction}
            onChange={setAvgTransaction}
            isDisabled={isLocked}
            showStatusIcon={!!avgTransaction.trim()}
            fullWidth
          />

          <div>
            <label className={s.label}>Where do they want to take payments?</label>
            <div className={s.paymentLocationRow}>
              <CheckboxOption
                label="Online"
                checked={paymentLocation === 'online' || paymentLocation === 'both'}
                onChange={() => {
                  if (paymentLocation === 'online') setPaymentLocation('')
                  else if (paymentLocation === 'in-person') setPaymentLocation('both')
                  else if (paymentLocation === 'both') setPaymentLocation('in-person')
                  else setPaymentLocation('online')
                }}
                disabled={isLocked}
              />
              <CheckboxOption
                label="In person"
                checked={paymentLocation === 'in-person' || paymentLocation === 'both'}
                onChange={() => {
                  if (paymentLocation === 'in-person') setPaymentLocation('')
                  else if (paymentLocation === 'online') setPaymentLocation('both')
                  else if (paymentLocation === 'both') setPaymentLocation('online')
                  else setPaymentLocation('in-person')
                }}
                disabled={isLocked}
              />
            </div>
          </div>
        </SectionCard>

      </div>

      {!isLocked && (
        <div className={clsx(s.footerRow, isMobile ? s.footerRowMobile : s.footerRowDesktop)}>
          <Button isDisabled={!isComplete} onClick={handleContinue}>Continue to Products &amp; Pricing</Button>
        </div>
      )}
    </div>
  )
}
