import { useState, useEffect } from 'react'
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
  fieldLabel,
  fieldSelect,
  fieldInput,
  panelFooter,
} from './BusinessInfoPanel.css'

interface BusinessInfoPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function BusinessInfoPanel({ isOpen, onClose, onComplete }: BusinessInfoPanelProps) {
  const [provider, setProvider] = useState('')
  const [cardTurnover, setCardTurnover] = useState('')
  const [avgTransaction, setAvgTransaction] = useState('')
  const [paymentLocation, setPaymentLocation] = useState('')

  const isComplete =
    provider.trim() !== '' &&
    cardTurnover.trim() !== '' &&
    avgTransaction.trim() !== '' &&
    paymentLocation !== ''

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
              <span className={panelHeaderTitleAccent}>Payments</span>
            </span>
          </div>

          <div className={formSection}>
            <SectionTitle>Current payment processing</SectionTitle>

            <div className={fieldGroup}>
              <label className={fieldLabel}>Current Payments Provider</label>
              <select className={fieldSelect} value={provider} onChange={e => setProvider(e.target.value)}>
                <option value="">Select a provider</option>
                <option value="stripe">Stripe</option>
                <option value="square">Square</option>
                <option value="paypal">PayPal</option>
                <option value="worldpay">Worldpay</option>
                <option value="barclaycard">Barclaycard</option>
                <option value="sumup">SumUp</option>
                <option value="izettle">iZettle (PayPal)</option>
                <option value="zettle">Zettle</option>
                <option value="opayo">Opayo (Sage Pay)</option>
                <option value="adyen">Adyen</option>
                <option value="braintree">Braintree</option>
                <option value="klarna">Klarna</option>
                <option value="checkout">Checkout.com</option>
                <option value="paymentsense">Paymentsense</option>
                <option value="dojo">Dojo</option>
                <option value="takepayments">takepayments</option>
                <option value="elavon">Elavon</option>
                <option value="first-data">First Data (Fiserv)</option>
                <option value="none">None / No current provider</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={fieldGroup}>
              <label className={fieldLabel}>Annual Card Turnover (£)</label>
              <input
                className={fieldInput}
                placeholder="e.g. £200,000"
                value={cardTurnover}
                onChange={e => setCardTurnover(e.target.value)}
              />
            </div>

            <div className={fieldGroup}>
              <label className={fieldLabel}>Average Transaction Value (£)</label>
              <input
                className={fieldInput}
                placeholder="e.g. £100"
                value={avgTransaction}
                onChange={e => setAvgTransaction(e.target.value)}
              />
            </div>

            <div className={fieldGroup}>
              <label className={fieldLabel}>Where do they want to take payments?</label>
              <select className={fieldSelect} value={paymentLocation} onChange={e => setPaymentLocation(e.target.value)}>
                <option value="">Select an option</option>
                <option value="online">Online</option>
                <option value="in-person">In Person</option>
                <option value="both">Online and In Person</option>
              </select>
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
