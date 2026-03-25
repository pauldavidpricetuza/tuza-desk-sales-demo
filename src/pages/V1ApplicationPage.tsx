import React, { useState } from 'react'
import { UserListIcon, CardsThreeIcon } from '@phosphor-icons/react'
import { SideNavigation, NavigationItem } from '#ui/SideNavigation/SideNavigation'
import { TopNavBar } from '#ui/TopNavBar/TopNavBar'
import { V1TitleBar, type V1Section } from '../components/V1TitleBar'
import { NotesPanel } from '../components/NotesPanel'
import { V1BusinessInfoSection, type BusinessInfoData } from '../components/V1BusinessInfoSection'
import { V1ProductsSection } from '../components/V1ProductsSection'
import { V1ApplicationSection } from '../components/V1ApplicationSection'
import { V1ChecksSection } from '../components/V1ChecksSection'
import { pageContainer, mainContent } from './ApplicationsList.css'
import { useIsMobile } from '../hooks/useIsMobile'

interface V1ApplicationPageProps {
  merchantName?: string
  contactName: string
  phone: string
  email: string
  businessType?: string
  businessDescription?: string
  mcc?: string
  logoPicker: React.ReactNode
  logoLabel?: string
  onBack?: () => void
  onSubmit?: (merchantName?: string) => void
  onSettingsClick?: () => void
}


export function V1ApplicationPage({
  merchantName, contactName, phone, email, businessType, businessDescription, mcc,
  logoPicker, logoLabel, onBack, onSubmit, onSettingsClick,
}: V1ApplicationPageProps) {
  const isMobile = useIsMobile()
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [currentSection, setCurrentSection] = useState<V1Section>('business-info')
  const [notesOpen, setNotesOpen] = useState(false)
  // Show inline warning in Business Info when the user navigates back after starting Products
  const [showProductWarning, setShowProductWarning] = useState(false)

  // Track which sections have been completed
  const [completedSections, setCompletedSections] = useState<Set<V1Section>>(new Set())

  // Once Application is entered, business-info and products are locked
  const [applicationEntered, setApplicationEntered] = useState(false)

  // Store collected business info from section 1
  const [collectedBizInfo, setCollectedBizInfo] = useState<BusinessInfoData | null>(null)

  // Track whether products section has been started (to trigger warning on back-nav)
  const [productsStarted, setProductsStarted] = useState(false)

  // Incrementing this key forces V1ProductsSection to remount (clearing its state)
  // when the user confirms going back to Business Info after starting Products
  const [productsResetKey, setProductsResetKey] = useState(0)


  const lockedSections: Set<V1Section> = applicationEntered
    ? new Set(['business-info', 'products'])
    : new Set()

  function markComplete(section: V1Section) {
    setCompletedSections(prev => new Set([...prev, section]))
  }

  function handleNavigate(target: V1Section) {
    if (target === currentSection) return
    // Navigating back to Business Info after Products started — go straight there, show inline warning
    if (target === 'business-info' && productsStarted && !applicationEntered) {
      setShowProductWarning(true)
    } else {
      setShowProductWarning(false)
    }
    setCurrentSection(target)
  }

  function handleBizInfoContinue(data: BusinessInfoData) {
    // If the user made changes and had products started, clear downstream sections
    if (productsStarted) {
      setCompletedSections(prev => {
        const next = new Set(prev)
        next.delete('products')
        next.delete('application')
        next.delete('checks')
        return next
      })
      setProductsStarted(false)
      // Force V1ProductsSection to remount so its internal state is wiped
      setProductsResetKey(k => k + 1)
    }
    setCollectedBizInfo(data)
    markComplete('business-info')
    setShowProductWarning(false)
    setCurrentSection('products')
    setProductsStarted(true)
  }

  const allComplete = (
    completedSections.has('business-info') &&
    completedSections.has('products') &&
    completedSections.has('application')
  )

  const effectiveName = collectedBizInfo?.businessName || merchantName
  const breadcrumbLabel = effectiveName ? `Application — ${effectiveName}` : 'New application'
  const notesKey = `v1-notes-${merchantName ?? 'new'}`

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
        {/* Top nav bar — hidden on mobile */}
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

        {/* V1 title bar (merchant name + step nav + notes + submit) */}
        <V1TitleBar
          merchantName={effectiveName}
          currentSection={currentSection}
          completedSections={completedSections}
          lockedSections={lockedSections}
          onNavigate={handleNavigate}
          allComplete={allComplete}
          onSubmit={() => onSubmit?.(merchantName)}
          notesOpen={notesOpen}
          onNotesToggle={() => setNotesOpen(o => !o)}
          isMobile={isMobile}
        />

        {/* Section content — all sections stay mounted to preserve state; CSS hides inactive ones */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

          <div style={{ display: currentSection === 'business-info' ? 'flex' : 'none', flex: 1, overflow: 'hidden' }}>
            <V1BusinessInfoSection
              initialData={{
                businessType,
                businessDescription,
                mcc,
                businessName: merchantName,
              }}
              isLocked={lockedSections.has('business-info')}
              showProductWarning={showProductWarning}
              contactName={contactName}
              phone={phone}
              email={email}
              isMobile={isMobile}
              onContinue={handleBizInfoContinue}
            />
          </div>

          <div style={{ display: currentSection === 'products' ? 'flex' : 'none', flex: 1, overflow: 'hidden' }}>
            <V1ProductsSection
              key={productsResetKey}
              isLocked={lockedSections.has('products')}
              isMobile={isMobile}
              onContinue={() => {
                markComplete('products')
                setApplicationEntered(true)
                setCurrentSection('application')
              }}
            />
          </div>

          <div style={{ display: currentSection === 'application' ? 'flex' : 'none', flex: 1, overflow: 'hidden' }}>
            <V1ApplicationSection
              merchantName={merchantName}
              businessType={collectedBizInfo?.businessType ?? businessType}
              phone={phone}
              email={email}
              mcc={collectedBizInfo?.mcc ?? mcc}
              isMobile={isMobile}
              onContinue={() => {
                markComplete('application')
                setCurrentSection('checks')
              }}
            />
          </div>

          <div style={{ display: currentSection === 'checks' ? 'flex' : 'none', flex: 1, overflow: 'hidden' }}>
            <V1ChecksSection
              allPreviousComplete={allComplete}
              isVisible={currentSection === 'checks'}
              onSubmit={() => onSubmit?.(merchantName)}
            />
          </div>

          <NotesPanel
            isOpen={notesOpen}
            onClose={() => setNotesOpen(false)}
            storageKey={notesKey}
          />

        </div>
      </div>

    </div>
  )
}
