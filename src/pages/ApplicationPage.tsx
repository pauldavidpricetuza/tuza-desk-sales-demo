import React, { useState } from 'react'
import { UserListIcon, CardsThreeIcon, LockKeyIcon, CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react'
import { useIsMobile } from '../hooks/useIsMobile'
import { SideNavigation, NavigationItem } from '#ui/SideNavigation/SideNavigation'
import { TopNavBar } from '#ui/TopNavBar/TopNavBar'
import { Button } from '#ui/Button/Button'
import { Status } from '#ui/Status/Status'
import { BusinessInfoPanel } from '../components/BusinessInfoPanel'
import { BizDetailsPanel } from '../components/BizDetailsPanel'
import { ProductSelectionPanel } from '../components/ProductSelectionPanel'
import { AppFormBusinessPanel } from '../components/AppFormBusinessPanel'
import { AppFormOwnersPanel } from '../components/AppFormOwnersPanel'
import { AppFormPaymentsPanel } from '../components/AppFormPaymentsPanel'
import { AppFormGoodsPanel } from '../components/AppFormGoodsPanel'
import { AppFormBankPanel } from '../components/AppFormBankPanel'
import { AppFormPanel } from '../components/AppFormPanel'
import { AppIssuesPanel } from '../components/AppIssuesPanel'
import {
  pageContainer,
  mainContent,
  titleBar,
  titleLeft,
  titleText,
  titleMerchantName,
  titleButtons,
  infoBar,
  infoItems,
  infoItem,
  infoLabel,
  infoValue,
  applicationBody,
  quotingSection,
  lockedSection,
  sectionHeader,
  sectionHeaderClickable,
  sectionTitleGroup,
  stepSquare,
  stepSquareLocked,
  stepNumber,
  sectionTitle,
  sectionTitleLocked,
  formRows,
  formRow,
  formRowInProgress,
  formRowLabel,
  formRowLabelLocked,
  lockedButton,
  lockedButtonText,
  contentRow,
  leftColumn,
  inProgressIndicator,
  inProgressDot,
  inProgressText,
  savedRowActions,
  savedTimestampGroup,
  savedTimestampLabel,
  savedTimestampValue,
  completeDot,
  completeText,
  sectionCompleteActions,
  sectionCollapseBtn,
  productHintText,
  titleSavedGroup,
  titleSavedLabel,
  titleSavedValue,
} from './ApplicationPage.css'

function formatTimestamp() {
  const now = new Date()
  const day = now.getDate()
  const month = now.toLocaleString('en-GB', { month: 'short' })
  const year = now.getFullYear()
  const h = now.getHours().toString().padStart(2, '0')
  const m = now.getMinutes().toString().padStart(2, '0')
  return `${day} ${month} ${year} • ${h}:${m}`
}

interface ApplicationPageProps {
  merchantName?: string
  contactName: string
  phone: string
  email: string
  businessType?: string
  businessDescription?: string
  mcc?: string
  completionState?: 'draft' | 'in-progress' | 'complete'
  logoPicker: React.ReactNode
  logoLabel?: string
  onBack?: () => void
  onSubmit?: (merchantName?: string) => void
  onSettingsClick?: () => void
}

function LockedButton() {
  return (
    <div className={lockedButton}>
      <LockKeyIcon size={16} color="#062351" />
      <span className={lockedButtonText}>Locked</span>
    </div>
  )
}

type SectionStatus = 'idle' | 'inProgress' | 'saved' | 'complete'

interface ProductRow {
  id: number
  status: SectionStatus
  savedAt: string
  name?: string
}

const PRESET_TS = '4 Mar 2026 • 09:30'

export function ApplicationPage({ merchantName, contactName, phone, email, businessType, businessDescription, mcc, completionState = 'draft', logoPicker, logoLabel, onBack, onSubmit, onSettingsClick }: ApplicationPageProps) {
  const isMobile = useIsMobile()
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<string | null>(null)

  const isInProgress = completionState === 'in-progress'
  const isComplete = completionState === 'complete'

  // ── Section 1: Business Information ────────────────────────────────────────
  const bizPreset: SectionStatus = (isInProgress || isComplete) ? 'complete' : 'idle'
  const [bizPaymentsStatus, setBizPaymentsStatus] = useState<SectionStatus>(() => bizPreset)
  const [bizPaymentsSavedAt, setBizPaymentsSavedAt] = useState(() => bizPreset === 'complete' ? PRESET_TS : '')
  const [bizDetailsStatus, setBizDetailsStatus] = useState<SectionStatus>(() => bizPreset)
  const [bizDetailsSavedAt, setBizDetailsSavedAt] = useState(() => bizPreset === 'complete' ? PRESET_TS : '')
  const [bizInfoCollapsed, setBizInfoCollapsed] = useState(() => isInProgress || isComplete)
  const bizInfoComplete = bizPaymentsStatus === 'complete' && bizDetailsStatus === 'complete'

  // ── Section 2: Product Selection ───────────────────────────────────────────
  const productPreset: SectionStatus = isComplete ? 'complete' : isInProgress ? 'saved' : 'idle'
  const [products, setProducts] = useState<ProductRow[]>(() => [
    { id: 1, status: productPreset, savedAt: (isInProgress || isComplete) ? PRESET_TS : '' },
  ])
  const [productSelectionCollapsed, setProductSelectionCollapsed] = useState(() => isComplete)
  const productSelectionUnlocked = bizInfoComplete
  const productSelectionComplete = products.every(p => p.status === 'complete')

  function addProduct() {
    const nextId = Math.max(...products.map(p => p.id)) + 1
    setProducts(prev => [...prev, { id: nextId, status: 'inProgress', savedAt: '' }])
    openPanelDirect(`product-${nextId}`)
  }

  function updateProduct(id: number, status: SectionStatus, savedAt = '', name?: string) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status, savedAt, ...(name !== undefined ? { name } : {}) } : p))
  }

  function deleteProduct(id: number) {
    setProducts(prev => {
      const remaining = prev.filter(p => p.id !== id)
      if (remaining.length === 0) {
        // Deleted the last product — reset to a fresh Product #1
        openPanel('product-1')
        return [{ id: 1, status: 'inProgress' as SectionStatus, savedAt: '' }]
      }
      // Re-number sequentially so IDs stay contiguous
      const renumbered = remaining.map((p, i) => ({ ...p, id: i + 1 }))
      // Close panel if the deleted product was open
      setIsPanelOpen(false)
      setActivePanel(null)
      return renumbered
    })
  }

  // ── Section 3: Application Form ────────────────────────────────────────────
  type AppFormKey = 'appFormBusiness' | 'appFormOwners' | 'appFormPayments' | 'appFormGoods' | 'appFormBank'
  const appFormPreset: SectionStatus = isComplete ? 'complete' : 'idle'
  const [appFormRows, setAppFormRows] = useState<Record<AppFormKey, { status: SectionStatus; savedAt: string }>>(() => ({
    appFormBusiness: { status: isInProgress ? 'saved' : appFormPreset, savedAt: (isInProgress || isComplete) ? PRESET_TS : '' },
    appFormOwners:   { status: appFormPreset, savedAt: isComplete ? PRESET_TS : '' },
    appFormPayments: { status: appFormPreset, savedAt: isComplete ? PRESET_TS : '' },
    appFormGoods:    { status: appFormPreset, savedAt: isComplete ? PRESET_TS : '' },
    appFormBank:     { status: appFormPreset, savedAt: isComplete ? PRESET_TS : '' },
  }))
  const [appFormCollapsed, setAppFormCollapsed] = useState(() => isComplete)
  const appFormUnlocked = productSelectionComplete
  const appFormComplete = Object.values(appFormRows).every(r => r.status === 'complete')
  const allSectionsComplete = bizInfoComplete && productSelectionComplete && appFormComplete

  function setAppFormRow(key: AppFormKey, status: SectionStatus, savedAt = '') {
    setAppFormRows(prev => ({ ...prev, [key]: { status, savedAt } }))
  }

  // ── Section 4: Application Checks (hidden — reserved for future use) ────────
  type AppChecksKey = 'tradingName' | 'tradingAddress'
  const checksPreset: SectionStatus = isComplete ? 'complete' : 'idle'
  const [appChecksRows, setAppChecksRows] = useState<Record<AppChecksKey, { status: SectionStatus; savedAt: string }>>(() => ({
    tradingName:    { status: checksPreset, savedAt: isComplete ? PRESET_TS : '' },
    tradingAddress: { status: checksPreset, savedAt: isComplete ? PRESET_TS : '' },
  }))
  const [appChecksCollapsed, setAppChecksCollapsed] = useState(() => isComplete)
  const appChecksUnlocked = appFormComplete
  const appChecksComplete = Object.values(appChecksRows).every(r => r.status === 'complete')

  function setAppChecksRow(key: AppChecksKey, status: SectionStatus, savedAt = '') {
    setAppChecksRows(prev => ({ ...prev, [key]: { status, savedAt } }))
  }

  // ── Last saved timestamp (shown in title bar) ──────────────────────────────
  const [lastSavedAt, setLastSavedAt] = useState(() => isInProgress || isComplete ? PRESET_TS : '')

  // Auto-save the currently open panel when the user opens a different one.
  // Only transitions inProgress → saved; complete/saved states are preserved.
  function autoSaveCurrentPanel() {
    if (!isPanelOpen || !activePanel) return
    const ts = formatTimestamp()

    if (activePanel === 'bizPayments' && bizPaymentsStatus === 'inProgress') {
      setBizPaymentsStatus('saved'); setBizPaymentsSavedAt(ts); setLastSavedAt(ts)
    } else if (activePanel === 'bizDetails' && bizDetailsStatus === 'inProgress') {
      setBizDetailsStatus('saved'); setBizDetailsSavedAt(ts); setLastSavedAt(ts)
    } else if (activePanel.startsWith('product-')) {
      const id = parseInt(activePanel.replace('product-', ''))
      const prod = products.find(p => p.id === id)
      if (prod?.status === 'inProgress') { updateProduct(id, 'saved', ts); setLastSavedAt(ts) }
    } else if (activePanel.startsWith('appForm')) {
      const row = appFormRows[activePanel as AppFormKey]
      if (row?.status === 'inProgress') { setAppFormRow(activePanel as AppFormKey, 'saved', ts); setLastSavedAt(ts) }
    } else if (activePanel === 'appChecksTradingName' && appChecksRows.tradingName.status === 'inProgress') {
      setAppChecksRow('tradingName', 'saved', ts); setLastSavedAt(ts)
    } else if (activePanel === 'appChecksTradingAddress' && appChecksRows.tradingAddress.status === 'inProgress') {
      setAppChecksRow('tradingAddress', 'saved', ts); setLastSavedAt(ts)
    }
  }

  function openPanel(key: string) {
    if (isPanelOpen && activePanel && activePanel !== key) {
      autoSaveCurrentPanel()
    }
    setActivePanel(key)
    setIsPanelOpen(true)
  }

  function completeBizInfo(ts: string) {
    setBizPaymentsStatus('complete'); setBizPaymentsSavedAt(ts)
    setBizDetailsStatus('complete'); setBizDetailsSavedAt(ts)
    setBizInfoCollapsed(true)
  }

  function completeProductSelection(ts: string) {
    setProducts(prev => prev.map(p => ({ ...p, status: 'complete' as SectionStatus, savedAt: ts })))
    setProductSelectionCollapsed(true)
  }

  function completeAppForm(ts: string) {
    setAppFormRows({
      appFormBusiness: { status: 'complete', savedAt: ts },
      appFormOwners:   { status: 'complete', savedAt: ts },
      appFormPayments: { status: 'complete', savedAt: ts },
      appFormGoods:    { status: 'complete', savedAt: ts },
      appFormBank:     { status: 'complete', savedAt: ts },
    })
    setAppFormCollapsed(true)
  }

  // Directly open a panel without triggering autoSaveCurrentPanel — used when
  // opening a panel in the same state-update batch (e.g. addAnotherProduct).
  function openPanelDirect(key: string) {
    setActivePanel(key)
    setIsPanelOpen(true)
  }

  function handlePanelClose() {
    setIsPanelOpen(false)
    const ts = formatTimestamp()
    setLastSavedAt(ts)
    if (activePanel === 'bizPayments' && bizPaymentsStatus !== 'idle') {
      setBizPaymentsStatus('saved'); setBizPaymentsSavedAt(ts)
    } else if (activePanel === 'bizDetails' && bizDetailsStatus !== 'idle') {
      setBizDetailsStatus('saved'); setBizDetailsSavedAt(ts)
    } else if (activePanel && activePanel.startsWith('product-')) {
      const id = parseInt(activePanel.replace('product-', ''))
      const prod = products.find(p => p.id === id)
      if (prod && prod.status !== 'idle') updateProduct(id, 'saved', ts)
    } else if (activePanel && activePanel.startsWith('appForm') && appFormRows[activePanel as AppFormKey]?.status !== 'idle') {
      setAppFormRow(activePanel as AppFormKey, 'saved', ts)
    } else if (activePanel === 'appChecksTradingName' && appChecksRows.tradingName.status !== 'idle') {
      setAppChecksRow('tradingName', 'saved', ts)
    } else if (activePanel === 'appChecksTradingAddress' && appChecksRows.tradingAddress.status !== 'idle') {
      setAppChecksRow('tradingAddress', 'saved', ts)
    }
    setActivePanel(null)
  }

  function handlePanelComplete() {
    const ts = formatTimestamp()
    setLastSavedAt(ts)

    if (activePanel === 'bizPayments') {
      // Section 1: Payments done → open Details
      setBizPaymentsStatus('complete'); setBizPaymentsSavedAt(ts)
      setBizDetailsStatus('inProgress')
      setActivePanel('bizDetails')

    } else if (activePanel === 'bizDetails') {
      // Section 1: Details done → collapse section, open Product #1
      setBizDetailsStatus('complete'); setBizDetailsSavedAt(ts)
      setBizInfoCollapsed(true)
      updateProduct(1, 'inProgress')
      setActivePanel('product-1')

    } else if (activePanel && activePanel.startsWith('product-')) {
      const id = parseInt(activePanel.replace('product-', ''))
      updateProduct(id, 'complete', ts)
      const nextProd = products.find(p => p.id === id + 1)
      if (nextProd) {
        // More products → open next
        updateProduct(nextProd.id, 'inProgress')
        setActivePanel(`product-${nextProd.id}`)
      } else {
        // All products done → collapse section, open Application Form: Business
        setProductSelectionCollapsed(true)
        setAppFormRow('appFormBusiness', 'inProgress')
        setActivePanel('appFormBusiness')
      }

    } else if (activePanel === 'appFormBusiness') {
      setAppFormRow('appFormBusiness', 'complete', ts)
      setAppFormRow('appFormOwners', 'inProgress')
      setActivePanel('appFormOwners')

    } else if (activePanel === 'appFormOwners') {
      setAppFormRow('appFormOwners', 'complete', ts)
      setAppFormRow('appFormPayments', 'inProgress')
      setActivePanel('appFormPayments')

    } else if (activePanel === 'appFormPayments') {
      setAppFormRow('appFormPayments', 'complete', ts)
      setAppFormRow('appFormGoods', 'inProgress')
      setActivePanel('appFormGoods')

    } else if (activePanel === 'appFormGoods') {
      setAppFormRow('appFormGoods', 'complete', ts)
      setAppFormRow('appFormBank', 'inProgress')
      setActivePanel('appFormBank')

    } else if (activePanel === 'appFormBank') {
      // Section 3 done → collapse, unlock Application Checks (user chooses order)
      setAppFormRow('appFormBank', 'complete', ts)
      setAppFormCollapsed(true)
      setIsPanelOpen(false)
      setActivePanel(null)

    } else if (activePanel === 'appChecksTradingName') {
      setAppChecksRow('tradingName', 'complete', ts)
      setIsPanelOpen(false)
      setActivePanel(null)

    } else if (activePanel === 'appChecksTradingAddress') {
      setAppChecksRow('tradingAddress', 'complete', ts)
      setIsPanelOpen(false)
      setActivePanel(null)
    }
  }

  // ── Reusable sub-row renderer ───────────────────────────────────────────────
  function SubRow({
    label,
    status,
    savedAt,
    panelKey,
    onStart,
    isLocked = false,
    isActive = false,
  }: {
    label: string
    status: SectionStatus
    savedAt: string
    panelKey: string
    onStart?: () => void
    isLocked?: boolean
    isActive?: boolean
  }) {
    // While a panel is actively open and not yet complete, treat it as in-progress
    const effectiveStatus: SectionStatus =
      isActive && status !== 'complete' ? 'inProgress' : status

    return (
      <div className={effectiveStatus === 'inProgress' ? formRowInProgress : formRow}>
        <span className={isLocked || effectiveStatus === 'idle' ? formRowLabelLocked : formRowLabel}>{label}</span>
        {effectiveStatus === 'complete' ? (
          <div className={savedRowActions}>
            <div className={inProgressIndicator}><span className={completeDot} /><span className={completeText}>Complete</span></div>
            <span className={savedTimestampValue}>{savedAt}</span>
            <Button variant="secondary" onClick={() => openPanel(panelKey)}>Review</Button>
          </div>
        ) : effectiveStatus === 'saved' ? (
          <div className={savedRowActions}>
            <div className={inProgressIndicator}><span className={inProgressDot} /><span className={inProgressText}>In progress</span></div>
            <div className={savedTimestampGroup}><span className={savedTimestampLabel}>Saved:</span><span className={savedTimestampValue}>{savedAt}</span></div>
            <Button variant="secondary" onClick={() => openPanel(panelKey)}>Continue</Button>
          </div>
        ) : effectiveStatus === 'inProgress' ? (
          <div className={inProgressIndicator}><span className={inProgressDot} /><span className={inProgressText}>In progress</span></div>
        ) : isLocked ? (
          <LockedButton />
        ) : (
          <Button onClick={onStart}>Start</Button>
        )}
      </div>
    )
  }

  const breadcrumbLabel = merchantName ? `Application - ${merchantName}` : 'Application'

  return (
    <div className={pageContainer}>
      {!isMobile && (
        <SideNavigation
          companyLogo={logoPicker}
          companyName={logoLabel || 'Barclaycard'}
          companyLink="/"
          isExpanded={isNavExpanded}
          onExpandChange={setIsNavExpanded}
        >
          <NavigationItem icon={UserListIcon} label="Merchants" isExpanded={isNavExpanded} />
          <NavigationItem icon={CardsThreeIcon} label="Applications" isActive isExpanded={isNavExpanded} />
        </SideNavigation>
      )}

      <div className={mainContent}>
        {!isMobile && (
          <TopNavBar
            user={{ firstName: 'Oliver', lastName: 'Smith', email: 'o.smith@tuza.co.uk' }}
            breadcrumbs={[
              { label: 'Applications', href: '/applications' },
              { label: breadcrumbLabel, href: '#' },
            ]}
            onSignOut={() => {}}
            onSettingsClick={onSettingsClick}
          />
        )}

        {/* Title bar */}
        <div className={titleBar}>
          <div className={titleLeft}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span className={titleText}>
                Application{merchantName ? ' ' : ''}
                {merchantName && <span className={titleMerchantName}>{merchantName}</span>}
              </span>
            </div>
            <Status variant="draft" text="Draft" />
          </div>
          <div className={titleButtons}>
            {lastSavedAt && (
              <div className={titleSavedGroup}>
                <span className={titleSavedLabel}>Updated:</span>
                <span className={titleSavedValue}>{lastSavedAt}</span>
              </div>
            )}
            <Button isDisabled={!allSectionsComplete} onClick={() => onSubmit?.(merchantName)}>Submit application</Button>
          </div>
        </div>

        {/* Flex row: left column + side panel */}
        <div className={contentRow}>
        <div className={leftColumn}>

          {/* Contact info bar */}
          <div className={infoBar}>
            <div className={infoItems}>
              <div className={infoItem}>
                <span className={infoLabel}>Contact</span>
                <span className={infoValue}>{contactName}</span>
              </div>
              <div className={infoItem}>
                <span className={infoLabel}>Phone</span>
                <span className={infoValue}>{phone}</span>
              </div>
              <div className={infoItem}>
                <span className={infoLabel}>Email</span>
                <span className={infoValue}>{email}</span>
              </div>
            </div>
          </div>

          <div className={applicationBody}>

            {/* ── Section 1: Business Information ── */}
            <div className={quotingSection}>
              <div
                className={bizInfoComplete ? sectionHeaderClickable : sectionHeader}
                onClick={bizInfoComplete ? () => setBizInfoCollapsed(c => !c) : undefined}
              >
                <div className={sectionTitleGroup}>
                  <div className={stepSquare}><span className={stepNumber}>1</span></div>
                  <span className={sectionTitle}>Business Information</span>
                </div>
                {bizInfoComplete && (
                  <div className={sectionCompleteActions}>
                    <div className={inProgressIndicator}>
                      <span className={completeDot} /><span className={completeText}>Complete</span>
                    </div>
                    <span className={sectionCollapseBtn}>
                      {bizInfoCollapsed ? <CaretDownIcon size={16} /> : <CaretUpIcon size={16} />}
                    </span>
                  </div>
                )}
              </div>

              {!bizInfoCollapsed && (
                <div className={formRows}>
                  <SubRow
                    label="Payments"
                    status={bizPaymentsStatus}
                    savedAt={bizPaymentsSavedAt}
                    panelKey="bizPayments"
                    isActive={isPanelOpen && activePanel === 'bizPayments'}
                    onStart={() => { setBizPaymentsStatus('inProgress'); openPanel('bizPayments') }}
                  />
                  <SubRow
                    label="Details"
                    status={bizDetailsStatus}
                    savedAt={bizDetailsSavedAt}
                    panelKey="bizDetails"
                    isLocked={bizPaymentsStatus !== 'complete'}
                    isActive={isPanelOpen && activePanel === 'bizDetails'}
                    onStart={() => { setBizDetailsStatus('inProgress'); openPanel('bizDetails') }}
                  />
                </div>
              )}
            </div>

            {/* ── Section 2: Product Selection ── */}
            <div className={productSelectionUnlocked ? quotingSection : lockedSection}>
              <div
                className={productSelectionComplete ? sectionHeaderClickable : sectionHeader}
                onClick={productSelectionComplete ? () => setProductSelectionCollapsed(c => !c) : undefined}
              >
                <div className={sectionTitleGroup}>
                  <div className={productSelectionUnlocked ? stepSquare : stepSquareLocked}>
                    <span className={stepNumber}>2</span>
                  </div>
                  <span className={productSelectionUnlocked ? sectionTitle : sectionTitleLocked}>Product Selection</span>
                </div>
                {!productSelectionUnlocked && <LockedButton />}
                {productSelectionComplete && (
                  <div className={sectionCompleteActions}>
                    <div className={inProgressIndicator}><span className={completeDot} /><span className={completeText}>Complete</span></div>
                    <span className={sectionCollapseBtn}>
                      {productSelectionCollapsed ? <CaretDownIcon size={16} /> : <CaretUpIcon size={16} />}
                    </span>
                  </div>
                )}
              </div>

              {productSelectionUnlocked && !productSelectionCollapsed && (
                <>
                  <div className={formRows}>
                    {products.map((prod, idx) => {
                      const prev = idx > 0 ? products[idx - 1] : null
                      const locked = prev !== null && prev.status !== 'complete'
                      return (
                        <SubRow
                          key={prod.id}
                          label={prod.name ? `Product #${prod.id} – ${prod.name}` : `Product #${prod.id}`}
                          status={prod.status}
                          savedAt={prod.savedAt}
                          panelKey={`product-${prod.id}`}
                          isLocked={locked}
                          isActive={isPanelOpen && activePanel === `product-${prod.id}`}
                          onStart={() => { updateProduct(prod.id, 'inProgress'); openPanel(`product-${prod.id}`) }}
                        />
                      )
                    })}
                  </div>
                  <div style={{ padding: '10px 16px' }}>
                    <span className={productHintText}>
                      Additional products can be configured after the first product is completed.
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* ── Section 3: Application Form ── */}
            <div className={appFormUnlocked ? quotingSection : lockedSection}>
              <div
                className={appFormComplete ? sectionHeaderClickable : sectionHeader}
                onClick={appFormComplete ? () => setAppFormCollapsed(c => !c) : undefined}
              >
                <div className={sectionTitleGroup}>
                  <div className={appFormUnlocked ? stepSquare : stepSquareLocked}><span className={stepNumber}>3</span></div>
                  <span className={appFormUnlocked ? sectionTitle : sectionTitleLocked}>Application Form</span>
                </div>
                {!appFormUnlocked && <LockedButton />}
                {appFormComplete && (
                  <div className={sectionCompleteActions}>
                    <div className={inProgressIndicator}><span className={completeDot} /><span className={completeText}>Complete</span></div>
                    <span className={sectionCollapseBtn}>
                      {appFormCollapsed ? <CaretDownIcon size={16} /> : <CaretUpIcon size={16} />}
                    </span>
                  </div>
                )}
              </div>
              {appFormUnlocked && !appFormCollapsed && (
                <div className={formRows}>
                  {([
                    { key: 'appFormBusiness' as AppFormKey, label: 'Business',          prevKey: null                          },
                    { key: 'appFormOwners'   as AppFormKey, label: 'Owners',             prevKey: 'appFormBusiness' as AppFormKey },
                    { key: 'appFormPayments' as AppFormKey, label: 'Payments',           prevKey: 'appFormOwners'   as AppFormKey },
                    { key: 'appFormGoods'    as AppFormKey, label: 'Goods and services', prevKey: 'appFormPayments' as AppFormKey },
                    { key: 'appFormBank'     as AppFormKey, label: 'Bank details',       prevKey: 'appFormGoods'    as AppFormKey },
                  ]).map(({ key, label, prevKey }) => {
                    const { status, savedAt } = appFormRows[key]
                    const locked = prevKey !== null && appFormRows[prevKey].status !== 'complete'
                    return (
                      <SubRow
                        key={key}
                        label={label}
                        status={status}
                        savedAt={savedAt}
                        panelKey={key}
                        isLocked={locked}
                        isActive={isPanelOpen && activePanel === key}
                        onStart={() => { setAppFormRow(key, 'inProgress'); openPanel(key) }}
                      />
                    )
                  })}
                </div>
              )}
            </div>

            {/* Section 4: Application Checks — hidden until needed */}

          </div>
        </div>{/* end leftColumn */}

        {/* ── Panels ── */}
        <BusinessInfoPanel
          isOpen={isPanelOpen && activePanel === 'bizPayments'}
          onClose={handlePanelClose}
          onComplete={handlePanelComplete}
        />
        <BizDetailsPanel
          isOpen={isPanelOpen && activePanel === 'bizDetails'}
          onClose={handlePanelClose}
          onComplete={handlePanelComplete}
          merchantName={merchantName}
          initialBusinessType={businessType}
          initialBusinessDescription={businessDescription}
          initialMcc={mcc}
        />
        {products.map(prod => (
          <ProductSelectionPanel
            key={prod.id}
            productNumber={prod.id}
            isOpen={isPanelOpen && activePanel === `product-${prod.id}`}
            onClose={handlePanelClose}
            onComplete={handlePanelComplete}
            onAddProduct={() => {
              // Mark this product complete then immediately add + open the next
              const ts = formatTimestamp()
              setLastSavedAt(ts)
              updateProduct(prod.id, 'complete', ts)
              addProduct()
            }}
            onDelete={() => deleteProduct(prod.id)}
            onProductNameChange={(name) => updateProduct(prod.id, products.find(p => p.id === prod.id)?.status ?? 'inProgress', products.find(p => p.id === prod.id)?.savedAt ?? '', name)}
          />
        ))}
        <AppFormBusinessPanel
          isOpen={isPanelOpen && activePanel === 'appFormBusiness'}
          onClose={handlePanelClose}
          onComplete={handlePanelComplete}
          merchantName={merchantName}
          initialBusinessType={businessType}
          initialPhone={phone}
        />
        <AppFormOwnersPanel
          isOpen={isPanelOpen && activePanel === 'appFormOwners'}
          onClose={handlePanelClose}
          onComplete={handlePanelComplete}
        />
        <AppFormPaymentsPanel
          isOpen={isPanelOpen && activePanel === 'appFormPayments'}
          onClose={handlePanelClose}
          onComplete={handlePanelComplete}
          initialMcc={mcc}
        />
        <AppFormGoodsPanel
          isOpen={isPanelOpen && activePanel === 'appFormGoods'}
          onClose={handlePanelClose}
          onComplete={handlePanelComplete}
        />
        <AppFormBankPanel
          isOpen={isPanelOpen && activePanel === 'appFormBank'}
          onClose={handlePanelClose}
          onComplete={handlePanelComplete}
          initialEmail={email}
        />

        </div>
      </div>
    </div>
  )
}
