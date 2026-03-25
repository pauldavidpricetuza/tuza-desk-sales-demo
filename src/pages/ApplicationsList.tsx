import React, { useState, useRef, useEffect } from 'react'
import {
  UserListIcon,
  CardsThreeIcon,
} from '@phosphor-icons/react'
import { SideNavigation, NavigationItem } from '#ui/SideNavigation/SideNavigation'
import { TopNavBar } from '#ui/TopNavBar/TopNavBar'
import { TitleBar } from '#ui/TitleBar/TitleBar'
import { Button } from '#ui/Button/Button'
import { Status } from '#ui/Status/Status'
import { CreateMerchantModal } from '../components/CreateMerchantModal'
import { SelectMerchantModal } from '../components/SelectMerchantModal'
import { pageContainer, mainContent, tableWrapper, contextMenu, contextMenuItem, contextMenuItemHover } from './ApplicationsList.css'
import { useIsMobile } from '../hooks/useIsMobile'

type ApplicationStatus = 'complete' | 'draft' | 'in-progress'
type CompletionState = 'draft' | 'in-progress' | 'complete'

interface Application {
  id: string
  applicationId: string
  businessName: string
  status: ApplicationStatus
  completionState: CompletionState
  createdAt: string
  contactName: string
  phone: string
  email: string
  businessType?: string
  businessDescription?: string
  mcc?: string
  lockedBy?: string
  annualCardTurnover: string
  avgTxValue: string
  channel: string
  utmCampaign: string
  utmSource: string
  syncedToCrm: string
}

