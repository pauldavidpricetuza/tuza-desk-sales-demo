/**
 * Shared prompts + JSON patch extraction (OpenAI chat). Used by voice-extract and voice-from-audio.
 */

const MODEL = 'gpt-4o-mini'

export const SYSTEM = {
  'business-info': `You extract structured data for a UK merchant onboarding "Business Info" form from spoken English.
Return a JSON object with a single key "patch" whose value is an object.
Only include keys the user clearly implied. Omit keys you cannot infer. Do not use empty strings.
Use exact enum values where specified.

Allowed keys and formats:
- businessType: one of: sole-trader, private-limited-company, public-limited-company, limited-liability-partnership, general-partnership, limited-partnership, community-interest-company, charitable-incorporated-organisation, registered-charity, overseas-company, other
- businessName: string
- businessDescription: string (what the business does)
- mcc: string — prefer values like "5812 - Eating Places, Restaurants" or other labels from typical UK MCC lists if user names a sector
- provider: one of: stripe, square, paypal, worldpay, barclaycard, sumup, izettle, zettle, opayo, adyen, braintree, klarna, checkout, paymentsense, dojo, takepayments, elavon, first-data, none, other
- cardTurnover: string with £ or plain number, e.g. "200000" or "£200,000"
- avgTransaction: string
- paymentLocation: one of: "", "online", "in-person", "both" (both = takes payments online and in person)

Example: {"patch":{"businessName":"Rosy's Pizzas Ltd","businessType":"private-limited-company"}}`,

  products: `You extract structured data for a "Products & Pricing" step from spoken English.
Return JSON: {"patch": { ... }} only. Omit unknown keys.

Allowed keys:
- pricingPlan: "simplicity" OR "custom" OR "" (empty if unclear)
- selectedProductId: one of these product ids if the user names a product type:
  terminal-portable, terminal-compact, terminal-standard, gateway-standard, gateway-pro, epos-lite, epos-pro
- selectedOfferIds: optional array of deal offer ids: "tac", "free-month"

Map spoken names: portable terminal → terminal-portable; compact reader → terminal-compact; gateway standard → gateway-standard; EPOS lite → epos-lite; EPOS pro → epos-pro; simplicity plan / Simplicity → simplicity; custom pricing → custom.`,

  application: `You extract structured data for a long "Application" form from spoken English.
Return JSON: {"patch": { ... }} only. Omit keys not clearly stated. Use empty string only when user explicitly said blank (rare).

Keys (strings unless noted):
bizType, regDate, companyName, tradingDiff ("yes"|"no"), tradingName, regAddress, tradingAddressMode ("same"|"other"), tradingAddress, vatNumber, bizPhone, csPhone, website, mcc, goodsDesc, bizTurnover, cardTurnover, avgTx, debitPct, creditPct, onlinePhonePct,
inPerson, online, phonePayments, deposits, depositPct, depositSize, depositAdvance, depositPayment, prepayments, prepayPct, prepayDays, warranties, warrantyCt, warrantyLen, warrantyReturn, warrantyProvider, memberships, membershipPct, membershipLen, membershipCost, stockSame, stockAddress,
acctHolder, sortCode, acctNumber, bankName, sameCharges, chHolder, chSort, chAcct, chBank, paperlessDD, ddEmail

For yes/no style answers use only "yes" or "no" for keys that are yes/no in the list above (tradingDiff, inPerson, online, phonePayments, deposits, prepayments, warranties, memberships, stockSame, sameCharges, paperlessDD).`,
}

/**
 * @param {string} section
 * @param {string} transcript
 * @param {string} apiKey
 * @returns {Promise<Record<string, unknown>>}
 */
export async function extractPatchFromTranscript(section, transcript, apiKey) {
  const system = SYSTEM[section]
  if (!system) {
    throw new Error('Invalid section')
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        {
          role: 'user',
          content: `Transcript:\n${transcript.trim()}\n\nRespond with JSON only: {"patch": { ... }}`,
        },
      ],
      temperature: 0.2,
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    const err = new Error(`OpenAI chat: ${res.status}`)
    err.detail = errText.slice(0, 500)
    throw err
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) {
    throw new Error('Empty model response')
  }

  const parsed = JSON.parse(content)
  const patch = parsed.patch && typeof parsed.patch === 'object' ? parsed.patch : {}
  return patch
}
