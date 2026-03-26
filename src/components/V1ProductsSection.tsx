import { useState, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import {
  CaretDownIcon, CaretDoubleDownIcon, AsteriskIcon, CheckIcon, PencilSimpleIcon, TrashIcon,
  LockKeyIcon, LockOpenIcon, LockSimpleIcon,
} from '@phosphor-icons/react'
import { Button } from '#ui/Button/Button'
import { TextLink } from '#ui/TextLink/TextLink'
import { sectionTitleLeft, sectionTitleText } from './BusinessInfoPanel.css'
import {
  disclosureSection, disclosureHeader, disclosureHeaderLocked, disclosureContent,
  radioCardList, radioCard, radioCardSelected,
  radioCircle, radioCircleSelected, radioCircleDot, radioCardBody, radioCardTitle, radioCardDesc,
  productCardList, productCard, productCardSelected, productCardTop, productCardDetails,
  productCardNameRow, productCardTitle, productCardDesc, productTagGroup, productTag,
  productPriceRow, productPrice, productQtySelect, productCardImage,
  productCardDivider, productSubSection,
  configCardList, configCard, configCardSelected, checkbox, checkboxChecked,
  configCardBody, configCardTitle, configCardDesc, configCardImage,
  upgradeCardPrice, upgradeQtyWrapper, upgradeQtyLabel,
  pricingPlanList, pricingPlanCard, pricingPlanCardSelected,
  pricingPlanHeader, pricingPlanHeaderLeft, pricingPlanName, pricingPlanDesc,
  pricingPlanContractTag, pricingTableFootnote,
  agentHeader, agentTitle,
  agentObjectiveLabel, agentObjectiveText,
  marginLabel, marginValueRow, marginDot, marginValue,
  marginBarTrack, marginBarFill, marginBarMidpoint,
  updatesRequired, updatesRequiredLabel, updatesRequiredText,
  pricingTableWrapper, pricingTableTitle, pricingTable,
  pricingTableHead, pricingTableHeadRight,
  pricingTableCell, pricingTableCellRight,
  rateInput, rateInputWrapper, rateInputWrapperError, rateInputWrapperLocked,
  rateInputInner, rateInputInnerError, rateInputUnit,
  lockBtn, lockBtnLocked, lockedTableRow,
  flagDot, marginIndicator, marginIndicatorText,
  offerList, offerCard, offerCardSelected,
} from './ProductSelectionPanel.css'
import * as s from './V1ProductsSection.css'
import { themeVars } from '../theme/theme.css'
import type { ProductsVoicePatch } from '../voice/fieldSchemas'

// ── Streamed agent (asterisk → typewriter → action) ───────────────────────────

type AgentStreamPhase = 'idle' | 'loading' | 'typing' | 'ready'

/** Brief spinner-only beat before typewriter starts (no asterisk until complete). */
const AGENT_LOADING_MS = 450
const AGENT_CHAR_MS = 14

function useStreamedAgent(fullMessage: string, active: boolean, opts?: { instant?: boolean }) {
  const instant = opts?.instant ?? false
  const [phase, setPhase] = useState<AgentStreamPhase>('idle')
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (!active) {
      setPhase('idle')
      setCharCount(0)
      return
    }
    if (instant) {
      setPhase('ready')
      setCharCount(fullMessage.length)
      return
    }
    setPhase('loading')
    setCharCount(0)
    const t = setTimeout(() => setPhase('typing'), AGENT_LOADING_MS)
    return () => clearTimeout(t)
  }, [active, fullMessage, instant])

  useEffect(() => {
    if (instant) return
    if (phase !== 'typing') return
    if (charCount >= fullMessage.length) {
      setPhase('ready')
      return
    }
    const t = setTimeout(() => setCharCount(c => c + 1), AGENT_CHAR_MS)
    return () => clearTimeout(t)
  }, [instant, phase, charCount, fullMessage])

  const displayText =
    phase === 'idle' || phase === 'loading' ? '' : fullMessage.slice(0, charCount)

  /** Asterisk animates while loading and typing; static after `ready`. */
  const showAgentAsteriskAnimated = !instant && (phase === 'loading' || phase === 'typing')

  return { phase, displayText, showAgentAsteriskAnimated }
}

function RecommendationAgentWithAction({
  message,
  showAction,
  onConfirm,
  disabled,
  alreadyAdded,
}: {
  message: string
  showAction: boolean
  onConfirm: () => void
  disabled: boolean
  alreadyAdded: boolean
}) {
  const { phase, displayText, showAgentAsteriskAnimated } = useStreamedAgent(message, true, { instant: alreadyAdded })
  return (
    <>
      <div className={s.inlineRecommendation}>
        <div className={clsx(s.agentCardInline, !alreadyAdded && s.agentCardEnter)}>
          <div className={s.agentBadgeNoMargin}>
            <AsteriskIcon
              size={14}
              color={themeVars.foregroundColour.foregroundAccent}
              weight="bold"
              className={showAgentAsteriskAnimated ? s.pricingAgentAsteriskAnimated : undefined}
            />
            <span className={s.agentBadgeText}>
              Recommendation Agent
            </span>
          </div>
          {(phase === 'typing' || phase === 'ready') && (
            <p className={s.agentBodyTextSecondary}>
              {displayText}
            </p>
          )}
        </div>
      </div>
      {showAction && (
        <div className={s.confirmSection}>
          {phase === 'ready' ? (
            <Button onClick={onConfirm} isDisabled={disabled} className={s.agentActionPop}>
              Select product
            </Button>
          ) : (
            <div className={s.confirmSectionSpacer} aria-hidden />
          )}
        </div>
      )}
    </>
  )
}

// ── Types & Constants ──────────────────────────────────────────────────────────

type ProductType = 'card-terminal' | 'ecommerce' | 'epos' | ''

interface ConfigOption { id: string; label: string; desc: string }
interface UpgradeOption { id: string; label: string; desc: string; price: number }
interface ProductDef {
  id: string; name: string; desc: string; tags: string[]
  price: number; emoji: string
  configOptions: ConfigOption[]; upgrades: UpgradeOption[]
  recommendationText?: string
}

const PRODUCT_TYPES = [
  { id: 'card-terminal' as const, label: 'Card terminals', desc: 'Accept payments face to face with portable card readers' },
  { id: 'epos'          as const, label: 'EPOS',           desc: 'Full point of sale systems with payments processing' },
  { id: 'ecommerce'     as const, label: 'Ecommerce',      desc: 'Accept online payments through your website or app' },
]