const MOCK_APPLICATIONS: Application[] = [
  { id: '1',  applicationId: '45e519b4-f57a-4f24-90e0-1d5150d4b408', businessName: 'MY COSMETIC CLINIC LIMITED',   status: 'complete',    completionState: 'complete',    createdAt: '09:14 • 12 Mar 2026', contactName: 'Sarah Mitchell',   phone: '07700 900123', email: 's.mitchell@mycosmeticclinic.co.uk',  businessType: 'Private limited company (Ltd)', businessDescription: 'Medical aesthetics clinic.', mcc: '8099', annualCardTurnover: '£320,000', avgTxValue: '£95',  channel: 'Signup Completed', utmCampaign: 'TEST-WP-360-CAMPAIGN', utmSource: 'google',   syncedToCrm: '09:14 • 12 Mar 2026' },
  { id: '2',  applicationId: '7b3a82c1-e14d-4b77-a3c9-2f8640e1b205', businessName: 'URBAN EATS GROUP LIMITED',     status: 'draft',       completionState: 'draft',       createdAt: '08:47 • 12 Mar 2026', contactName: 'James Park',       phone: '07700 900456', email: 'j.park@urbaneats.co.uk',             annualCardTurnover: '£180,000', avgTxValue: '£28',  channel: 'Demo Request',     utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '08:47 • 12 Mar 2026' },
  { id: '3',  applicationId: 'c9d45f21-8a3b-4e56-b7c8-9d0f1e2a3b4c', businessName: 'NORTHFIELD DENTAL PRACTICE',  status: 'in-progress', completionState: 'in-progress', createdAt: '07:33 • 12 Mar 2026', contactName: 'Dr Anna Clarke',   phone: '07700 900789', email: 'a.clarke@northfielddental.co.uk',    businessType: 'Sole trader',                   businessDescription: 'General dental practice.', mcc: '8021', annualCardTurnover: '£210,000', avgTxValue: '£55',  channel: 'Partner Referral', utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '–' },
  { id: '4',  applicationId: '3e7f1a92-b4c5-4d68-8e9f-0a1b2c3d4e5f', businessName: 'SUMMIT FITNESS CENTRES LTD',  status: 'complete',    completionState: 'complete',    createdAt: '16:02 • 11 Mar 2026', contactName: 'Mark Evans',       phone: '07700 900321', email: 'm.evans@summitfitness.co.uk',         businessType: 'Private limited company (Ltd)', businessDescription: 'Chain of fitness centres.', mcc: '7941', annualCardTurnover: '£540,000', avgTxValue: '£42',  channel: 'Signup Completed', utmCampaign: 'WP-GYM-2026',          utmSource: 'facebook', syncedToCrm: '16:02 • 11 Mar 2026' },
  { id: '5',  applicationId: 'f8e7d6c5-b4a3-4921-8f7e-6d5c4b3a2190', businessName: 'MERIDIAN AUTO SERVICES PLC',  status: 'draft',       completionState: 'draft',       createdAt: '14:51 • 11 Mar 2026', contactName: 'David Patel',      phone: '07700 900654', email: 'd.patel@meridianaut.co.uk',           annualCardTurnover: '£290,000', avgTxValue: '£180', channel: 'Direct',           utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '–' },
  { id: '6',  applicationId: 'a1b2c3d4-e5f6-4789-90ab-cdef01234567', businessName: 'GREENLEAF PHARMACY GROUP',    status: 'in-progress', completionState: 'in-progress', createdAt: '11:25 • 11 Mar 2026', contactName: 'Priya Sharma',     phone: '07700 900987', email: 'p.sharma@greenleafpharmacy.co.uk',   businessType: 'Public limited company (PLC)',  businessDescription: 'Independent pharmacy group.', mcc: '5912', lockedBy: 'Isaac Langley', annualCardTurnover: '£200,000', avgTxValue: '£35',  channel: 'Signup Completed', utmCampaign: 'TEST-WP-360-CAMPAIGN', utmSource: '–',        syncedToCrm: '11:25 • 11 Mar 2026' },
  { id: '7',  applicationId: '9876fedc-ba98-4765-4321-fedcba987654', businessName: 'HARBOUR LIGHT HOTELS LTD',    status: 'in-progress', completionState: 'in-progress', createdAt: '09:18 • 11 Mar 2026', contactName: 'Robert Quinn',     phone: '07700 901234', email: 'r.quinn@harbourlight.co.uk',          businessType: 'Private limited company (Ltd)', businessDescription: 'Boutique hotel group.', mcc: '7011', annualCardTurnover: '£890,000', avgTxValue: '£145', channel: 'Partner Referral', utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '–' },
  { id: '8',  applicationId: '11223344-5566-4778-99aa-bbccddeeff00', businessName: 'CLOVER RECRUITMENT AGENCY',   status: 'in-progress', completionState: 'in-progress', createdAt: '15:44 • 10 Mar 2026', contactName: 'Laura White',      phone: '07700 901567', email: 'l.white@cloverrecruit.co.uk',         businessType: 'Private limited company (Ltd)', businessDescription: 'Specialist recruitment agency.', mcc: '7361', annualCardTurnover: '£130,000', avgTxValue: '£22',  channel: 'Demo Request',     utmCampaign: 'RECRUIT-Q1',           utmSource: 'linkedin', syncedToCrm: '15:44 • 10 Mar 2026' },
  { id: '9',  applicationId: '00ffeedd-ccbb-4aa9-8877-665544332211', businessName: 'TIDAL WAVE SURF SCHOOL',      status: 'in-progress', completionState: 'in-progress', createdAt: '13:09 • 10 Mar 2026', contactName: 'Ben Costa',        phone: '07700 901890', email: 'b.costa@tidalwavesurf.co.uk',         businessType: 'Sole trader',                   businessDescription: 'Surf school in Newquay.', mcc: '7999', annualCardTurnover: '£75,000',  avgTxValue: '£60',  channel: 'Direct',           utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '–' },
  { id: '10', applicationId: '13579bdf-2468-4ace-8024-68acf13579bd', businessName: 'FOXGLOVE FLORISTS LIMITED',   status: 'in-progress', completionState: 'in-progress', createdAt: '10:30 • 10 Mar 2026', contactName: 'Emma Thornton',    phone: '07700 902123', email: 'e.thornton@foxgloveflorists.co.uk',   businessType: 'Private limited company (Ltd)', businessDescription: 'Premium florist.', mcc: '5992', annualCardTurnover: '£95,000',  avgTxValue: '£48',  channel: 'Signup Completed', utmCampaign: '–',                    utmSource: 'organic',  syncedToCrm: '10:30 • 10 Mar 2026' },
  { id: '11', applicationId: 'abcdef01-2345-4678-9abc-def012345678', businessName: 'IRON BRIDGE ENGINEERING CO',  status: 'in-progress', completionState: 'in-progress', createdAt: '08:55 • 9 Mar 2026',  contactName: 'Tom Hadley',       phone: '07700 902456', email: 't.hadley@ironbridgeeng.co.uk',         businessType: 'Public limited company (PLC)',  businessDescription: 'Structural engineering services.', mcc: '1731', annualCardTurnover: '£1,200,000', avgTxValue: '£4,500', channel: 'Partner Referral', utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '–' },
  { id: '12', applicationId: '87654321-fedc-4ba9-8765-4321fedcba98', businessName: 'BLUEBELL NURSERY SCHOOL',     status: 'in-progress', completionState: 'in-progress', createdAt: '16:22 • 8 Mar 2026',  contactName: 'Claire Hooper',    phone: '07700 902789', email: 'c.hooper@bluebellnursery.co.uk',       businessType: 'Sole trader',                   businessDescription: 'Private nursery.', mcc: '8299', annualCardTurnover: '£60,000',  avgTxValue: '£80',  channel: 'Demo Request',     utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '16:22 • 8 Mar 2026' },
  { id: '13', applicationId: 'deadbeef-cafe-4bab-e000-000000000001', businessName: 'PEAK DISTRICT ADVENTURES',    status: 'in-progress', completionState: 'in-progress', createdAt: '11:47 • 8 Mar 2026',  contactName: 'Sam Wilson',       phone: '07700 903012', email: 's.wilson@peakadventures.co.uk',        businessType: 'Private limited company (Ltd)', businessDescription: 'Outdoor adventure tourism.', mcc: '7999', annualCardTurnover: '£110,000', avgTxValue: '£70',  channel: 'Signup Completed', utmCampaign: 'OUTDOOR-SPRING',       utmSource: 'google',   syncedToCrm: '–' },
  { id: '14', applicationId: '12345678-90ab-4cde-f012-3456789abcde', businessName: 'CRANBROOK LEGAL SERVICES',    status: 'in-progress', completionState: 'in-progress', createdAt: '09:04 • 8 Mar 2026',  contactName: 'Helen Marsh',      phone: '07700 903345', email: 'h.marsh@cranbrooklegal.co.uk',         businessType: 'Public limited company (PLC)',  businessDescription: 'Full-service law firm.', mcc: '7322', annualCardTurnover: '£440,000', avgTxValue: '£350', channel: 'Direct',           utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '09:04 • 8 Mar 2026' },
  { id: '15', applicationId: 'fedcba98-7654-4321-fedc-ba9876543210', businessName: 'STERLING WEALTH ADVISORS',    status: 'in-progress', completionState: 'in-progress', createdAt: '14:36 • 7 Mar 2026',  contactName: 'Michael Frost',    phone: '07700 903678', email: 'm.frost@sterlingwealth.co.uk',         businessType: 'Private limited company (Ltd)', businessDescription: 'Independent financial advisory.', mcc: '6282', annualCardTurnover: '£620,000', avgTxValue: '£280', channel: 'Partner Referral', utmCampaign: '–',                    utmSource: '–',        syncedToCrm: '–' },
  { id: '16', applicationId: 'c0ffee11-cafe-4bab-e000-000000000001', businessName: 'MOORLAND VETERINARY CLINIC',  status: 'in-progress', completionState: 'in-progress', createdAt: '10:12 • 6 Mar 2026',  contactName: 'Dr Sophie Baines', phone: '07700 903901', email: 's.baines@moorlandvet.co.uk',           businessType: 'Sole trader',                   businessDescription: 'Small animal veterinary practice.', mcc: '0742', annualCardTurnover: '£85,000',  avgTxValue: '£65',  channel: 'Signup Completed', utmCampaign: '–',                    utmSource: 'organic',  syncedToCrm: '10:12 • 6 Mar 2026' },
  { id: '17', applicationId: '0badf00d-dead-4beef-cafe-0123456789ab', businessName: 'WHITECHAPEL GALLERY TRUST',  status: 'in-progress', completionState: 'in-progress', createdAt: '08:29 • 5 Mar 2026',  contactName: 'Natalie Cross',    phone: '07700 904234', email: 'n.cross@whitechapelgallery.org',       businessType: 'Public limited company (PLC)',  businessDescription: 'Contemporary art gallery.', mcc: '7929', annualCardTurnover: '£160,000', avgTxValue: '£25',  channel: 'Demo Request',     utmCampaign: 'ARTS-Q1-2026',         utmSource: 'email',    syncedToCrm: '–' },
  { id: '18', applicationId: '5a4b3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d', businessName: 'RIVERSIDE BREWING COMPANY',  status: 'in-progress', completionState: 'in-progress', createdAt: '15:58 • 4 Mar 2026',  contactName: 'Chris Langley',    phone: '07700 904567', email: 'c.langley@riversidebrewing.co.uk',     businessType: 'Private limited company (Ltd)', businessDescription: 'Craft brewery and taproom.', mcc: '5813', annualCardTurnover: '£240,000', avgTxValue: '£18',  channel: 'Signup Completed', utmCampaign: 'BREW-SPRING',          utmSource: 'instagram', syncedToCrm: '15:58 • 4 Mar 2026' },
]

