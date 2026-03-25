import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { CaretDownIcon, AsteriskIcon, CheckIcon, PlusIcon, TrashSimpleIcon, LockKeyIcon, LockOpenIcon } from '@phosphor-icons/react'
import { Button } from '#ui/Button/Button'
import { TextLink } from '#ui/TextLink/TextLink'
import { themeVars } from '#theme/theme.css'
import {
  panelWrapper,
  panelWrapperOpen,
  panel,
  panelHeader,
  panelHeaderTitle,
  panelHeaderTitleAccent,
  panelContent,
  panelFooter,
  sectionTitleLeft,
  sectionTitleText,
} from './BusinessInfoPanel.css'
import {
  disclosureSection,
  disclosureHeader,
  disclosureHeaderLocked,
  disclosureContent,
  radioCardList,
  radioCard,
  radioCardSelected,
  radioCircle,
  radioCircleSelected,
  radioCircleDot,
  radioCardBody,
  radioCardTitle,
  radioCardDesc,
  productCardList,
  productCard,
  productCardSelected,
  productCardTop,
  productCardDetails,
  productCardNameRow,
  productCardTitle,
  productCardDesc,
  productTagGroup,
  productTag,
  productPriceRow,
  productPrice,
  productQtySelect,
  productCardImage,
  productCardDivider,
  productSubSection,
  configCardList,
  configCard,
  configCardSelected,
  checkbox,
  checkboxChecked,
  configCardBody,
  configCardTitle,
  configCardDesc,
  upgradeCardPrice,
  upgradeCardRight,
  upgradeQtyWrapper,
  upgradeQtyLabel,
  pricingPlanList,
  pricingPlanCard,
  pricingPlanCardSelected,
  pricingPlanHeader,
  pricingPlanName,
  pricingPlanDesc,
  agentBlock,
  agentHeader,
  agentTitle,
  agentObjectiveLabel,
  agentObjectiveText,
  marginLabel,
  marginValueRow,
  marginDot,
  marginValue,
  marginBarTrack,
  marginBarFill,
  marginBarMidpoint,
  updatesRequired,
  updatesRequiredLabel,
  updatesRequiredText,
  pricingTableWrapper,
  pricingTableTitle,
  pricingTable,
  pricingTableHead,
  pricingTableHeadRight,
  pricingTableCell,
  pricingTableCellRight,
  pricingTableCellCenter,
  rateInput,
  rateInputWrapper,
  rateInputWrapperError,
  rateInputWrapperLocked,
  rateInputInner,
  rateInputInnerError,
  rateInputUnit,
  lockBtn,
  lockBtnLocked,
  lockedTableRow,
  flagDot,
  marginIndicator,
  marginIndicatorText,
  offerList,
  offerCard,
  offerCardSelected,
  configCardImage,
  deleteBtn,
  modalOverlay,
  modalBox,
  modalTitle,
  modalBody,
  modalButtons,
} from './ProductSelectionPanel.css'

// ── Mock Data ─────────────────────────────────────────────────────────────────

type ProductType = 'card-terminal' | 'ecommerce' | 'epos' | ''

interface ConfigOption {
  id: string
  label: string
  desc: string
}

interface UpgradeOption {
  id: string
  label: string
  desc: string
  price: number
}

interface ProductDef {
  id: string
  name: string
  desc: string
  tags: string[]
  price: number
  emoji: string
  configOptions: ConfigOption[]
  upgrades: UpgradeOption[]
}

const PRODUCT_TYPES = [
  { id: 'card-terminal' as const, label: 'Card terminal', desc: 'Accept payments face to face with portable card readers' },
  { id: 'ecommerce' as const, label: 'eCommerce', desc: 'Accept online payments through your website or app' },
  { id: 'epos' as const, label: 'EPOS', desc: 'Full point of sale systems with payments processing' },
]

