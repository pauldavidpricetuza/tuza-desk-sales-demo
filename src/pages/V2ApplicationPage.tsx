import React, { useState, useCallback } from 'react'
import { UserListIcon, CardsThreeIcon } from '@phosphor-icons/react'
import { SideNavigation, NavigationItem } from '#ui/SideNavigation/SideNavigation'
import { TopNavBar } from '#ui/TopNavBar/TopNavBar'
import { V1TitleBar, type V1Section } from '../components/V1TitleBar'
import { NotesPanel } from '../components/NotesPanel'
import { V1BusinessInfoSection, type BusinessInfoData } from '../components/V1BusinessInfoSection'
import { V1ProductsSection } from '../components/V1ProductsSection'
import { V1ApplicationSection } from '../components/V1ApplicationSection'
import { V1ChecksSection } from '../components/V1ChecksSection'
import { VoiceAssistPanel } from '../voice/VoiceAssistPanel'
import type { ApplicationVoicePatch, ProductsVoicePatch, VoiceSection } from '../voice/fieldSchemas'
import { pageContainer, mainContent } from './ApplicationsList.css'
import { useIsMobile } from '../hooks/useIsMobile'

interface V2ApplicationPageProps {
  merchantName?: string
  contactName: string
  phone: string
  email: string
  businessType?: string
  businessDescription?: string
  mcc?: string
  logoPicker: React.ReactNode
  logoLabel?: string
  onSubmit?: (merchantName?: string) => void
  onSettingsClick?: () => void
}

export function V2ApplicationPage({
  merchantName, contactName, phone, email, businessType, businessDescription, mcc,
  logoPicker, logoLabel, onBack, onSubmit, onSettingsClick,
}: V2ApplicationPageProps) {
  const isMobile = useIsMobile()
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [currentSection, setCurrentSection] = useState<V1Section>('business-info')
  const [notesOpen, setNotesOpen] = useState(false)
  const [showProductWarning, setShowProductWarning] = useState(false)
  const [completedSections, setCompletedSections] = useState<Set<V1Section>>(new Set())
  const [applicationEntered, setApplicationEntered] = useState(false)
  const [collectedBizInfo, setCollectedBizInfo] = useState<BusinessInfoData | null>(null)
  const [productsStarted, setProductsStarted] = useState(false)
  const [productsResetKey, setProductsResetKey] = useState(0)

  const [voiceBiPatch, setVoiceBiPatch] = useState<Partial<BusinessInfoData>>({})
  const [voiceBiNonce, setVoiceBiNonce] = useState(0)
  const [voicePrPatch, setVoicePrPatch] = useState<ProductsVoicePatch>({})
  const [voicePrNonce, setVoicePrNonce] = useState(0)
  const [voiceApPatch, setVoiceApPatch] = useState<ApplicationVoicePatch>({})
  const [voiceApNonce, setVoiceApNonce] = useState(0)

  const handleVoicePatch = useCallback((section: VoiceSection, patch: Record<string, unknown>) => {
    if (section === 'business-info') {
      setVoiceBiPatch(patch as Partial<BusinessInfoData>)
      setVoiceBiNonce(n => n + 1)
    } else if (section === 'products') {
      setVoicePrPatch(patch as ProductsVoicePatch)
      setVoicePrNonce(n => n + 1)
    } else if (section === 'application') {
      setVoiceApPatch(patch as ApplicationVoicePatch)
      setVoiceApNonce(n => n + 1)
    }
  }, [])

  const lockedSections: Set<V1Section> = applicationEntered
    ? new Set(['business-info', 'products'])
    : new Set()

  function markComplete(section: V1Section) {
    setCompletedSections(prev => new Set([...prev, section]))
  }

  function handleNavigate(target: V1Section) {
    if (target === currentSection) return
    if (target === 'business-info' && productsStarted && !applicationEntered) {
      setShowProductWarning(true)
    } else {
      setShowProductWarning(false)
    }
    setCurrentSection(target)
  }

  function handleBizInfoContinue(data: BusinessInfoData) {
    if (productsStarted) {
      setCompletedSections(prev => {
        const next = new Set(prev)
        next.delete('products')
        next.delete('application')
        next.delete('checks')
        return next
      })
      setProductsStarted(false)
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
  const notesKey = `v2-notes-${merchantName ?? 'new'}`

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
          voiceSlot={
            <VoiceAssistPanel
              currentSection={currentSection}
              onPatch={handleVoicePatch}
            />
          }
        />

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
              voicePatch={voiceBiPatch}
              voicePatchNonce={voiceBiNonce}
              onContinue={handleBizInfoContinue}
            />
          </div>

          <div style={{ display: currentSection === 'products' ? 'flex' : 'none', flex: 1, overflow: 'hidden' }}>
            <V1ProductsSection
              key={productsResetKey}
              isLocked={lockedSections.has('products')}
              isMobile={isMobile}
              voicePatch={voicePrPatch}
              voicePatchNonce={voicePrNonce}
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
              voicePatch={voiceApPatch}
              voicePatchNonce={voiceApNonce}
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