const PRODUCTS: Record<string, ProductDef[]> = {
  'card-terminal': [
    { id: 'terminal-portable', name: 'Portable Terminal',  desc: 'Portable card machine with 4G connectivity and next-day settlement', tags: ['1 day payout', 'WiFi, 4G', 'Contactless'],     price: 19, emoji: '💳',
      configOptions: [
        { id: 'conn-wifi', label: 'WiFi only', desc: 'Connects via WiFi for countertop use' },
        { id: 'conn-4g',   label: 'WiFi + 4G', desc: 'Connects via WiFi or 4G for portable use' },
      ],
      upgrades: [
        { id: 'charging-base', label: 'Charging base', desc: 'Keep your terminal charged and ready on the counter.', price: 15 },
      ],
    },
    { id: 'terminal-compact',  name: 'Compact Reader',     desc: 'Compact Bluetooth card reader, pairs with phone or tablet',          tags: ['Next-day payout', 'Bluetooth', 'Contactless'], price: 0,  emoji: '📲',
      configOptions: [
        { id: 'colour-black', label: 'Black', desc: 'Matte black compact reader' },
        { id: 'colour-white', label: 'White', desc: 'Matte white compact reader' },
      ],
      upgrades: [],
    },
    { id: 'terminal-standard', name: 'Standard Terminal',  desc: 'Fast and reliable card reader with long battery life',                tags: ['1–2 day payout', 'Bluetooth', 'Contactless'], price: 29, emoji: '💳',
      configOptions: [
        { id: 'conn-wifi', label: 'WiFi only', desc: 'Connects via WiFi for countertop use' },
        { id: 'conn-4g',   label: 'WiFi + 4G', desc: 'Connects via WiFi or 4G for portable use' },
      ],
      upgrades: [
        { id: 'charging-base', label: 'Charging base', desc: 'Keep your terminal charged and ready on the counter.', price: 15 },
      ],
    },
  ],
  'ecommerce': [
    { id: 'gateway-standard', name: 'Payment Gateway Standard', desc: 'Hosted payment page with fraud protection and 3D Secure',            tags: ['1 day payout', 'API access', '3D Secure'],                   price: 19, emoji: '🌐', configOptions: [], upgrades: [] },
    { id: 'gateway-pro',      name: 'Payment Gateway Pro',      desc: 'Full API integration with advanced reporting and multi-currency',    tags: ['1 day payout', 'API access', 'Multi-currency', 'Reporting'], price: 49, emoji: '🌐', configOptions: [], upgrades: [] },
  ],
  'epos': [
    {
      id: 'epos-lite', name: 'EPOS Lite', desc: 'Countertop terminal with integrated EPOS software',
      tags: ['1 day payout', 'WiFi, 4G, 3G', 'Tips'], price: 89, emoji: '🖥️',
      configOptions: [],
      upgrades: [
        { id: 'kds',         label: 'Kitchen Display System (KDS)',    desc: 'View and manage orders in real-time from the kitchen.', price: 89 },
        { id: 'countertop',  label: 'Countertop card machine',        desc: 'Countertop payment terminal in a compact design.', price: 89 },
      ],
    },
    {
      id: 'epos-pro', name: 'EPOS Pro', desc: 'DX8000 card machine with Yabie EPOS installed',
      tags: ['1 day payout', 'WiFi, 4G, 3G', 'Tips'], price: 89, emoji: '🖥️',
      configOptions: [
        { id: 'display-10', label: '10" Display', desc: 'Countertop POS with EPOS software and integrated terminal' },
        { id: 'display-15', label: '15" Display', desc: 'Countertop POS with EPOS software and integrated terminal' },
      ],
      upgrades: [
        { id: 'kds',         label: 'Kitchen Display System (KDS)',    desc: 'View and manage orders in real-time from the kitchen.', price: 89 },
        { id: 'countertop',  label: 'Countertop card machine',        desc: 'Countertop payment terminal in a compact design.', price: 89 },
      ],
      recommendationText: 'As a pizza and pasta restaurant with lots of £20 orders, you\'ll want quick, reliable in-person payments that can keep service moving and make tipping easy. EPOS Pro is a great fit for taking payments at the counter or tableside, with tip acceptance and offline mode so you can still take payments even if your connection drops.',
    },
  ],
}

interface RateDef { id: string; label: string; floor: number; defaultRate: number; isFlat?: boolean }

const HEADLINE_RATES: RateDef[] = [
  { id: 'consumer-debit',    label: 'Consumer debit',      floor: 0.380, defaultRate: 0.320 },
  { id: 'consumer-credit',   label: 'Consumer credit',     floor: 0.900, defaultRate: 0.939 },
  { id: 'commercial-credit', label: 'Commercial credit',   floor: 1.900, defaultRate: 2.015 },
  { id: 'visa-biz-debit',    label: 'Visa business debit', floor: 0.320, defaultRate: 0.365 },
  { id: 'auth-fee',          label: 'Auth fee',            floor: 0,     defaultRate: 3,     isFlat: true },
]

const MARGIN_TARGET = 13

/** Optional add-ons selected per product during configuration (distinct from contract-level offers). */
const PRODUCT_OFFERS = [
  { id: 'extended-warranty', label: 'Extended warranty', desc: 'Hardware cover beyond the standard period — replacement or repair included.' },
  { id: 'express-delivery',    label: 'Express delivery',  desc: 'Priority shipping so hardware arrives within two business days.' },
  { id: 'onboarding-training', label: 'Onboarding training', desc: 'One live session to train your team on setup and day-to-day use.' },
]

const OFFERS = [
  { id: 'tac',        label: 'TAC',              desc: 'Terminal Acquisition Contribution — helps offset terminal hardware costs.' },
  { id: 'free-month', label: 'First month free', desc: 'Waive the first monthly charge for the merchant.' },
]

const SIMPLICITY_RATES = Object.fromEntries(
  HEADLINE_RATES.map(r => [r.id, r.isFlat ? r.defaultRate : Math.max(r.floor + 0.05, r.defaultRate)])
)
const SIMPLICITY_TURNOVERS = Object.fromEntries(HEADLINE_RATES.filter(r => !r.isFlat).map(r => [r.id, 25]))

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcRowFlag(rate: RateDef, value: number): 'green' | 'orange' | 'red' {
  if (rate.isFlat) return 'green'
  if (value >= rate.floor) return 'green'
  if (value >= rate.floor - 0.1) return 'orange'
  return 'red'
}

const FLAG_COLOURS = { green: '#2e7d5a', orange: '#E07B39', red: '#c0392b' }