const PRODUCTS: Record<string, ProductDef[]> = {
  'card-terminal': [
    {
      id: 'terminal-portable', name: 'Portable Terminal', desc: 'Portable card machine with 4G connectivity and next-day settlement',
      tags: ['1 day payout', 'WiFi, 4G', 'Contactless'], price: 19, emoji: '💳',
      configOptions: [], upgrades: [],
    },
    {
      id: 'terminal-compact', name: 'Compact Reader', desc: 'Compact Bluetooth card reader, pairs with phone or tablet',
      tags: ['Next-day payout', 'Bluetooth', 'Contactless'], price: 0, emoji: '📲',
      configOptions: [], upgrades: [],
    },
    {
      id: 'terminal-standard', name: 'Standard Terminal', desc: 'Fast and reliable card reader with long battery life',
      tags: ['1–2 day payout', 'Bluetooth', 'Contactless'], price: 29, emoji: '💳',
      configOptions: [], upgrades: [],
    },
  ],
  'ecommerce': [
    {
      id: 'gateway-standard', name: 'Payment Gateway Standard', desc: 'Hosted payment page with fraud protection and 3D Secure',
      tags: ['1 day payout', 'API access', '3D Secure'], price: 19, emoji: '🌐',
      configOptions: [], upgrades: [],
    },
    {
      id: 'gateway-pro', name: 'Payment Gateway Pro', desc: 'Full API integration with advanced reporting and multi-currency',
      tags: ['1 day payout', 'API access', 'Multi-currency', 'Reporting'], price: 49, emoji: '🌐',
      configOptions: [], upgrades: [],
    },
  ],
  'epos': [
    {
      id: 'epos-lite', name: 'EPOS Lite', desc: 'Countertop terminal with integrated EPOS software',
      tags: ['1 day payout', 'WiFi, 4G, 3G', 'Tips'], price: 89, emoji: '🖥️',
      configOptions: [],
      upgrades: [
        { id: 'kds', label: 'Kitchen Display System (KDS)', desc: 'View and manage orders in real-time from the kitchen.', price: 89 },
        { id: 'countertop', label: 'Countertop card machine', desc: 'Countertop payment terminal in a compact design.', price: 89 },
      ],
    },
    {
      id: 'epos-pro', name: 'EPOS Pro', desc: 'Smart terminal with integrated EPOS software',
      tags: ['1 day payout', 'WiFi, 4G, 3G', 'Tips'], price: 89, emoji: '🖥️',
      configOptions: [
        { id: 'display-10', label: '10" Display', desc: 'Countertop POS with EPOS software and integrated terminal' },
        { id: 'display-15', label: '15" Display', desc: 'Countertop POS with EPOS software and integrated terminal' },
      ],
      upgrades: [
        { id: 'kds', label: 'Kitchen Display System (KDS)', desc: 'View and manage orders in real-time from the kitchen.', price: 89 },
        { id: 'countertop', label: 'Countertop card machine', desc: 'Countertop payment terminal in a compact design.', price: 89 },
      ],
    },
  ],
}

interface RateDef {
  id: string
  label: string
  floor: number   // minimum margin rate before going orange
  defaultRate: number // display value (%)
  isFlat?: boolean    // flat fee (3p) instead of %
}

const HEADLINE_RATES: RateDef[] = [
  { id: 'consumer-debit',    label: 'Consumer debit',      floor: 0.380, defaultRate: 0.320 },
  { id: 'consumer-credit',   label: 'Consumer credit',     floor: 0.900, defaultRate: 0.939 },
  { id: 'commercial-credit', label: 'Commercial credit',   floor: 1.900, defaultRate: 2.015 },
  { id: 'visa-biz-debit',    label: 'Visa business debit', floor: 0.320, defaultRate: 0.365 },
  { id: 'auth-fee',          label: 'Auth fee',            floor: 0,     defaultRate: 3, isFlat: true },
]

const MARGIN_TARGET = 13 // %

