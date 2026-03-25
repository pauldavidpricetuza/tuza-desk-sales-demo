import { Button } from '#ui/Button/Button'
import {
  panelWrapper,
  panelWrapperOpen,
  panel,
  panelHeader,
  panelHeaderTitle,
  panelHeaderTitleAccent,
  panelContent,
  panelFooter,
} from './BusinessInfoPanel.css'

interface AppFormPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  sectionTitle: string
  panelPrefix?: string
}

export function AppFormPanel({ isOpen, onClose, onComplete, sectionTitle, panelPrefix = 'Application Form:' }: AppFormPanelProps) {
  return (
    <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
      <div className={panel}>

        <div className={panelHeader}>
          <span className={panelHeaderTitle}>
            <span className={panelHeaderTitleAccent}>{panelPrefix}</span> {sectionTitle}
          </span>
        </div>

        <div className={panelContent}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 12,
            opacity: 0.45,
            padding: 40,
            textAlign: 'center',
          }}>
            <span style={{ fontSize: 32 }}>🚧</span>
            <p style={{ margin: 0, fontSize: 14, color: '#062351', fontWeight: 500 }}>
              {sectionTitle} — coming soon
            </p>
            <p style={{ margin: 0, fontSize: 13, color: '#062351' }}>
              This section will be built out next.
            </p>
          </div>
        </div>

        <div className={panelFooter}>
          <Button variant="secondary" onClick={onClose}>Save &amp; close</Button>
          <Button onClick={onComplete}>Complete section</Button>
        </div>

      </div>
    </div>
  )
}