const statusVariantMap: Record<ApplicationStatus, 'active' | 'inactive' | 'draft'> = {
  complete: 'active',
  'in-progress': 'inactive',
  draft: 'draft',
}

const statusLabelMap: Record<ApplicationStatus, string> = {
  complete: 'Complete',
  'in-progress': 'In progress',
  draft: 'Draft',
}

interface ApplicationData {
  merchantName?: string
  contactName: string
  phone: string
  email: string
  businessType?: string
  businessDescription?: string
  mcc?: string
  completionState?: CompletionState
}

interface ApplicationsListProps {
  logoPicker: React.ReactNode
  logoLabel?: string
  onStartApplication: (data: ApplicationData) => void
  onOpenApplication: (data: ApplicationData) => void
  onSettingsClick?: () => void
}

// ── Cell style helpers ────────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: '6px 8px',
  textAlign: 'left',
  fontFamily: "'Space Mono', monospace",
  fontSize: 10,
  fontWeight: 400,
  color: '#062351',
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  background: '#eef1f6',
  borderLeft: '1px solid #d5ddea',
  borderTop: '1px solid #d5ddea',
  height: 28,
  overflow: 'hidden',
}

const tdIdStyle: React.CSSProperties = {
  padding: '8px 8px',
  fontFamily: "'Denim-Regular', sans-serif",
  fontSize: 12,
  color: '#062351',
  letterSpacing: '0.26px',
  background: '#fbfcfd',
  borderLeft: '1px solid #d5ddea',
  borderTop: '1px solid #d5ddea',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: 0,
}