function calcDisplayMarginPct(rate: RateDef, val: number, cardTurnover = 25): string {
  if (rate.isFlat) return ''
  return Math.max(0.01, (val - rate.floor + 1.0) * cardTurnover / 25).toFixed(2)
}

function calcDealMargin(rates: Record<string, number>): number {
  const rateables = HEADLINE_RATES.filter(r => !r.isFlat)
  const avg = rateables.reduce((sum, r) => sum + (rates[r.id] ?? r.defaultRate), 0) / rateables.length
  return Math.round((avg / 0.9) * MARGIN_TARGET * 10) / 10
}

function marginDotColour(margin: number): string {
  if (margin >= MARGIN_TARGET) return '#2e7d5a'
  if (margin >= 8) return '#E07B39'
  return '#c0392b'
}

function calcEstFee(rates: Record<string, number>, turnovers: Record<string, number>): string {
  const TX_PENCE = 2000
  let total = 0
  HEADLINE_RATES.forEach(r => {
    const val = rates[r.id] ?? r.defaultRate
    if (r.isFlat) { total += val } else {
      const t = turnovers[r.id] ?? 25
      total += (val / 100) * (t / 100) * TX_PENCE
    }
  })
  return `${total.toFixed(1)}p`
}

function calcMonthlyFees(rates: Record<string, number>, turnovers: Record<string, number>, annualTurnover = 200000): number {
  const monthly = annualTurnover / 12
  const txCount = monthly / 20
  let total = 0
  HEADLINE_RATES.forEach(r => {
    const val = rates[r.id] ?? r.defaultRate
    if (r.isFlat) {
      total += (val / 100) * txCount
    } else {
      const split = (turnovers[r.id] ?? 25) / 100
      total += (val / 100) * split * monthly
    }
  })
  return Math.round(total)
}

// ── Section Card (matching Business Info style) ──────────────────────────────

function SectionCardProducts({ title, disabled, children }: { title: string; disabled?: boolean; children?: React.ReactNode }) {
  return (
    <div className={clsx(s.sectionCard, disabled && s.sectionCardDisabled)}>
      <div className={s.sectionCardHeader}>
        <CaretDoubleDownIcon size={12} color="#E07B39" weight="bold" />
        <span className={s.sectionCardTitleText}>
          {title}
        </span>
      </div>
      {children && (
        <div className={s.sectionCardContent}>
          {children}
        </div>
      )}
    </div>
  )
}

