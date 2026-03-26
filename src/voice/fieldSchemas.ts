/**
 * Voice → LLM field schemas for V2. Used by VoiceAssistPanel (section labels) and
 * documented for parity with netlify/functions/voice-shared.mjs prompts (Whisper + voice-extract).
 */

import type { BusinessInfoData } from '../components/V1BusinessInfoSection'

export type VoiceSection = 'business-info' | 'products' | 'application'

/** Subset of products state the LLM may set (MVP). */
export type ProductsVoicePatch = Partial<{
  pricingPlan: 'simplicity' | 'custom' | ''
  /** Must match a product `id` from V1ProductsSection PRODUCTS (e.g. terminal-portable, gateway-standard). */
  selectedProductId: string
  /** Deal-level offer ids: tac, free-month */
  selectedOfferIds: string[]
}>

/**
 * Application form fields — keys match V1ApplicationSection state setters / voice merge.
 * Yes/no fields use 'yes' | 'no' only.
 */
export type ApplicationVoicePatch = Partial<{
  bizType: string
  regDate: string
  companyName: string
  tradingDiff: 'yes' | 'no'
  tradingName: string
  regAddress: string
  tradingAddressMode: 'same' | 'other'
  tradingAddress: string
  vatNumber: string
  bizPhone: string
  csPhone: string
  website: string
  mcc: string
  goodsDesc: string
  bizTurnover: string
  cardTurnover: string
  avgTx: string
  debitPct: string
  creditPct: string
  onlinePhonePct: string
  inPerson: 'yes' | 'no'
  online: 'yes' | 'no'
  phonePayments: 'yes' | 'no'
  deposits: 'yes' | 'no'
  depositPct: string
  depositSize: string
  depositAdvance: string
  depositPayment: string
  prepayments: 'yes' | 'no'
  prepayPct: string
  prepayDays: string
  warranties: 'yes' | 'no'
  warrantyCt: string
  warrantyLen: string
  warrantyReturn: string
  warrantyProvider: string
  memberships: 'yes' | 'no'
  membershipPct: string
  membershipLen: string
  membershipCost: string
  stockSame: 'yes' | 'no'
  stockAddress: string
  acctHolder: string
  sortCode: string
  acctNumber: string
  bankName: string
  sameCharges: 'yes' | 'no'
  chHolder: string
  chSort: string
  chAcct: string
  chBank: string
  paperlessDD: 'yes' | 'no'
  ddEmail: string
}>

export type BusinessInfoVoicePatch = Partial<BusinessInfoData>

/** Payment location — matches checkbox-derived values in V1BusinessInfoSection. */
export const PAYMENT_LOCATION_VALUES = ['', 'online', 'in-person', 'both'] as const
