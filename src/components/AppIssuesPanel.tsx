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
  formSection,
  sectionTitleRow,
  sectionTitleLeft,
  sectionTitleText,
  fieldGroup,
  fieldLabelRow,
  fieldLabel,
  fieldInput,
  fieldTextarea,
} from './BusinessInfoPanel.css'

interface AppIssuesPanelProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  merchantName?: string
}

const MOCK_ISSUES = [
  { id: 1, severity: 'high', field: 'Business Description', message: 'MCC code 5812 (Restaurants) may not match stated business activity. Please review and confirm.' },
  { id: 2, severity: 'medium', field: 'Bank Details', message: 'Sort code provided does not match the registered business address region.' },
  { id: 3, severity: 'low', field: 'Director Details', message: 'Date of birth not verified against Companies House records.' },
]

const SEVERITY_COLOURS: Record<string, { dot: string; label: string; bg: string }> = {
  high:   { dot: '#d94f4f', label: 'High',   bg: '#fdf2f2' },
  medium: { dot: '#E07B39', label: 'Medium', bg: '#fdf6f2' },
  low:    { dot: '#4367a2', label: 'Low',    bg: '#f0f4fa' },
}

export function AppIssuesPanel({ isOpen, onClose, onComplete, merchantName }: AppIssuesPanelProps) {
  return (
    <div className={`${panelWrapper}${isOpen ? ` ${panelWrapperOpen}` : ''}`}>
      <div className={panel}>

        <div className={panelHeader}>
          <span className={panelHeaderTitle}>
            <span className={panelHeaderTitleAccent}>Application Issues</span>
            {merchantName && <>: {merchantName}</>}
          </span>
        </div>

        <div className={panelContent}>

          {/* Issue list */}
          <div className={formSection}>
            <div className={sectionTitleRow}>
              <div className={sectionTitleLeft}>
                <span className={sectionTitleText}>Flagged Issues ({MOCK_ISSUES.length})</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_ISSUES.map(issue => {
                const sev = SEVERITY_COLOURS[issue.severity]
                return (
                  <div
                    key={issue.id}
                    style={{
                      backgroundColor: sev.bg,
                      borderRadius: 6,
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      borderLeft: `3px solid ${sev.dot}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        backgroundColor: sev.dot,
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: sev.dot, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {sev.label}
                      </span>
                      <span style={{ fontSize: 12, color: '#062351', opacity: 0.5, marginLeft: 4 }}>
                        {issue.field}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: '18px', color: '#062351' }}>
                      {issue.message}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Resolution notes */}
          <div className={formSection} style={{ borderTop: '1px solid #e4e9f2' }}>
            <div className={sectionTitleRow}>
              <div className={sectionTitleLeft}>
                <span className={sectionTitleText}>Resolution Notes</span>
              </div>
            </div>

            <div className={fieldGroup}>
              <div className={fieldLabelRow}>
                <label className={fieldLabel}>Underwriter reference number (optional)</label>
              </div>
              <input className={fieldInput} type="text" placeholder="e.g. UW-2025-001234" />
            </div>

            <div className={fieldGroup}>
              <div className={fieldLabelRow}>
                <label className={fieldLabel}>Notes</label>
              </div>
              <textarea
                className={fieldTextarea}
                placeholder="Add any resolution notes or context for underwriting review..."
                rows={4}
              />
            </div>
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