const tdStyle: React.CSSProperties = {
  padding: '8px 8px',
  fontFamily: "'Denim-Regular', sans-serif",
  fontSize: 12,
  color: '#4367a2',
  letterSpacing: '0.26px',
  background: '#f5f7fa',
  borderLeft: '1px solid #d5ddea',
  borderTop: '1px solid #d5ddea',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: 0,
}

export function ApplicationsList({ logoPicker, logoLabel, onStartApplication, onOpenApplication, onSettingsClick }: ApplicationsListProps) {
  const isMobile = useIsMobile()
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null)
  const [showCreateMerchantModal, setShowCreateMerchantModal] = useState(false)
  const [showSelectMerchantModal, setShowSelectMerchantModal] = useState(false)
  const [hoveredLockedRow, setHoveredLockedRow] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const COLUMNS = ['ID', 'STATUS', 'ANNUAL CARD TURNOVER', 'AVERAGE TRANSACTION VALUE', 'CHANNEL', 'UTM CAMPAIGN', 'UTM SOURCE', 'CREATED', 'SYNCED TO CRM']

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
            breadcrumbs={[{ label: 'Applications', href: '/applications' }]}
            onSignOut={() => {}}
            onSettingsClick={onSettingsClick}
          />
        )}

        <TitleBar pageTitle="Applications">
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <Button onClick={() => setShowDropdown((v) => !v)}>
              Create application
            </Button>
            {showDropdown && (
              <div className={contextMenu}>
                <button
                  className={`${contextMenuItem} ${hoveredMenuItem === 'existing' ? contextMenuItemHover : ''}`}
                  onMouseEnter={() => setHoveredMenuItem('existing')}
                  onMouseLeave={() => setHoveredMenuItem(null)}
                  onClick={() => { setShowDropdown(false); setShowSelectMerchantModal(true) }}
                >
                  <span style={{ fontFamily: "'Denim-Regular', sans-serif", fontSize: 13, color: '#5475ab' }}>For existing merchant</span>
                </button>
                <button
                  className={`${contextMenuItem} ${hoveredMenuItem === 'new' ? contextMenuItemHover : ''}`}
                  onMouseEnter={() => setHoveredMenuItem('new')}
                  onMouseLeave={() => setHoveredMenuItem(null)}
                  onClick={() => { setShowDropdown(false); setShowCreateMerchantModal(true) }}
                >
                  <span style={{ fontFamily: "'Denim-Regular', sans-serif", fontSize: 13, color: '#4367a2' }}>For new merchant</span>
                </button>
              </div>
            )}
          </div>
        </TitleBar>

        <div className={tableWrapper}>
          <div>
            <table style={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'collapse', borderRight: '1px solid #d5ddea', borderBottom: '1px solid #d5ddea' }}>
              <colgroup>
                {/* ID gets ~20%, all others share equally */}
                <col style={{ width: '18%' }} />
                {COLUMNS.slice(1).map((col) => (
                  <col key={col} style={{ width: `${82 / (COLUMNS.length - 1)}%` }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  {COLUMNS.map((col) => (
                    <th key={col} style={thStyle}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_APPLICATIONS.map((app) => {
                  const isLocked = Boolean(app.lockedBy)
                  const isRowHovered = hoveredRow === app.id
                  return (
                    <tr
                      key={app.id}
                      onClick={isLocked ? undefined : () => onOpenApplication({
                        merchantName: app.businessName,
                        contactName: app.contactName,
                        phone: app.phone,
                        email: app.email,
                        businessType: app.businessType,
                        businessDescription: app.businessDescription,
                        mcc: app.mcc,
                        completionState: app.completionState,
                      })}
                      onMouseEnter={() => { if (isLocked) setHoveredLockedRow(app.id); else setHoveredRow(app.id) }}
                      onMouseLeave={() => { setHoveredLockedRow(null); setHoveredRow(null); setMousePos(null) }}
                      onMouseMove={isLocked ? (e) => setMousePos({ x: e.clientX, y: e.clientY }) : undefined}
                      style={{
                        cursor: isLocked ? 'default' : 'pointer',
                        opacity: isLocked ? 0.5 : 1,
                        outline: isLocked ? '2px solid #ff5100' : 'none',
                        outlineOffset: isLocked ? -1 : 0,
                      }}
                    >
                      {/* ID */}
                      <td style={{
                        ...tdIdStyle,
                        background: isRowHovered ? '#f0f2f7' : tdIdStyle.background,
                      }}>
                        {app.applicationId}
                      </td>
                      {/* Status */}
                      <td style={{
                        ...tdStyle,
                        background: isRowHovered ? '#eceef3' : tdStyle.background,
                      }}>
                        <Status
                          variant={statusVariantMap[app.status]}
                          text={statusLabelMap[app.status]}
                        />
                      </td>
                      {/* Annual Card Turnover */}
                      <td style={{ ...tdStyle, background: isRowHovered ? '#eceef3' : tdStyle.background }}>
                        {app.annualCardTurnover}
                      </td>
                      {/* Average Transaction Value */}
                      <td style={{ ...tdStyle, background: isRowHovered ? '#eceef3' : tdStyle.background }}>
                        {app.avgTxValue}
                      </td>
                      {/* Channel */}
                      <td style={{ ...tdStyle, background: isRowHovered ? '#eceef3' : tdStyle.background }}>
                        {app.channel}
                      </td>
                      {/* UTM Campaign */}
                      <td style={{ ...tdStyle, background: isRowHovered ? '#eceef3' : tdStyle.background }}>
                        {app.utmCampaign}
                      </td>
                      {/* UTM Source */}
                      <td style={{ ...tdStyle, background: isRowHovered ? '#eceef3' : tdStyle.background }}>
                        {app.utmSource}
                      </td>
                      {/* Created */}
                      <td style={{ ...tdStyle, background: isRowHovered ? '#eceef3' : tdStyle.background }}>
                        {app.createdAt}
                      </td>
                      {/* Synced to CRM — badge anchor lives here */}
                      <td style={{ ...tdStyle, background: isRowHovered ? '#eceef3' : tdStyle.background, position: 'relative' }}>
                        {app.syncedToCrm}
                        {isLocked && app.lockedBy && (
                          <div style={{ position: 'absolute', right: 0, top: 0 }}>
                            <div style={{
                              transform: 'translateY(-50%)',
                              background: '#ff5100',
                              color: '#fff',
                              fontSize: 8,
                              fontFamily: "'Denim-Medium', sans-serif",
                              letterSpacing: '0.24px',
                              textTransform: 'uppercase',
                              padding: '3px 6px',
                              borderRadius: 2,
                              whiteSpace: 'nowrap',
                            }}>
                              {app.lockedBy}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0 4px', marginTop: 2 }}>
            <span style={{ fontFamily: "'Denim-Regular', sans-serif", fontSize: 13, color: '#4367a2', letterSpacing: '0.39px' }}>
              1 – {MOCK_APPLICATIONS.length} of {MOCK_APPLICATIONS.length} results
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button style={{ fontFamily: "'Denim-Medium', sans-serif", fontSize: 13, color: '#5475ab', background: 'none', border: 'none', cursor: 'default', opacity: 0.5, padding: '0 4px', letterSpacing: '0.39px' }}>
                Previous
              </button>
              <button style={{ fontFamily: "'Denim-Medium', sans-serif", fontSize: 13, color: '#4367a2', background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', letterSpacing: '0.39px' }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor-following tooltip for locked rows */}
      {hoveredLockedRow && mousePos && (() => {
        const app = MOCK_APPLICATIONS.find(a => a.id === hoveredLockedRow)
        if (!app?.lockedBy) return null
        return (
          <div style={{
            position: 'fixed',
            left: mousePos.x + 14,
            top: mousePos.y + 14,
            zIndex: 9999,
            background: '#fff',
            border: '1px solid #d5ddea',
            borderRadius: 4,
            boxShadow: '0px 1px 2px 0px rgba(9,56,130,0.1)',
            padding: '8px 12px',
            maxWidth: 280,
            fontFamily: "'Denim-Regular', sans-serif",
            fontSize: 13,
            color: '#062351',
            lineHeight: '20px',
            letterSpacing: '0.39px',
            pointerEvents: 'none',
            whiteSpace: 'pre-line',
          }}>
            {`Currently being edited by ${app.lockedBy}.\nAvailable to edit once they save and exit.`}
          </div>
        )
      })()}

      {showCreateMerchantModal && (
        <CreateMerchantModal
          onClose={() => setShowCreateMerchantModal(false)}
          onSubmit={({ contactName, email, phone }) => {
            setShowCreateMerchantModal(false)
            onStartApplication({ contactName, phone, email })
          }}
        />
      )}

      <SelectMerchantModal
        isOpen={showSelectMerchantModal}
        onClose={() => setShowSelectMerchantModal(false)}
        onSelect={(merchant) => {
          setShowSelectMerchantModal(false)
          onStartApplication({
            merchantName: merchant.businessName,
            contactName: merchant.contactName,
            phone: merchant.phone,
            email: merchant.email,
            businessType: merchant.businessType,
            businessDescription: merchant.businessDescription,
            mcc: merchant.mcc,
          })
        }}
      />
    </div>
  )
}