function ProductOffersSubsection({
  selectedIds,
  onToggle,
}: {
  selectedIds: string[]
  onToggle: (id: string) => void
}) {
  return (
    <div className={s.subSection}>
      <div className={s.subSectionTitleRow}>
        <CaretDoubleDownIcon size={12} color="#E07B39" weight="bold" />
        <span className={s.subSectionTitleText}>Select product offers</span>
      </div>
      <div className={offerList}>
        {PRODUCT_OFFERS.map(offer => {
          const checked = selectedIds.includes(offer.id)
          return (
            <div
              key={offer.id}
              className={clsx(offerCard, checked && offerCardSelected)}
              onClick={() => onToggle(offer.id)}
            >
              <div className={clsx(checkbox, checked && checkboxChecked)}>
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
  )
}

// ── Receipt Panel ─────────────────────────────────────────────────────────────

interface ReceiptProps {
  configuredProducts: ConfiguredProduct[]
  pricingPlan: 'simplicity' | 'custom' | ''
  customFee: number
  customRates: Record<string, number>
  cardTurnovers: Record<string, number>
  dealMargin: number
  hasLowMargin: boolean
  onBalanceRates: () => void
}

function TableRow({ label, value, isTotal }: { label: string; value: string; isTotal?: boolean }) {
  return (
    <div className={s.receiptRow}>
      <div className={clsx(s.receiptCell, isTotal && s.receiptCellTotal)}>{label}</div>
      <div className={clsx(s.receiptCellRight, isTotal && s.receiptCellTotal)}>{value}</div>
    </div>
  )
}

function MarginRow({ label, value, dotColor }: { label: string; value: string; dotColor?: string }) {
  return (
    <div className={s.receiptRow}>
      <div className={s.receiptCell}>{label}</div>
      <div className={s.receiptCellRight}>
        {dotColor ? (
          <div className={s.receiptDotWrapper}>
            <div className={s.receiptDot} style={{ background: dotColor }} />
            <span className={s.receiptDotText} style={{ color: dotColor }}>{value}</span>
          </div>
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  )
}

function ProductReceiptPanel({
  configuredProducts: cps, pricingPlan, customFee, customRates, cardTurnovers,
  dealMargin, hasLowMargin, onBalanceRates,
}: ReceiptProps) {
  const hasProducts = cps.length > 0
  const isFilled = hasProducts && pricingPlan !== ''

  const productCharges = cps.reduce((sum, cp) => {
    const def = Object.values(PRODUCTS).flat().find(p => p.id === cp.productId)
    if (!def) return sum
    const upgCost = def.upgrades
      .filter(u => cp.upgrades[u.id] !== undefined)
      .reduce((s, u) => s + u.price * (cp.upgrades[u.id] ?? 1), 0)
    return sum + def.price * cp.qty + upgCost
  }, 0)

  const additionalCharges = 75

  const activeRates    = pricingPlan === 'custom' ? customRates    : SIMPLICITY_RATES
  const activeTurnovers = pricingPlan === 'custom' ? cardTurnovers : SIMPLICITY_TURNOVERS

  const estFees = pricingPlan ? calcMonthlyFees(activeRates, activeTurnovers) : null
  const total = productCharges + additionalCharges + (estFees ?? 0)

  const fmt = (v: number) => `£${v.toFixed(2)}`
  const dash = '£–'

  const marginColor = dealMargin >= MARGIN_TARGET ? '#2e7d5a' : '#e7000b'

  const pricingAgentMessage =
    `Current margin is too low at ${dealMargin}%. Raise personal debit to at least 0.431%, or click Balance rates to automatically adjust the unlocked rates.`
  const agentStream = useStreamedAgent(pricingAgentMessage, isFilled && hasLowMargin)

  return (
    <div className={s.receiptWrapper}>
      <div className={s.receiptTitleBar}>
        <span className={s.receiptTitleText}>
          {isFilled ? 'Payment summary' : 'Pricing and margin summary'}
        </span>
      </div>

      <div className={s.receiptContentArea}>
        <div>
          <div className={s.receiptSectionTitle}>
            Total monthly costs
          </div>
          <div className={s.receiptTableBorder}>
            <TableRow label="Product charges" value={isFilled ? fmt(productCharges) : dash} />
            <TableRow label="Additional charges" value={isFilled ? fmt(additionalCharges) : dash} />
            <TableRow label="Est. fees (based on £200k card turnover)" value={isFilled && estFees !== null ? fmt(estFees) : dash} />
            <TableRow label="Total" value={isFilled ? `${fmt(total)} / month` : dash} isTotal />
          </div>
        </div>

        <div>
          <div className={s.receiptSectionTitle}>
            Margin
          </div>
          <div className={s.receiptTableBorder}>
            <MarginRow label="Target margin" value={isFilled ? `${MARGIN_TARGET}%` : '–%'} />
            <MarginRow
              label="Current margin"
              value={isFilled ? `${dealMargin}%` : '–%'}
              dotColor={isFilled ? marginColor : undefined}
            />
          </div>
        </div>

        {isFilled && hasLowMargin && (
          <div className={clsx(s.agentCardInline, s.agentCardEnter)}>
            <div className={s.agentBadgeNoMargin}>
              <AsteriskIcon
                size={14}
                color={themeVars.foregroundColour.foregroundAccent}
                weight="bold"
                className={agentStream.showAgentAsteriskAnimated ? s.pricingAgentAsteriskAnimated : undefined}
              />
              <span className={s.agentBadgeText}>
                Pricing Agent
              </span>
            </div>
            {(agentStream.phase === 'typing' || agentStream.phase === 'ready') && (
              <p className={s.agentBodyText}>
                {agentStream.displayText}
              </p>
            )}
            {agentStream.phase === 'ready' && (
              <div className={s.agentActionPop}>
                <Button variant="secondary" type="button" onClick={onBalanceRates}>
                  Balance rates
                </Button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

// ── Configured product type ────────────────────────────────────────────────────

export interface ConfiguredProduct {
  productId: string
  productName: string
  category: string
  qty: number
  configOptions: string[]
  upgrades: Record<string, number>
  /** Optional product-level offers chosen during configuration */
  productOfferIds: string[]
  price: number
}

// ── Main component ────────────────────────────────────────────────────────────

export interface ReceiptSnapshot {
  products: ConfiguredProduct[]
  pricingPlan: 'simplicity' | 'custom' | ''
  productCharges: number
  additionalCharges: number
  estFees: number | null
  total: number
}

interface V1ProductsSectionProps {
  isLocked?: boolean
  isMobile?: boolean
  voicePatch?: ProductsVoicePatch
  voicePatchNonce?: number
  onContinue: (snapshot: ReceiptSnapshot) => void
}

export function V1ProductsSection({
  isLocked = false,
  isMobile = false,
  voicePatch,
  voicePatchNonce = 0,
  onContinue,
}: V1ProductsSectionProps) {

  // ── Configured products (the "basket") ──
  const [configuredProducts, setConfiguredProducts] = useState<ConfiguredProduct[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(true)

  // ── Working state for the product currently being configured ──
  const [selectedProductId, setSelectedProductId] = useState('')
  const [qty, setQty] = useState(1)
  const [configOptions, setConfigOptions] = useState<string[]>([])
  const [upgrades, setUpgrades] = useState<Record<string, number>>({})
  const [selectedProductOfferIds, setSelectedProductOfferIds] = useState<string[]>([])

  // ── Pricing & offers (deal-level, after all products added) ──
  const [pricingPlan, setPricingPlan] = useState<'simplicity' | 'custom' | ''>('')
  const [customRates, setCustomRates] = useState<Record<string, number>>(() =>
    Object.fromEntries(HEADLINE_RATES.map(r => [r.id, r.isFlat ? r.defaultRate : parseFloat((r.floor + 0.05).toFixed(3))]))
  )
  const [customFee, setCustomFee] = useState(89)
  const [cardTurnovers, setCardTurnovers] = useState<Record<string, number>>(() =>
    Object.fromEntries(HEADLINE_RATES.filter(r => !r.isFlat).map(r => [r.id, 25]))
  )
  const [lockedRates, setLockedRates] = useState<string[]>([])
  const [selectedOffers, setSelectedOffers] = useState<string[]>([])

  // ── Derived ──
  const allProducts: { category: string; categoryId: string; products: ProductDef[] }[] = PRODUCT_TYPES
    .map(pt => ({ category: pt.label, categoryId: pt.id, products: PRODUCTS[pt.id] ?? [] }))
    .filter(g => g.products.length > 0)

  const flatProducts = allProducts.flatMap(g => g.products)
  const selectedProduct = flatProducts.find(p => p.id === selectedProductId) ?? null
  const configuredProductIds = new Set(configuredProducts.map(cp => cp.productId))
  const hasConfiguredProducts = configuredProducts.length > 0
  const isComplete = hasConfiguredProducts && pricingPlan !== ''

  const dealMargin = calcDealMargin(customRates)
  const hasLowMargin = HEADLINE_RATES.filter(r => !r.isFlat).some(
    r => calcRowFlag(r, customRates[r.id] ?? r.defaultRate) !== 'green'
  )

  useEffect(() => {
    if (!voicePatch || !voicePatchNonce) return
    const p = voicePatch
    if (p.pricingPlan !== undefined) setPricingPlan(p.pricingPlan)
    if (p.selectedProductId) {
      const exists = flatProducts.some(fp => fp.id === p.selectedProductId)
      if (exists) setSelectedProductId(p.selectedProductId)
    }
    if (p.selectedOfferIds?.length) {
      const allowed = new Set(OFFERS.map(o => o.id))
      setSelectedOffers(p.selectedOfferIds.filter(id => allowed.has(id)))
    }
  }, [voicePatchNonce, voicePatch])

  // ── Handlers ────────────────────────────────────────────────────────────────

  function resetWorkingState() {
    setSelectedProductId('')
    setQty(1)
    setConfigOptions([])
    setUpgrades({})
    setSelectedProductOfferIds([])
  }

  function loadFromConfigured(cp: ConfiguredProduct) {
    setSelectedProductId(cp.productId)
    setQty(cp.qty)
    setConfigOptions(cp.configOptions.length > 0 ? [cp.configOptions[0]] : [])
    setUpgrades({ ...cp.upgrades })
    setSelectedProductOfferIds(cp.productOfferIds ?? [])
  }

  function toggleProductOffer(id: string) {
    setSelectedProductOfferIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    )
  }

  /** Config options are a single-choice (radio) group — only one at a time */
  function selectConfigOption(id: string) {
    setConfigOptions([id])
  }

  function isProductFullyConfigured(prod: ProductDef): boolean {
    if (prod.configOptions.length === 0) return true
    if (configOptions.length !== 1) return false
    return prod.configOptions.some(o => o.id === configOptions[0])
  }

  const confirmProduct = useCallback(() => {
    if (!selectedProduct) return
    if (!isProductFullyConfigured(selectedProduct)) return
    const category = PRODUCT_TYPES.find(pt =>
      (PRODUCTS[pt.id] ?? []).some(p => p.id === selectedProduct.id)
    )?.label ?? ''

    const cp: ConfiguredProduct = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      category,
      qty,
      configOptions: [...configOptions],
      upgrades: { ...upgrades },
      productOfferIds: [...selectedProductOfferIds],
      price: selectedProduct.price,
    }

    if (editingIndex !== null) {
      setConfiguredProducts(prev => prev.map((item, i) => i === editingIndex ? cp : item))
      setEditingIndex(null)
    } else {
      setConfiguredProducts(prev => [...prev, cp])
    }
    resetWorkingState()
    setIsAddingNew(false)
  }, [selectedProduct, qty, configOptions, upgrades, selectedProductOfferIds, editingIndex])

  function startEditing(index: number) {
    const cp = configuredProducts[index]
    loadFromConfigured(cp)
    setEditingIndex(index)
    setIsAddingNew(false)
  }

  function removeProduct(index: number) {
    setConfiguredProducts(prev => prev.filter((_, i) => i !== index))
    if (editingIndex === index) {
      setEditingIndex(null)
      resetWorkingState()
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  function startAddingNew() {
    resetWorkingState()
    setEditingIndex(null)
    setIsAddingNew(true)
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
    setSelectedOffers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function balanceRates() {
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
    setLockedRates(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  // ── Totals helpers ──
  function calcTotalProductCharges(): number {
    return configuredProducts.reduce((sum, cp) => {
      const def = flatProducts.find(p => p.id === cp.productId) ?? Object.values(PRODUCTS).flat().find(p => p.id === cp.productId)
      if (!def) return sum
      const upgCost = def.upgrades
        .filter(u => cp.upgrades[u.id] !== undefined)
        .reduce((s, u) => s + u.price * (cp.upgrades[u.id] ?? 1), 0)
      return sum + def.price * cp.qty + upgCost
    }, 0)
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  function headlineRowMonthlyFee(rate: RateDef, val: number, turnoverPct: number): number {
    const monthlyVolume = 200000 / 12
    if (rate.isFlat) return (monthlyVolume / 20) * (val / 100)
    return monthlyVolume * (turnoverPct / 100) * (val / 100)
  }

  function renderPricingTable(opts: { plan: 'simplicity' | 'custom'; interactive: boolean }) {
    const { plan, interactive } = opts
    const activeRates = plan === 'simplicity' ? SIMPLICITY_RATES : customRates
    const activeTurnovers = plan === 'simplicity' ? SIMPLICITY_TURNOVERS : cardTurnovers
    const isSimplicityPlan = plan === 'simplicity'
    const marginDotColour = isSimplicityPlan
      ? FLAG_COLOURS.green
      : FLAG_COLOURS[dealMargin >= MARGIN_TARGET ? 'green' : dealMargin >= 8 ? 'orange' : 'red']
    const marginPctLabel = isSimplicityPlan ? '1.02%' : `${dealMargin.toFixed(1)}%`

    return (
      <div className={pricingTableWrapper}>
        <div>
          <div className={pricingTableTitle}>Product charges</div>
          <table className={pricingTable}>
            <thead>
              <tr>
                <th className={pricingTableHead}>Product</th>
                <th className={pricingTableHeadRight} style={{ width: 80 }}>Quantity</th>
                <th className={pricingTableHeadRight} style={{ width: 120 }}>Monthly Fee</th>
                <th className={pricingTableHeadRight} style={{ width: 100 }}>Margin</th>
              </tr>
            </thead>
            <tbody>
              {configuredProducts.length > 0 ? configuredProducts.map((cp, i) => (
                <tr key={cp.productId + i}>
                  <td className={pricingTableCell}>{cp.productName}</td>
                  <td className={pricingTableCellRight}>{cp.qty}</td>
                  <td className={pricingTableCellRight}>
                    {interactive ? (
                      <div className={s.productMonthlyFeeField}>
                        <span className={s.productMonthlyFeePrefix}>£</span>
                        <input
                          className={clsx(rateInputInner, s.productMonthlyFeeInput)}
                          value={customFee}
                          onChange={e => { const v = parseInt(e.target.value, 10); if (!isNaN(v)) setCustomFee(v) }}
                        />
                      </div>
                    ) : isSimplicityPlan ? (
                      `£${cp.price.toFixed(2)}`
                    ) : (
                      `£${Number(customFee).toFixed(2)}`
                    )}
                  </td>
                  <td className={pricingTableCellRight}>
                    <span className={marginIndicator}>
                      <span className={flagDot} style={{ backgroundColor: marginDotColour }} />
                      <span className={marginIndicatorText}>{marginPctLabel}</span>
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className={clsx(pricingTableCell, s.noProductsText)} colSpan={4}>No products configured</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div>
          <div className={pricingTableTitle}>Headline rates</div>
          <table className={pricingTable}>
            <thead>
              <tr>
                <th className={pricingTableHead}>Rate</th>
                <th className={pricingTableHeadRight} style={{ width: 100 }}>Card Turnover</th>
                <th className={pricingTableHeadRight} style={{ width: 110 }}>Monthly Fee*</th>
                <th className={pricingTableHeadRight} style={{ width: 130 }}>Rate</th>
                <th className={pricingTableHeadRight} style={{ width: 88 }}>Margin</th>
              </tr>
            </thead>
            <tbody>
              {HEADLINE_RATES.map(rate => {
                const val = activeRates[rate.id] ?? rate.defaultRate
                const flag = calcRowFlag(rate, val)
                const turnover = activeTurnovers[rate.id] ?? 25
                const displayPct = calcDisplayMarginPct(rate, val, turnover)
                const monthlyFee = headlineRowMonthlyFee(rate, val, turnover)
                const isLockedRate = lockedRates.includes(rate.id)
                const isError = !rate.isFlat && flag === 'red'
                return (
                  <tr key={rate.id} className={clsx(interactive && isLockedRate && lockedTableRow)}>
                    <td className={pricingTableCell}>{rate.label}</td>
                    <td className={pricingTableCellRight}>
                      {rate.isFlat ? (
                        <span className={marginIndicatorText}>–</span>
                      ) : interactive ? (
                        <div className={clsx(rateInputWrapper, isLockedRate && rateInputWrapperLocked)}>
                          <input
                            className={rateInputInner}
                            value={turnover}
                            readOnly={isLockedRate}
                            onChange={e => handleCardTurnoverChange(rate.id, e.target.value)}
                          />
                          <span className={rateInputUnit}>%</span>
                        </div>
                      ) : (
                        <span className={s.pricingSummaryRateRow}>
                          <span className={s.pricingSummaryValue}>{turnover}</span>
                          <span className={s.pricingSummaryUnit}>%</span>
                        </span>
                      )}
                    </td>
                    <td className={pricingTableCellRight}>
                      <span className={marginIndicatorText}>£{monthlyFee.toFixed(2)}</span>
                    </td>
                    <td className={pricingTableCellRight}>
                      {interactive ? (
                        <div className={s.rateEditRow}>
                          <div className={clsx(rateInputWrapper, isError && rateInputWrapperError, isLockedRate && rateInputWrapperLocked)}>
                            <input
                              className={clsx(rateInputInner, isError && rateInputInnerError)}
                              value={val}
                              readOnly={isLockedRate}
                              onChange={e => handleRateChange(rate.id, e.target.value)}
                            />
                            <span className={rateInputUnit}>{rate.isFlat ? 'p' : '%'}</span>
                          </div>
                          <button
                            type="button"
                            className={clsx(lockBtn, isLockedRate && lockBtnLocked)}
                            onClick={() => toggleLock(rate.id)}
                            title={isLockedRate ? 'Unlock rate' : 'Lock rate'}
                          >
                            {isLockedRate ? <LockKeyIcon size={14} weight="bold" /> : <LockOpenIcon size={14} weight="bold" />}
                          </button>
                        </div>
                      ) : (
                        <span className={s.pricingSummaryRateRow}>
                          <span className={s.pricingSummaryValue}>{rate.isFlat ? val : val.toFixed(3)}</span>
                          <span className={s.pricingSummaryUnit}>{rate.isFlat ? 'p' : '%'}</span>
                        </span>
                      )}
                    </td>
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
                  </tr>
                )
              })}
              <tr>
                <td className={pricingTableCell} colSpan={4}>
                  {interactive ? (
                    <>
                      <span className={s.estFeeLabel}>Est. transaction fee </span>
                      <span className={s.estFeeHint}>(based on £20 transaction)</span>
                    </>
                  ) : (
                    'Average transaction fee**'
                  )}
                </td>
                <td className={clsx(pricingTableCellRight, s.estFeeValue)}>
                  {calcEstFee(activeRates, activeTurnovers)}
                </td>
              </tr>
            </tbody>
          </table>
          <p className={pricingTableFootnote}>
            *Based on card turnover of £200k / year with equal split across headline rates<br />
            **Based on average transaction of £20
          </p>
          {interactive ? (
            <div className={s.pricingShowMoreLinkWrap}>
              <TextLink onClick={() => {}}>Show all other rates and charges</TextLink>
            </div>
          ) : (
            <span className={s.pricingShowMoreStatic}>Show all other rates and charges</span>
          )}
        </div>
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className={clsx(s.mainWrapper, isMobile && s.mainWrapperMobile)}>

      {/* ── Left column: scrollable form ─────────────────────────────── */}
      <div className={s.leftColumn}>
        {isLocked && (
          <div className={s.lockedOverlay} />
        )}
        <div className={clsx(s.leftContent, isMobile && s.leftContentMobile, isLocked && s.leftContentLocked)}>

          {isLocked && (
            <div className={s.lockedBanner}>
              <LockSimpleIcon size={15} color={themeVars.semanticColour.text.brandSecondary} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div className={s.lockedBannerTitle}>
                  Products are locked for editing
                </div>
                <div className={s.lockedBannerDesc}>
                  Once you enter the Application Form, product and business selections are locked. You can view them here but cannot make changes.
                </div>
              </div>
            </div>
          )}


          {/* 1 · Selected products (shown when there are configured products) */}
          {hasConfiguredProducts && (
            <SectionCardProducts title="Selected products">
              <div className={s.selectedProductsList}>
                {configuredProducts.map((cp, index) => {
                  const def = Object.values(PRODUCTS).flat().find(p => p.id === cp.productId)
                  if (!def) return null
                  return (
                    <div key={cp.productId + index} className={s.selectedProductCard}>
                      <span className={s.selectedProductName}>
                        {cp.productName}
                      </span>
                      <div className={s.selectedProductActions}>
                        <button
                          type="button"
                          className={s.productRowIconBtn}
                          onClick={() => removeProduct(index)}
                          title="Remove product"
                        >
                          <TrashIcon size={16} color={themeVars.semanticColour.text.brandDefault} />
                        </button>
                        <button
                          type="button"
                          className={s.productRowIconBtn}
                          onClick={() => startEditing(index)}
                          title="Edit product"
                        >
                          <PencilSimpleIcon size={16} color={themeVars.semanticColour.text.brandDefault} />
                        </button>
                      </div>
                    </div>
                  )
                })}
                {!isAddingNew && editingIndex === null && (
                  <Button variant="secondary" type="button" onClick={startAddingNew}>
                    Add another product
                  </Button>
                )}
              </div>
            </SectionCardProducts>
          )}

          {/* 2 · Editing a configured product (inline) */}
          {editingIndex !== null && (() => {
            const cp = configuredProducts[editingIndex]
            const def = Object.values(PRODUCTS).flat().find(p => p.id === cp?.productId)
            if (!cp || !def) return null
            return (
                  <div className={s.editingCardWrapper}>
                    <div className={s.editingHeaderRow}>
                      <div className={s.editingHeaderContent}>
                        <div>
                          <div className={s.nameRow}>
                            <div className={clsx(s.radioIndicator, s.radioIndicatorSelected)} />
                            <span className={s.nameText}>{def.name}</span>
                          </div>
                          <div className={s.descWrapper}>
                            <span className={s.descText}>{def.desc}</span>
                          </div>
                        </div>
                        <div className={s.tagsList}>
                          {def.tags.map(t => (
                            <span key={t} className={s.tag}>{t}</span>
                          ))}
                        </div>
                        <div className={s.priceRow}>
                          <span className={s.priceText}>From £{def.price}.00 / month</span>
                          <select className={productQtySelect} value={qty} onChange={e => setQty(parseInt(e.target.value))}>
                            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className={s.productImage}>{def.emoji}</div>
                    </div>
                    {def.configOptions.length > 0 && (
                      <div className={s.subSection}>
                        <div className={s.subSectionTitleRow}>
                          <CaretDoubleDownIcon size={12} color="#E07B39" weight="bold" />
                          <span className={s.subSectionTitleText}>Configure this product</span>
                        </div>
                        <div className={s.innerColumn}>
                          {def.configOptions.map(opt => {
                            const checked = configOptions[0] === opt.id
                            return (
                              <div key={opt.id} onClick={() => selectConfigOption(opt.id)} className={clsx(s.optionCard, checked && s.optionCardSelected)}>
                                <div className={s.optionCardContentNoGap}>
                                  <div className={s.nameRow}>
                                    <div className={clsx(s.radioIndicator, checked && s.radioIndicatorSelected)} />
                                    <span className={s.nameText}>{opt.label}</span>
                                  </div>
                                  <div className={s.descWrapper}>
                                    <span className={s.descText}>{opt.desc}</span>
                                  </div>
                                </div>
                                <div className={s.productImage}>🖥️</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    {def.upgrades.length > 0 && (
                      <div className={s.subSection}>
                        <div className={s.innerColumn}>
                          <div className={s.subSectionTitleRow}>
                            <CaretDoubleDownIcon size={12} color="#E07B39" weight="bold" />
                            <span className={s.subSectionTitleText}>Upgrade this product</span>
                          </div>
                          {def.upgrades.map(upg => {
                            const upgSel = upgrades[upg.id] !== undefined
                            return (
                              <div key={upg.id} onClick={() => toggleUpgrade(upg.id)} className={clsx(s.optionCard, upgSel && s.optionCardSelected)}>
                                <div className={s.optionCardContent}>
                                  <div>
                                    <div className={s.nameRow}>
                                      <div className={clsx(s.checkboxIndicator, upgSel && s.checkboxIndicatorChecked)}>
                                        {upgSel && <CheckIcon size={10} color="#fff" weight="bold" />}
                                      </div>
                                      <span className={s.nameText}>{upg.label}</span>
                                    </div>
                                    <div className={s.descWrapper}>
                                      <span className={s.descText}>{upg.desc}</span>
                                    </div>
                                  </div>
                                  <div className={s.priceRow}>
                                    <span className={s.priceText}>£{upg.price}.00 / month</span>
                                    {upgSel && (
                                      <div onClick={e => e.stopPropagation()}>
                                        <select className={productQtySelect} value={upgrades[upg.id]} onChange={e => setUpgradeQty(upg.id, parseInt(e.target.value))}>
                                          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className={s.productImage}>🖥️</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    <ProductOffersSubsection
                      selectedIds={selectedProductOfferIds}
                      onToggle={toggleProductOffer}
                    />
                    <div className={s.confirmSection}>
                      <Button onClick={confirmProduct} isDisabled={!isProductFullyConfigured(def)}>
                        Update product
                      </Button>
                    </div>
                  </div>
                )
          })()}

          {/* 3 · Select products — shown when adding new or no products yet */}
          {(isAddingNew || configuredProducts.length === 0) && editingIndex === null && (
            <SectionCardProducts title="Select products">

              <div>
                  {allProducts.map(group => (
                    <div key={group.category} className={s.categoryGroup}>
                      <div className={s.categoryTitle}>
                        {group.category}
                      </div>
                      <div className={s.categoryProducts}>
                        {group.products.map((prod, prodIdx) => {
                          const alreadyAdded = configuredProductIds.has(prod.id)
                          const sel = selectedProductId === prod.id
                          return (
                            <div key={prod.id}>
                            <div
                              className={clsx(s.selectableCard, sel && s.selectableCardSelected, alreadyAdded && s.selectableCardDisabled)}
                              data-disabled={alreadyAdded || undefined}
                            >
                              <div
                                className={s.selectableCardRow}
                                onClick={() => {
                                  if (!alreadyAdded) {
                                    setSelectedProductId(prod.id)
                                    setConfigOptions([])
                                    setUpgrades({})
                                    setSelectedProductOfferIds([])
                                  }
                                }}
                              >
                                <div className={s.editingHeaderContent}>
                                  <div>
                                    <div className={s.nameRow}>
                                      <div className={clsx(s.radioIndicator, sel && s.radioIndicatorSelected)} />
                                      <span className={s.nameText}>
                                        {prod.name}
                                      </span>
                                      {alreadyAdded && (
                                        <span className={s.addedBadge}>Added</span>
                                      )}
                                    </div>
                                    <div className={s.descWrapper}>
                                      <span className={s.descText}>
                                        {prod.desc}
                                      </span>
                                    </div>
                                  </div>
                                  <div className={s.tagsList}>
                                    {prod.tags.map(t => (
                                      <span key={t} className={s.tag}>{t}</span>
                                    ))}
                                  </div>
                                  <div className={s.priceRow}>
                                    <span className={s.priceText}>
                                      From £{prod.price}.00 / month
                                    </span>
                                    {sel && (
                                      <select className={productQtySelect} value={qty} onClick={e => e.stopPropagation()} onChange={e => setQty(parseInt(e.target.value))}>
                                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                      </select>
                                    )}
                                  </div>
                                </div>
                                <div className={s.productImage}>
                                  {prod.emoji}
                                </div>
                              </div>

                              {sel && prod.configOptions.length > 0 && (
                                <div className={s.subSection}>
                                  <div className={s.subSectionTitleRow}>
                                    <CaretDoubleDownIcon size={12} color="#E07B39" weight="bold" />
                                    <span className={s.subSectionTitleText}>
                                      Configure this product
                                    </span>
                                  </div>
                                  <div className={s.innerColumn}>
                                    {prod.configOptions.map(opt => {
                                      const checked = configOptions[0] === opt.id
                                      return (
                                        <div
                                          key={opt.id}
                                          onClick={() => selectConfigOption(opt.id)}
                                          className={clsx(s.optionCard, checked && s.optionCardSelected)}
                                        >
                                          <div className={s.editingHeaderContent}>
                                            <div>
                                              <div className={s.nameRow}>
                                                <div className={clsx(s.radioIndicator, checked && s.radioIndicatorSelected)} />
                                                <span className={s.nameText}>
                                                  {opt.label}
                                                </span>
                                              </div>
                                              <div className={s.descWrapper}>
                                                <span className={s.descText}>
                                                  {opt.desc}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className={s.productImage}>🖥️</div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              {sel && prod.upgrades.length > 0 && (
                                <div className={s.subSection}>
                                  <div className={s.innerColumn}>
                                    <div className={s.subSectionTitleRow}>
                                      <CaretDoubleDownIcon size={12} color="#E07B39" weight="bold" />
                                      <span className={s.subSectionTitleText}>
                                        Upgrade this product
                                      </span>
                                    </div>
                                    {prod.upgrades.map(upg => {
                                      const upgSel = upgrades[upg.id] !== undefined
                                      return (
                                        <div
                                          key={upg.id}
                                          onClick={() => toggleUpgrade(upg.id)}
                                          className={clsx(s.optionCard, upgSel && s.optionCardSelected)}
                                        >
                                          <div className={s.optionCardContent}>
                                            <div>
                                              <div className={s.nameRow}>
                                                <div className={clsx(s.checkboxIndicator, upgSel && s.checkboxIndicatorChecked)}>
                                                  {upgSel && <CheckIcon size={10} color="#fff" weight="bold" />}
                                                </div>
                                                <span className={s.nameText}>
                                                  {upg.label}
                                                </span>
                                              </div>
                                              <div className={s.descWrapper}>
                                                <span className={s.descText}>
                                                  {upg.desc}
                                                </span>
                                              </div>
                                            </div>
                                            <div className={s.priceRow}>
                                              <span className={s.priceText}>
                                                £{upg.price}.00 / month
                                              </span>
                                              {upgSel && (
                                                <div onClick={e => e.stopPropagation()}>
                                                  <select className={productQtySelect} value={upgrades[upg.id]} onChange={e => setUpgradeQty(upg.id, parseInt(e.target.value))}>
                                                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                                  </select>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <div className={s.productImage}>🖥️</div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              {sel && (
                                <ProductOffersSubsection
                                  selectedIds={selectedProductOfferIds}
                                  onToggle={toggleProductOffer}
                                />
                              )}

                              {sel && prod.recommendationText && (
                                <RecommendationAgentWithAction
                                  message={prod.recommendationText}
                                  showAction={!alreadyAdded}
                                  onConfirm={confirmProduct}
                                  disabled={!isProductFullyConfigured(prod)}
                                  alreadyAdded={alreadyAdded}
                                />
                              )}

                              {sel && !alreadyAdded && !prod.recommendationText && (
                                <div className={s.confirmSection}>
                                  <Button onClick={confirmProduct} isDisabled={!isProductFullyConfigured(prod)}>
                                    Select product
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
              </div>

            </SectionCardProducts>
          )}

          {/* 4 · Pricing plan */}
          <SectionCardProducts title="Select pricing plan" disabled={!hasConfiguredProducts}>
            {hasConfiguredProducts && (
              <div className={disclosureContent}>
                <div className={pricingPlanList}>

                  {/* Simplicity */}
                  <div className={clsx(pricingPlanCard, pricingPlan === 'simplicity' && pricingPlanCardSelected)}>
                    <div className={clsx(pricingPlanHeader, s.pricingHeaderBorder)} onClick={() => setPricingPlan('simplicity')}>
                      <div className={pricingPlanHeaderLeft}>
                        <div className={clsx(radioCircle, pricingPlan === 'simplicity' && radioCircleSelected, s.radioShrink)}>
                          {pricingPlan === 'simplicity' && <div className={radioCircleDot} />}
                        </div>
                        <div>
                          <div className={pricingPlanName}>Simplicity</div>
                          <div className={pricingPlanDesc}>Simple, predictable pricing</div>
                        </div>
                      </div>
                      <span className={pricingPlanContractTag}>18 month contract</span>
                    </div>
                    {renderPricingTable({ plan: 'simplicity', interactive: false })}
                  </div>

                  {/* Custom */}
                  <div className={clsx(pricingPlanCard, pricingPlan === 'custom' && pricingPlanCardSelected)}>
                    <div className={clsx(pricingPlanHeader, s.pricingHeaderBorder)} onClick={() => setPricingPlan('custom')}>
                      <div className={pricingPlanHeaderLeft}>
                        <div className={clsx(radioCircle, pricingPlan === 'custom' && radioCircleSelected, s.radioShrink)}>
                          {pricingPlan === 'custom' && <div className={radioCircleDot} />}
                        </div>
                        <div>
                          <div className={pricingPlanName}>Custom</div>
                          <div className={pricingPlanDesc}>Custom, bespoke pricing</div>
                        </div>
                      </div>
                      <span className={pricingPlanContractTag}>18 month contract</span>
                    </div>
                    {renderPricingTable({ plan: 'custom', interactive: pricingPlan === 'custom' })}
                  </div>

                </div>
              </div>
            )}
          </SectionCardProducts>

          {/* Contract-level offers (after pricing plan) */}
          <SectionCardProducts title="Select contract offers" disabled={!pricingPlan}>
            {pricingPlan && (
              <div>
                <div className={offerList}>
                  {OFFERS.map(offer => {
                    const checked = selectedOffers.includes(offer.id)
                    return (
                      <div key={offer.id} className={clsx(offerCard, checked && offerCardSelected)} onClick={() => toggleOffer(offer.id)}>
                        <div className={clsx(checkbox, checked && checkboxChecked)}>
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
          </SectionCardProducts>

          <div className={s.continueWrapper}>
            <Button isDisabled={!isComplete} onClick={() => {
              const productCharges = calcTotalProductCharges()
              const additionalCharges = 75
              const activeRates     = pricingPlan === 'custom' ? customRates    : SIMPLICITY_RATES
              const activeTurnovers = pricingPlan === 'custom' ? cardTurnovers : SIMPLICITY_TURNOVERS
              const estFees = pricingPlan ? calcMonthlyFees(activeRates, activeTurnovers) : null
              const total = productCharges + additionalCharges + (estFees ?? 0)
              onContinue({ products: configuredProducts, pricingPlan, productCharges, additionalCharges, estFees, total })
            }}>
              Continue to Application
            </Button>
          </div>

        </div>
      </div>

      {/* ── Right column: sticky receipt (below on mobile) ─── */}
      <div className={clsx(s.rightColumn, isMobile && s.rightColumnMobile)}>
        <ProductReceiptPanel
          configuredProducts={configuredProducts}
          pricingPlan={pricingPlan}
          customFee={customFee}
          customRates={customRates}
          cardTurnovers={cardTurnovers}
          dealMargin={dealMargin}
          hasLowMargin={hasLowMargin}
          onBalanceRates={balanceRates}
        />
      </div>

    </div>
  )
}
