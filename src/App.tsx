import { useEffect, useRef, useState } from 'react'
import { CheckCircleIcon } from '@phosphor-icons/react'
import { ApplicationsList } from './pages/ApplicationsList'
import { ApplicationPage } from './pages/ApplicationPage'
import { V1ApplicationsList } from './pages/V1ApplicationsList'
import { V1ApplicationPage } from './pages/V1ApplicationPage'
import { LogoPickerButton, type LogoOption } from './components/LogoPickerButton'
import { VersionSwitcherModal, type DemoVersion } from './components/VersionSwitcherModal'

interface ApplicationData {
  merchantName?: string
  contactName: string
  phone: string
  email: string
  businessType?: string
  businessDescription?: string
  mcc?: string
  completionState?: 'draft' | 'in-progress' | 'complete'
}

type AppView =
  | { page: 'list' }
  | { page: 'application'; data: ApplicationData }

function SubmitToast({ merchantName, onDone }: { merchantName?: string; onDone: () => void }) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Animate in after mount
    const show = setTimeout(() => setVisible(true), 10)
    // Auto-dismiss after 4 s
    const hide = setTimeout(() => {
      setVisible(false)
      timerRef.current = setTimeout(onDone, 300)
    }, 4000)
    return () => { clearTimeout(show); clearTimeout(hide); if (timerRef.current) clearTimeout(timerRef.current) }
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: 10,
        backgroundColor: '#062351', color: '#fff',
        borderRadius: 6, padding: '12px 18px',
        boxShadow: '0 4px 16px rgba(6,35,81,0.22)',
        fontSize: 14, fontFamily: "'Denim-Regular', sans-serif",
        letterSpacing: '0.42px',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.25s ease, opacity 0.25s ease',
        pointerEvents: 'none',
      }}
    >
      <CheckCircleIcon size={18} color="#2a9d5c" weight="fill" />
      <span>
        {merchantName ? `Application for ${merchantName} submitted successfully` : 'Application submitted successfully'}
      </span>
    </div>
  )
}

export const LOGO_OPTIONS: LogoOption[] = [
  { id: 'worldpay',          url: '/worldpay-logo.png',        label: 'Worldpay',    sublabel: 'W logo' },
  { id: 'barclaycard-blue',  url: '/barclaycard-logo.png',     label: 'Barclaycard', sublabel: 'Blue icon' },
  { id: 'barclaycard-white', url: '/barclaycard-logo-alt.png', label: 'Barclaycard', sublabel: 'White icon' },
  { id: 'natwest',           url: '/natwest-logo.png',         label: 'NatWest',     sublabel: 'NW logo' },
]

export default function App() {
  const [view, setView] = useState<AppView>({ page: 'list' })
  const [toast, setToast] = useState<{ merchantName?: string } | null>(null)
  const [logoId, setLogoId] = useState<string>(
    () => localStorage.getItem('bc-logo-id') ?? 'barclaycard-blue'
  )
  const [version, setVersion] = useState<DemoVersion>(
    () => (localStorage.getItem('desk-sales-version') as DemoVersion) ?? 'v0'
  )
  const [showVersionModal, setShowVersionModal] = useState(false)

  function handleLogoSelect(id: string) {
    localStorage.setItem('bc-logo-id', id)
    setLogoId(id)
  }

  function handleVersionSelect(v: DemoVersion) {
    localStorage.setItem('desk-sales-version', v)
    setVersion(v)
    setView({ page: 'list' })
  }

  const selectedLogo = LOGO_OPTIONS.find(o => o.id === logoId) ?? LOGO_OPTIONS[0]

  const logoPicker = (
    <LogoPickerButton
      options={LOGO_OPTIONS}
      selectedId={logoId}
      onSelect={handleLogoSelect}
    />
  )

  const onSettingsClick = () => setShowVersionModal(true)

  if (version === 'v1') {
    return (
      <>
        {showVersionModal && (
          <VersionSwitcherModal
            selectedVersion={version}
            onSelect={handleVersionSelect}
            onClose={() => setShowVersionModal(false)}
          />
        )}
        {view.page === 'application' ? (
          <V1ApplicationPage
            merchantName={view.data.merchantName}
            contactName={view.data.contactName}
            phone={view.data.phone}
            email={view.data.email}
            businessType={view.data.businessType}
            businessDescription={view.data.businessDescription}
            mcc={view.data.mcc}
            logoPicker={logoPicker}
            logoLabel={selectedLogo.label}
            onBack={() => setView({ page: 'list' })}
            onSubmit={(merchantName) => {
              setView({ page: 'list' })
              setToast({ merchantName })
            }}
            onSettingsClick={onSettingsClick}
          />
        ) : (
          <V1ApplicationsList
            logoPicker={logoPicker}
            logoLabel={selectedLogo.label}
            onStartApplication={(data) => setView({ page: 'application', data })}
            onOpenApplication={(data) => setView({ page: 'application', data })}
            onSettingsClick={onSettingsClick}
          />
        )}
      </>
    )
  }

  if (view.page === 'application') {
    return (
      <>
        {showVersionModal && (
          <VersionSwitcherModal
            selectedVersion={version}
            onSelect={handleVersionSelect}
            onClose={() => setShowVersionModal(false)}
          />
        )}
        <ApplicationPage
          merchantName={view.data.merchantName}
          contactName={view.data.contactName}
          phone={view.data.phone}
          email={view.data.email}
          businessType={view.data.businessType}
          businessDescription={view.data.businessDescription}
          mcc={view.data.mcc}
          completionState={view.data.completionState}
          logoPicker={logoPicker}
          logoLabel={selectedLogo.label}
          onBack={() => setView({ page: 'list' })}
          onSubmit={(merchantName) => {
            setView({ page: 'list' })
            setToast({ merchantName })
          }}
          onSettingsClick={onSettingsClick}
        />
      </>
    )
  }

  return (
    <>
      {showVersionModal && (
        <VersionSwitcherModal
          selectedVersion={version}
          onSelect={handleVersionSelect}
          onClose={() => setShowVersionModal(false)}
        />
      )}
      <ApplicationsList
        logoPicker={logoPicker}
        logoLabel={selectedLogo.label}
        onStartApplication={(data) => setView({ page: 'application', data })}
        onOpenApplication={(data) => setView({ page: 'application', data })}
        onSettingsClick={onSettingsClick}
      />
      {toast && (
        <SubmitToast
          merchantName={toast.merchantName}
          onDone={() => setToast(null)}
        />
      )}
    </>
  )
}