const OFFERS = [
  { id: 'tac', label: 'TAC', desc: 'Terminal Acquisition Contribution — helps offset terminal hardware costs.' },
  { id: 'free-month', label: 'First month free', desc: 'Waive the first monthly charge for the merchant.' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcRowFlag(rate: RateDef, value: number): 'green' | 'orange' | 'red' {
  if (rate.isFlat) return 'green'
  if (value >= rate.floor) return 'green'
  if (value >= rate.floor - 0.1) return 'orange'
  return 'red'
}

const FLAG_COLOURS = { green: '#2e7d5a', orange: '#E07B39', red: '#c0392b' }

// Per-rate margin display: scales with card turnover relative to the floor
function calcDisplayMarginPct(rate: RateDef, val: number, cardTurnover = 25): string {
  if (rate.isFlat) return ''
  return Math.max(0.01, (val - rate.floor + 1.0) * cardTurnover / 25).toFixed(2)
}

// Estimated transaction fee for a £20 transaction (in pence)
function calcEstFee(rates: Record<string, number>, turnovers: Record<string, number>): string {
  const TX_PENCE = 2000
  let total = 0
  HEADLINE_RATES.forEach(r => {
    const val = rates[r.id] ?? r.defaultRate
    if (r.isFlat) {
      total += val
    } else {
      const t = turnovers[r.id] ?? 25
      total += (val / 100) * (t / 100) * TX_PENCE
    }
  })
  return `${total.toFixed(1)}p`
}

function calcDealMargin(rates: Record<string, number>): number {
  // Weighted simple average vs target
  const rateables = HEADLINE_RATES.filter(r => !r.isFlat)
  const avg = rateables.reduce((sum, r) => sum + (rates[r.id] ?? r.defaultRate), 0) / rateables.length
  // Map avg rate to margin %: 0.9% avg rate ≈ MARGIN_TARGET %
  return Math.round((avg / 0.9) * MARGIN_TARGET * 10) / 10
}

function marginDotColour(margin: number): string {
  if (margin >= MARGIN_TARGET) return '#2e7d5a'
  if (margin >= 8) return '#E07B39'
  return '#c0392b'
}

// ── Component ─────────────────────────────────────────────────────────────────

interface ProductSelectionPanelProps {
  isOpen: boolean
  productNumber: number
  onClose: () => void
  onComplete: () => void
  onAddProduct: () => void
  onDelete: () => void
  onProductNameChange?: (name: string) => void
}

export function ProductSelectionPanel({
  isOpen,
  productNumber,
  onClose,
  onComplete,
  onAddProduct,
  onDelete,
  onProductNameChange,
}: ProductSelectionPanelProps) {
  // Step 1
  const [productType, setProductType] = useState<ProductType>('')
  // Step 2
  const [selectedProductId, setSelectedProductId] = useState('')
  const [qty, setQty] = useState(1)
  const [configOptions, setConfigOptions] = useState<string[]>([])
  const [upgrades, setUpgrades] = useState<Record<string, number>>({}) // id -> qty
  // Step 3
  const [pricingPlan, setPricingPlan] = useState<'simplicity' | 'custom' | ''>('')
  const [customRates, setCustomRates] = useState<Record<string, number>>(() =>
    Object.fromEntries(HEADLINE_RATES.map(r => [r.id, r.isFlat ? r.defaultRate : parseFloat((r.floor + 0.05).toFixed(3))]))
  )
  const [customFee, setCustomFee] = useState(89)
  const [cardTurnovers, setCardTurnovers] = useState<Record<string, number>>(() =>
    Object.fromEntries(HEADLINE_RATES.filter(r => !r.isFlat).map(r => [r.id, 25]))
  )
  const [lockedRates, setLockedRates] = useState<string[]>([])
  // Step 4
  const [selectedOffers, setSelectedOffers] = useState<string[]>([])

  // Reset all state when panel opens for a fresh product
  useEffect(() => {
    setProductType('')
    setSelectedProductId('')
    setQty(1)
    setConfigOptions([])
    setUpgrades({})
    setPricingPlan('')
    setCustomRates(Object.fromEntries(HEADLINE_RATES.map(r => [r.id, r.isFlat ? r.defaultRate : parseFloat((r.floor + 0.05).toFixed(3))])))
    setCustomFee(89)
    setCardTurnovers(Object.fromEntries(HEADLINE_RATES.filter(r => !r.isFlat).map(r => [r.id, 25])))
    setLockedRates([])
    setSelectedOffers([])
  }, [productNumber])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const products = productType ? (PRODUCTS[productType] ?? []) : []
  const selectedProduct = products.find(p => p.id === selectedProductId) ?? null

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const isComplete = productType !== '' && selectedProductId !== '' && pricingPlan !== ''

  // Margin calculations for Custom plan
  const dealMargin = calcDealMargin(customRates)
  const hasLowMargin = HEADLINE_RATES.filter(r => !r.isFlat).some(
    r => calcRowFlag(r, customRates[r.id] ?? r.defaultRate) !== 'green'
  )

  function toggleConfigOption(id: string) {
    setConfigOptions(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function toggleUpgrade(id: string) {
    setUpgrades(prev => {
      const next = { ...prev }
      if (next[id] !== undefined) { delete next[id] } else { next[id] = 1 }
      return next
    })
  }

  function setUpgradeQty(id: string, q: number) {
    setUpgrades(prev => ({ ...prev, [id]: q }))
  }

  function toggleOffer(id: string) {
    setSelectedOffers(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function balanceRates() {
    // Only adjust unlocked rates to slightly above floor
    setCustomRates(prev => {
      const next = { ...prev }
      HEADLINE_RATES.forEach(r => {
        if (!lockedRates.includes(r.id)) {
          next[r.id] = r.isFlat ? r.defaultRate : parseFloat((r.floor + 0.05).toFixed(3))
        }
      })
      return next
    })
  }

  function handleRateChange(id: string, raw: string) {
    const v = parseFloat(raw)
    if (!isNaN(v)) setCustomRates(prev => ({ ...prev, [id]: v }))
  }

  function handleCardTurnoverChange(id: string, raw: string) {
    const v = parseFloat(raw)
    if (!isNaN(v) && v >= 0 && v <= 100) setCardTurnovers(prev => ({ ...prev, [id]: v }))
  }

  function toggleLock(id: string) {
    setLockedRates(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  // ── Render helpers ──────────────────────────────────────────────────────────

  function renderDisclosureHeader(label: string, locked: boolean) {
    return (
      <div className={locked ? disclosureHeaderLocked : disclosureHeader}>
        <div className={sectionTitleLeft}>
          <CaretDownIcon size={12} color="#E07B39" weight="bold" />
          <span className={sectionTitleText}>{label}</span>
        </div>
      </div>
    )
  }

  function renderPricingTable(opts: { plan: 'simplicity' | 'custom'; interactive: boolean }) {
    const { plan, interactive } = opts
    // Simplicity uses rates that are all safely above floor; Custom uses the user-editable rates
    const simplicityRates = Object.fromEntries(
      HEADLINE_RATES.map(r => [r.id, r.isFlat ? r.defaultRate : Math.max(r.floor + 0.05, r.defaultRate)])
    )
    const activeRates = plan === 'simplicity' ? simplicityRates : customRates
    const fee = interactive ? customFee : (plan === 'custom' ? customFee : (selectedProduct?.price ?? 89))
    const margin = interactive ? dealMargin : (plan === 'custom' ? dealMargin : MARGIN_TARGET + 2)
    const marginDotForProduct = interactive || plan === 'custom'
      ? FLAG_COLOURS[dealMargin >= MARGIN_TARGET ? 'green' : dealMargin >= 8 ? 'orange' : 'red']
      : FLAG_COLOURS.green
    const marginPctForProduct = interactive || plan === 'custom' ? `${dealMargin.toFixed(1)}%` : '1.02%'

    return (
      <>
        {/* Tuza Pricing Agent block — Custom plan only when selected and interactive */}
        {interactive && (
          <div className={agentBlock}>
            <div className={agentHeader}>
              <AsteriskIcon size={14} color={themeVars.foregroundColour.foregroundAccent} weight="bold" />
              <span className={agentTitle}>Tuza Pricing Agent</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div className={agentObjectiveLabel}>Pricing objective</div>
              <div className={agentObjectiveText}>
                <strong>Target deal net margin is {MARGIN_TARGET}%.</strong>{' '}
                Your objective is to ensure this deal achieves a positive net margin across all transaction types.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className={marginLabel}>Current deal margin</div>
              <div className={marginValueRow}>
                <span className={marginDot} style={{ backgroundColor: marginDotColour(margin) }} />
                <span className={marginValue}>{margin}%</span>
              </div>
              <div className={marginBarTrack}>
                <div
                  className={marginBarFill}
                  style={{ width: `${Math.min(100, (margin / 26) * 100)}%` }}
                />
                <div className={marginBarMidpoint} />
              </div>
            </div>

            {hasLowMargin && (
              <div className={updatesRequired}>
                <div className={updatesRequiredLabel}>Updates required</div>
                <div className={updatesRequiredText}>
                  One or more rates are below the minimum margin threshold. Raise the rates or click Balance rates to automatically adjust the unlocked rates.
                </div>
                <Button variant="secondary" onClick={balanceRates}>Balance rates</Button>
              </div>
            )}
          </div>
        )}

        <div className={pricingTableWrapper} style={interactive ? { borderBottom: '1px solid #d5ddea' } : undefined}>
          {/* Product charges table */}
          <div>
            <div className={pricingTableTitle}>Product charges</div>
            <table className={pricingTable}>
              <thead>
                <tr>
                  <th className={pricingTableHead}>Product</th>
                  <th className={pricingTableHeadRight} style={{ width: 80 }}>Quantity</th>
                  <th className={pricingTableHeadRight} style={{ width: 110 }}>Margin</th>
                  <th className={pricingTableHeadRight} style={{ width: 140 }}>Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={pricingTableCell}>{selectedProduct?.name ?? '—'}</td>
                  <td className={pricingTableCellRight}>{qty}</td>
                  <td className={pricingTableCellRight}>
                    <span className={marginIndicator}>
                      <span className={flagDot} style={{ backgroundColor: marginDotForProduct }} />
                      <span className={marginIndicatorText}>{marginPctForProduct}</span>
                    </span>
                  </td>
                  <td className={pricingTableCellRight}>
                    {interactive ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                        <input
                          className={rateInput}
                          style={{ width: 60 }}
                          value={customFee}
                          onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v)) setCustomFee(v) }}
                        />
                        <span style={{ fontSize: 13, color: '#5475ab' }}>/ mo</span>
                      </span>
                    ) : (
                      `£${fee}.00 / month`
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Headline rates table */}
          <div>
            <div className={pricingTableTitle}>Headline rates</div>
            {interactive ? (
              /* ── Custom plan: full editable table with Card Turnover + lock ── */
              <table className={pricingTable}>
                <thead>
                  <tr>
                    <th className={pricingTableHead}>Rate</th>
                    <th className={pricingTableHeadRight} style={{ width: 100 }}>Card Turnover</th>
                    <th className={pricingTableHeadRight} style={{ width: 80 }}>Margin</th>
                    <th className={pricingTableHeadRight} style={{ width: 120 }}>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {HEADLINE_RATES.map(rate => {
                    const val = activeRates[rate.id] ?? rate.defaultRate
                    const flag = calcRowFlag(rate, val)
                    const turnover = cardTurnovers[rate.id] ?? 25
                    const displayPct = calcDisplayMarginPct(rate, val, turnover)
                    const isLocked = lockedRates.includes(rate.id)
                    const isError = !rate.isFlat && flag === 'red'
                    return (
                      <tr key={rate.id} className={isLocked ? lockedTableRow : undefined}>
                        <td className={pricingTableCell}>{rate.label}</td>

                        {/* Card Turnover cell */}
                        <td className={pricingTableCellRight}>
                          {rate.isFlat ? (
                            <span className={marginIndicatorText}>–</span>
                          ) : (
                            <div className={`${rateInputWrapper}${isLocked ? ` ${rateInputWrapperLocked}` : ''}`}>
                              <input
                                className={rateInputInner}
                                value={turnover}
                                readOnly={isLocked}
                                onChange={e => handleCardTurnoverChange(rate.id, e.target.value)}
                              />
                              <span className={rateInputUnit}>%</span>
                            </div>
                          )}
                        </td>

                        {/* Margin cell */}
                        <td className={pricingTableCellRight}>
                          {rate.isFlat ? (
                            <span className={marginIndicator}>
                              <span className={flagDot} style={{ backgroundColor: FLAG_COLOURS.green }} />
                              <span className={marginIndicatorText}>1.02%</span>
                            </span>
                          ) : (
                            <span className={marginIndicator}>
                              <span className={flagDot} style={{ backgroundColor: FLAG_COLOURS[flag] }} />
                              <span className={marginIndicatorText}>{displayPct}%</span>
                            </span>
                          )}
                        </td>

                        {/* Rate input + lock button */}
                        <td className={pricingTableCellRight}>
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                            <div className={`${rateInputWrapper}${isError ? ` ${rateInputWrapperError}` : ''}${isLocked ? ` ${rateInputWrapperLocked}` : ''}`}>
                              <input
                                className={`${rateInputInner}${isError ? ` ${rateInputInnerError}` : ''}`}
                                value={val}
                                readOnly={isLocked}
                                onChange={e => handleRateChange(rate.id, e.target.value)}
                              />
                              <span className={rateInputUnit}>{rate.isFlat ? 'p' : '%'}</span>
                            </div>
                            <button
                              type="button"
                              className={clsx(lockBtn, isLocked && lockBtnLocked)}
                              onClick={() => toggleLock(rate.id)}
                              title={isLocked ? 'Unlock rate' : 'Lock rate'}
                            >
                              {isLocked
                                ? <LockKeyIcon size={14} weight="bold" />
                                : <LockOpenIcon size={14} weight="bold" />}
                            </button>
                          </span>
                        </td>
                      </tr>
                    )
                  })}

                  {/* Est. transaction fee row */}
                  <tr>
                    <td className={pricingTableCell} colSpan={3} style={{ color: '#4367a2' }}>
                      Est. transaction fee{' '}
                      <span style={{ color: '#5475ab' }}>(based on £20 transaction)</span>
                    </td>
                    <td className={pricingTableCellRight} style={{ color: '#4367a2' }}>
                      {calcEstFee(activeRates, cardTurnovers)}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              /* ── Simplicity plan: read-only summary ── */
              <table className={pricingTable}>
                <thead>
                  <tr>
                    <th className={pricingTableHead}>Rate</th>
                    <th className={pricingTableHeadRight} style={{ width: 90 }}>Margin</th>
                    <th className={pricingTableHeadRight} style={{ width: 90 }}>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {HEADLINE_RATES.map(rate => {
                    const val = activeRates[rate.id] ?? rate.defaultRate
                    const flag = calcRowFlag(rate, val)
                    const turnover = cardTurnovers[rate.id] ?? 25
                    const displayPct = calcDisplayMarginPct(rate, val, turnover)
                    return (
                      <tr key={rate.id}>
                        <td className={pricingTableCell}>{rate.label}</td>
                        <td className={pricingTableCellRight}>
                          {rate.isFlat ? (
                            <span className={marginIndicatorText}>–</span>
                          ) : (
                            <span className={marginIndicator}>
                              <span className={flagDot} style={{ backgroundColor: FLAG_COLOURS[flag] }} />
                              <span className={marginIndicatorText}>{displayPct}%</span>
                            </span>
                          )}
                        </td>
                        <td className={pricingTableCellRight}>
                          {rate.isFlat ? `${val}p` : `${val.toFixed(3)}%`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Show all link — only when Custom plan is active/editable */}
          {interactive ? (
            <div style={{ display: 'inline-block', marginTop: -8 }}>
              <TextLink onClick={() => {}}>Show all other rates and charges</TextLink>
            </div>
          ) : (
            <span style={{ display: 'inline-block', marginTop: -8, fontSize: 13, color: '#5475ab' }}>
              Show all other rates and charges
            </span>
          )}
        </div>

        {/* Total costs — separate section below tables, only when this plan is selected */}
        {interactive && selectedProduct && (() => {
          const productCharge = customFee * qty
          const additionalCharge = 75
          const estFees = 300
          const total = productCharge + additionalCharge + estFees
          return (
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: `'Denim', sans-serif`, fontWeight: 500, fontSize: 14, lineHeight: '20px', color: '#062351' }}>
                Total costs
              </div>
              <table className={pricingTable}>
                <tbody>
                  <tr>
                    <td className={pricingTableCell}>Product charges</td>
                    <td className={pricingTableCellRight} style={{ color: '#4367a2' }}>£{productCharge}.00 / month</td>
                  </tr>
                  <tr>
                    <td className={pricingTableCell}>Additional charges</td>
                    <td className={pricingTableCellRight} style={{ color: '#4367a2' }}>£{additionalCharge}.00 / month</td>
                  </tr>
                  <tr>
                    <td className={pricingTableCell}>Est. fees (based on £200,000 card turnover)</td>
                    <td className={pricingTableCellRight} style={{ color: '#4367a2' }}>£{estFees}.00 / month</td>
                  </tr>
                  <tr>
                    <td className={pricingTableCell} style={{ backgroundColor: '#eef1f6', fontWeight: 500 }}>Total</td>
                    <td className={pricingTableCellRight} style={{ backgroundColor: '#eef1f6', fontWeight: 500, color: '#4367a2' }}>£{total}.00 / month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        })()}
      </>
    )
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
      <div className={panel}>

        <div className={panelContent}>
          {/* Header */}
          <div className={panelHeader}>
            <span className={panelHeaderTitle}>
              Product Selection:{' '}
              <span className={panelHeaderTitleAccent}>
                Product #{productNumber}{selectedProduct ? ` – ${selectedProduct.name}` : ''}
              </span>
            </span>
            <button
              type="button"
              className={deleteBtn}
              onClick={() => setShowDeleteModal(true)}
              title="Delete this product"
            >
              <TrashSimpleIcon size={14} />
            </button>
          </div>

          {/* ── Section 1: Select a product type ─────────────────────────────── */}
          <div className={disclosureSection}>
            {renderDisclosureHeader('Select a product type', false)}
            <div className={disclosureContent}>
              <div className={radioCardList}>
                {PRODUCT_TYPES.map(pt => {
                  const selected = productType === pt.id
                  return (
                    <div
                      key={pt.id}
                      className={`${radioCard}${selected ? ` ${radioCardSelected}` : ''}`}
                      onClick={() => {
                        setProductType(pt.id)
                        setSelectedProductId('')
                        setConfigOptions([])
                        setUpgrades({})
                        setPricingPlan('')
                      }}
                    >
                      <div className={`${radioCircle}${selected ? ` ${radioCircleSelected}` : ''}`}>
                        {selected && <div className={radioCircleDot} />}
                      </div>
                      <div className={radioCardBody}>
                        <div className={radioCardTitle}>{pt.label}</div>
                        <div className={radioCardDesc}>{pt.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── Section 2: Select a product ───────────────────────────────────── */}
          <div className={disclosureSection}>
            {renderDisclosureHeader('Select a product', !productType)}
            {productType && (
              <div className={disclosureContent}>
                <div className={productCardList}>
                  {products.map(prod => {
                    const selected = selectedProductId === prod.id
                    return (
                      <div
                        key={prod.id}
                        className={`${productCard}${selected ? ` ${productCardSelected}` : ''}`}
                      >
                        {/* Card top row */}
                        <div
                          className={productCardTop}
                          onClick={() => {
                            setSelectedProductId(prod.id)
                            setConfigOptions([])
                            setUpgrades({})
                            setPricingPlan('')
                            onProductNameChange?.(prod.name)
                          }}
                        >
                          <div className={productCardDetails}>
                            <div className={productCardNameRow}>
                              <div className={`${radioCircle}${selected ? ` ${radioCircleSelected}` : ''}`}>
                                {selected && <div className={radioCircleDot} />}
                              </div>
                              <span className={productCardTitle}>{prod.name}</span>
                            </div>
                            <div className={productCardDesc}>{prod.desc}</div>
                            <div className={productTagGroup}>
                              {prod.tags.map(t => <span key={t} className={productTag}>{t}</span>)}
                            </div>
                            <div className={productPriceRow}>
                              <span className={productPrice}>From £{prod.price}.00 / month</span>
                              {selected && (
                                <select
                                  className={productQtySelect}
                                  value={qty}
                                  onClick={e => e.stopPropagation()}
                                  onChange={e => setQty(parseInt(e.target.value))}
                                >
                                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                              )}
                            </div>
                          </div>
                          <div className={productCardImage}>{prod.emoji}</div>
                        </div>

                        {/* Expanded sections for selected product */}
                        {selected && (prod.configOptions.length > 0 || prod.upgrades.length > 0) && (
                          <>
                            <div className={productCardDivider} />

                            {prod.configOptions.length > 0 && (
                              <div className={productSubSection}>
                                <div className={sectionTitleLeft}>
                                  <CaretDownIcon size={12} color="#E07B39" weight="bold" />
                                  <span className={sectionTitleText}>Configure this product</span>
                                </div>
                                <div className={configCardList}>
                                  {prod.configOptions.map(opt => {
                                    const checked = configOptions.includes(opt.id)
                                    return (
                                      <div
                                        key={opt.id}
                                        className={`${configCard}${checked ? ` ${configCardSelected}` : ''}`}
                                        onClick={() => toggleConfigOption(opt.id)}
                                      >
                                        <div className={`${checkbox}${checked ? ` ${checkboxChecked}` : ''}`}>
                                          {checked && <CheckIcon size={10} color="white" weight="bold" />}
                                        </div>
                                        <div className={configCardBody}>
                                          <div className={configCardTitle}>{opt.label}</div>
                                          <div className={configCardDesc}>{opt.desc}</div>
                                        </div>
                                        <div className={configCardImage}>🖥️</div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}

                            {prod.upgrades.length > 0 && (
                              <div className={productSubSection}>
                                <div className={sectionTitleLeft}>
                                  <CaretDownIcon size={12} color="#E07B39" weight="bold" />
                                  <span className={sectionTitleText}>Upgrade this product</span>
                                </div>
                                <div className={configCardList}>
                                  {prod.upgrades.map(upg => {
                                    const selected = upgrades[upg.id] !== undefined
                                    return (
                                      <div
                                        key={upg.id}
                                        className={`${configCard}${selected ? ` ${configCardSelected}` : ''}`}
                                        onClick={() => toggleUpgrade(upg.id)}
                                      >
                                        <div className={`${checkbox}${selected ? ` ${checkboxChecked}` : ''}`}>
                                          {selected && <CheckIcon size={10} color="white" weight="bold" />}
                                        </div>
                                        <div className={configCardBody}>
                                          <div className={configCardTitle}>{upg.label}</div>
                                          <div className={configCardDesc}>{upg.desc}</div>
                                          <div className={upgradeCardPrice}>£{upg.price}.00 / month</div>
                                          {selected && (
                                            <div className={upgradeQtyWrapper} onClick={e => e.stopPropagation()}>
                                              <span className={upgradeQtyLabel}>Qty</span>
                                              <select
                                                className={productQtySelect}
                                                value={upgrades[upg.id]}
                                                onChange={e => setUpgradeQty(upg.id, parseInt(e.target.value))}
                                              >
                                                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                              </select>
                                            </div>
                                          )}
                                        </div>
                                        <div className={configCardImage}>🖥️</div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Section 3: Select pricing plan ────────────────────────────────── */}
          <div className={disclosureSection}>
            {renderDisclosureHeader('Select pricing plan', !selectedProductId)}
            {selectedProductId && (
              <div className={disclosureContent}>
                <div className={pricingPlanList}>

                  {/* Simplicity plan — tables always visible, read-only */}
                  <div className={`${pricingPlanCard}${pricingPlan === 'simplicity' ? ` ${pricingPlanCardSelected}` : ''}`}>
                    <div
                      className={pricingPlanHeader}
                      style={{ borderBottom: `1px solid #d5ddea` }}
                      onClick={() => setPricingPlan('simplicity')}
                    >
                      <div className={`${radioCircle}${pricingPlan === 'simplicity' ? ` ${radioCircleSelected}` : ''}`}
                        style={{ marginTop: 2, flexShrink: 0 }}>
                        {pricingPlan === 'simplicity' && <div className={radioCircleDot} />}
                      </div>
                      <div>
                        <div className={pricingPlanName}>Simplicity</div>
                        <div className={pricingPlanDesc}>Simply, predictable pricing</div>
                      </div>
                    </div>
                    {renderPricingTable({ plan: 'simplicity', interactive: false })}
                  </div>

                  {/* Custom plan — tables always visible; editable + agent block only when selected */}
                  <div className={`${pricingPlanCard}${pricingPlan === 'custom' ? ` ${pricingPlanCardSelected}` : ''}`}>
                    <div
                      className={pricingPlanHeader}
                      style={{ borderBottom: `1px solid #d5ddea` }}
                      onClick={() => setPricingPlan('custom')}
                    >
                      <div className={`${radioCircle}${pricingPlan === 'custom' ? ` ${radioCircleSelected}` : ''}`}
                        style={{ marginTop: 2, flexShrink: 0 }}>
                        {pricingPlan === 'custom' && <div className={radioCircleDot} />}
                      </div>
                      <div>
                        <div className={pricingPlanName}>Custom</div>
                        <div className={pricingPlanDesc}>Custom, bespoke pricing</div>
                      </div>
                    </div>
                    {renderPricingTable({ plan: 'custom', interactive: pricingPlan === 'custom' })}
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* ── Section 4: Select offers ──────────────────────────────────────── */}
          <div className={disclosureSection}>
            {renderDisclosureHeader('Select offers', !pricingPlan)}
            {pricingPlan && (
              <div className={disclosureContent}>
                <div className={offerList}>
                  {OFFERS.map(offer => {
                    const checked = selectedOffers.includes(offer.id)
                    return (
                      <div
                        key={offer.id}
                        className={`${offerCard}${checked ? ` ${offerCardSelected}` : ''}`}
                        onClick={() => toggleOffer(offer.id)}
                      >
                        <div className={`${checkbox}${checked ? ` ${checkboxChecked}` : ''}`}>
                          {checked && <CheckIcon size={10} color="white" weight="bold" />}
                        </div>
                        <div className={configCardBody}>
                          <div className={configCardTitle}>{offer.label}</div>
                          <div className={configCardDesc}>{offer.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <div className={panelFooter}>
          <Button variant="secondary" onClick={onClose}>Save &amp; close</Button>
          {isComplete && (
            <Button
              variant="secondary"
              onClick={() => { onAddProduct() }}
            >
              <PlusIcon size={14} weight="bold" />
              {' '}Add another product
            </Button>
          )}
          <Button onClick={onComplete} isDisabled={!isComplete}>Complete section</Button>
        </div>

      </div>

      {/* ── Delete confirmation modal ────────────────────────────────────── */}
      {showDeleteModal && createPortal(
        <div className={modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div className={modalBox} onClick={e => e.stopPropagation()}>
            <div>
              <div className={modalTitle}>Delete Product #{productNumber}?</div>
              <div className={modalBody} style={{ marginTop: 4 }}>
                The product and configuration will be deleted and cannot be recovered.
              </div>
            </div>
            <div className={modalButtons}>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button
                variant="warning"
                onClick={() => { setShowDeleteModal(false); onDelete() }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
