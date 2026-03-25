import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { SpinnerIcon } from '@phosphor-icons/react'
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
  formSection,
  fieldGroup,
  fieldLabelRow,
  fieldLabel,
  fieldCharCount,
  fieldSelect,
  fieldInput,
  fieldTextarea,
  fieldHintText,
  chWrapper,
  chInput,
  chDropdown,
  chMenu,
  chItem,
  chItemTop,
  chCompanyName,
  chAddress,
  chStatus,
  chStatusDot,
  chStatusText,
  chDivider,
  chHintText,
  mccFieldWrapper,
  mccSpinnerWrapper,
  mccSpinnerText,
  mccSpinnerIcon,
  panelFooter,
} from './BusinessInfoPanel.css'

interface Company {
  name: string
  number: string
  address: string
  status: 'Active' | 'Dissolved' | 'Liquidation'
}

const STATUS_COLOURS: Record<Company['status'], string> = {
  Active: '#2e7d5a',
  Dissolved: '#b02a2a',
  Liquidation: '#b07d00',
}

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

function CompaniesHouseSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState<Company[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length >= 2) {
        const q = query.toLowerCase()
        setResults(MOCK_COMPANIES.filter(c => c.name.toLowerCase().includes(q)))
      } else {
        setResults([])
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [query])

  function openWithPosition() {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()
    setDropdownPos({ top: rect.bottom + window.scrollY + 2, left: rect.left + window.scrollX, width: rect.width })
    setIsOpen(true)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(company: Company) {
    setQuery(company.name)
    onChange(company.name)
    setIsOpen(false)
  }

  return (
    <div className={chWrapper} ref={wrapperRef}>
      <input
        ref={inputRef}
        className={chInput}
        value={query}
        placeholder="Search Companies House…"
        onChange={e => {
          setQuery(e.target.value)
          onChange(e.target.value)
          openWithPosition()
        }}
        onFocus={() => { if (query.trim().length >= 2) openWithPosition() }}
      />
      {isOpen && results.length > 0 && createPortal(
        <div
          className={chDropdown}
          style={{ top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width }}
        >
          <div className={chMenu}>
            {results.map((company, i) => (
              <div key={company.name}>
                {i > 0 && <div className={chDivider} />}
                <div className={chItem} onMouseDown={e => { e.preventDefault(); handleSelect(company) }}>
                  <div className={chItemTop}>
                    <span className={chCompanyName}>{company.name}</span>
                    <div className={chStatus}>
                      <span className={chStatusDot} style={{ backgroundColor: STATUS_COLOURS[company.status] }} />
                      <span className={chStatusText}>{company.status}</span>
                    </div>
                  </div>
                  <span className={chAddress}>{company.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
      <p className={chHintText}>This is the name you're registered with on Companies House.</p>
    </div>
  )
}

interface BizDetailsPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  merchantName?: string
  initialBusinessType?: string
  initialBusinessDescription?: string
  initialMcc?: string
}

const MAX_DESCRIPTION = 500

export function BizDetailsPanel({
  isOpen,
  onClose,
  onComplete,
  merchantName = '',
  initialBusinessType = '',
  initialBusinessDescription = '',
  initialMcc = '',
}: BizDetailsPanelProps) {
  const [businessType, setBusinessType] = useState(initialBusinessType)
  const [businessName, setBusinessName] = useState(merchantName)
  const [businessDescription, setBusinessDescription] = useState(initialBusinessDescription)
  const [mcc, setMcc] = useState(initialMcc)
  const [mccLoading, setMccLoading] = useState(false)

  const isLimitedCompany =
    businessType === 'private-limited-company' ||
    businessType === 'public-limited-company'

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (initialMcc) return
    }
    if (businessDescription.trim().length < 10) {
      if (!initialMcc) setMcc('')
      setMccLoading(false)
      return
    }
    setMccLoading(true)
    setMcc('')
    const timer = setTimeout(() => {
      const desc = businessDescription.toLowerCase()
      let suggested: string
      if (desc.match(/pizza|bakery|café|cafe|pastry|bread|bake/)) {
        suggested = '5812 - Eating Places, Restaurants'
      } else if (desc.match(/restaurant|food|dining|takeaway|takeout|catering/)) {
        suggested = '5812 - Eating Places, Restaurants'
      } else if (desc.match(/grocery|supermarket|fresh produce|farm/)) {
        suggested = '5411 - Grocery Stores'
      } else if (desc.match(/software|tech|saas|digital|app|platform|developer/)) {
        suggested = '7372 - Computer Programming Services'
      } else if (desc.match(/gym|fitness|sport|yoga|pilates|health club/)) {
        suggested = '7941 - Amusement Parks, Carnivals'
      } else if (desc.match(/salon|hair|beauty|spa|nail/)) {
        suggested = '7230 - Beauty & Barber Shops'
      } else if (desc.match(/hotel|accommodation|bed and breakfast|hostel/)) {
        suggested = '7011 - Lodging – Hotels, Motels'
      } else if (desc.match(/retail|shop|store|boutique|clothing|fashion/)) {
        suggested = '5999 - Miscellaneous Retail'
      } else {
        suggested = '7299 - Services, Not Elsewhere Classified'
      }
      setMcc(suggested)
      setMccLoading(false)
    }, 1800)
    return () => clearTimeout(timer)
  }, [businessDescription])

  const isComplete =
    businessType !== '' &&
    businessName.trim() !== '' &&
    businessDescription.trim() !== '' &&
    mcc !== ''

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
      <div className={panel}>

        <div className={panelContent}>

          <div className={panelHeader}>
            <span className={panelHeaderTitle}>
              Business Information:{' '}
              <span className={panelHeaderTitleAccent}>Details</span>
            </span>
          </div>

          <div className={formSection}>
            <SectionTitle>Business details</SectionTitle>

            <div className={fieldGroup}>
              <label className={fieldLabel}>Business Type</label>
              <select className={fieldSelect} value={businessType} onChange={e => setBusinessType(e.target.value)}>
                <option value="">Select a type</option>
                <option value="sole-trader">Sole trader</option>
                <option value="private-limited-company">Private limited company (Ltd)</option>
                <option value="public-limited-company">Public limited company (PLC)</option>
                <option value="limited-liability-partnership">Limited liability partnership (LLP)</option>
                <option value="general-partnership">General partnership</option>
                <option value="limited-partnership">Limited partnership (LP)</option>
                <option value="community-interest-company">Community interest company (CIC)</option>
                <option value="charitable-incorporated-organisation">Charitable incorporated organisation (CIO)</option>
                <option value="registered-charity">Registered charity</option>
                <option value="industrial-provident-society">Industrial &amp; provident society</option>
                <option value="royal-charter">Royal charter body</option>
                <option value="overseas-company">Overseas company</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={fieldGroup}>
              <label className={fieldLabel}>Business Name</label>
              {isLimitedCompany ? (
                <CompaniesHouseSearch value={businessName} onChange={setBusinessName} />
              ) : (
                <input
                  className={fieldInput}
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                />
              )}
            </div>

            <div className={fieldGroup}>
              <div className={fieldLabelRow}>
                <label className={fieldLabel}>Business Description</label>
                <span className={fieldCharCount}>{businessDescription.length}/{MAX_DESCRIPTION}</span>
              </div>
              <textarea
                className={fieldTextarea}
                value={businessDescription}
                onChange={e => {
                  if (e.target.value.length <= MAX_DESCRIPTION) setBusinessDescription(e.target.value)
                }}
                rows={5}
              />
              <p className={fieldHintText}>
                It is important to be accurate, as this will be used to generate the
                company's Merchant Category Code (MCC). If the MCC code is not correct
                the application may be rejected.
              </p>
            </div>

            <div className={fieldGroup}>
              <label className={fieldLabel}>Merchant Category Code (MCC)</label>
              <div className={mccFieldWrapper}>
                {mccLoading ? (
                  <div className={mccSpinnerWrapper}>
                    <SpinnerIcon size={14} color="#5475ab" className={mccSpinnerIcon} />
                    <span className={mccSpinnerText}>Generating MCC from description…</span>
                  </div>
                ) : (
                  <select
                    className={fieldSelect}
                    value={mcc}
                    disabled={!businessDescription.trim()}
                    onChange={e => setMcc(e.target.value)}
                    style={!businessDescription.trim() ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
                  >
                    <option value="">
                      {businessDescription.trim() ? 'Select a category' : 'Enter a description first'}
                    </option>
                    <option value="5411 - Grocery Stores">5411 - Grocery Stores</option>
                    <option value="5812 - Eating Places, Restaurants">5812 - Eating Places, Restaurants</option>
                    <option value="5999 - Miscellaneous Retail">5999 - Miscellaneous Retail</option>
                    <option value="7011 - Lodging – Hotels, Motels">7011 - Lodging – Hotels, Motels</option>
                    <option value="7230 - Beauty & Barber Shops">7230 - Beauty &amp; Barber Shops</option>
                    <option value="7299 - Services, Not Elsewhere Classified">7299 - Services, Not Elsewhere Classified</option>
                    <option value="7372 - Computer Programming Services">7372 - Computer Programming Services</option>
                    <option value="7941 - Amusement Parks, Carnivals">7941 - Amusement Parks, Carnivals</option>
                  </select>
                )}
              </div>
              {mcc && !mccLoading && (
                <p className={fieldHintText}>
                  The MCC has been automatically selected based on your business description. You can change it if needed.
                </p>
              )}
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
