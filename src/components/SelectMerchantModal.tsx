import { useState } from 'react'
import { FunnelIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Button } from '#ui/Button/Button'
import { Text } from '#ui/Text/Text'
import {
  overlay,
  modalPanel,
  header,
  toolbar,
  filterButton,
  searchButton,
  tableSection,
  tableBorder,
  table,
  tableHead,
  th,
  tr,
  trSelected,
  td,
  tdPrimary,
  tdFirstSelected,
  muted,
  footer,
} from './SelectMerchantModal.css'

export interface Merchant {
  id: string
  businessName: string
  annualCardTurnover: string
  salesFunnelProgress: string
  initialSource: string | null
  initialCampaign: string | null
  firstActive: string
  contactName: string
  phone: string
  email: string
  businessType: string
  businessDescription: string
  mcc: string
}

const MERCHANTS: Merchant[] = [
  { id: '1', businessName: "Rosy's Pizzas Ltd", annualCardTurnover: '£200,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '14:07 • 5 Jan 2026', contactName: 'Rosy Marino', phone: '07784914402', email: 'rosy@pizza.com', businessType: 'private-limited-company', businessDescription: 'A local pizzeria specialising in the preparation and sale of freshly made pizzas, including dine-in, takeout and delivery services.', mcc: '5812 - Eating Places, Restaurants' },
  { id: '2', businessName: 'GARDENER & BASSON LIMITED', annualCardTurnover: '£200,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '14:07 • 5 Jan 2026', contactName: 'James Gardener', phone: '07700123456', email: 'james@gardnerbasson.co.uk', businessType: 'private-limited-company', businessDescription: 'A professional landscaping and garden design firm offering commercial and residential grounds maintenance services.', mcc: '7299 - Services, Not Elsewhere Classified' },
  { id: '3', businessName: 'GARDENER & BASSON LIMITED', annualCardTurnover: '£200,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '14:07 • 5 Jan 2026', contactName: 'Sarah Basson', phone: '07700123457', email: 'sarah@gardnerbasson.co.uk', businessType: 'private-limited-company', businessDescription: 'A professional landscaping and garden design firm offering commercial and residential grounds maintenance services.', mcc: '7299 - Services, Not Elsewhere Classified' },
  { id: '4', businessName: 'STATEMENT TECHNOLOGIES LIMITED', annualCardTurnover: '£10,000,000', salesFunnelProgress: 'Signup Completed', initialSource: 'Santander', initialCampaign: '2025_SMB_INBL_PTRSAN_6800', firstActive: '15:58 • 16 Dec 2025', contactName: 'David Price', phone: '07985274200', email: 'david@statement.tech', businessType: 'private-limited-company', businessDescription: 'A fintech software company providing payment infrastructure and merchant management platforms for financial institutions.', mcc: '7372 - Computer Programming Services' },
  { id: '5', businessName: 'GARDENER & BASSON LIMITED', annualCardTurnover: '£200,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '14:07 • 5 Jan 2026', contactName: 'James Gardener', phone: '07700123456', email: 'james@gardnerbasson.co.uk', businessType: 'private-limited-company', businessDescription: 'A professional landscaping and garden design firm offering commercial and residential grounds maintenance services.', mcc: '7299 - Services, Not Elsewhere Classified' },
  { id: '6', businessName: 'GARDENER & BASSON LIMITED', annualCardTurnover: '£200,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '14:07 • 5 Jan 2026', contactName: 'James Gardener', phone: '07700123456', email: 'james@gardnerbasson.co.uk', businessType: 'private-limited-company', businessDescription: 'A professional landscaping and garden design firm offering commercial and residential grounds maintenance services.', mcc: '7299 - Services, Not Elsewhere Classified' },
  { id: '7', businessName: 'GARDENER & BASSON LIMITED', annualCardTurnover: '£200,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '14:07 • 5 Jan 2026', contactName: 'James Gardener', phone: '07700123456', email: 'james@gardnerbasson.co.uk', businessType: 'private-limited-company', businessDescription: 'A professional landscaping and garden design firm offering commercial and residential grounds maintenance services.', mcc: '7299 - Services, Not Elsewhere Classified' },
  { id: '8', businessName: 'MY COSMETIC CLINIC LIMITED', annualCardTurnover: '£500,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '09:15 • 3 Feb 2026', contactName: 'Claire Hughes', phone: '07811234567', email: 'claire@mycosmetic.co.uk', businessType: 'private-limited-company', businessDescription: 'A cosmetic and aesthetics clinic offering non-surgical treatments, skin care and beauty therapies for private clients.', mcc: '7230 - Beauty & Barber Shops' },
  { id: '9', businessName: 'URBAN EATS GROUP LIMITED', annualCardTurnover: '£1,200,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '11:30 • 10 Jan 2026', contactName: 'Marcus Reid', phone: '07922345678', email: 'marcus@urbaneats.co.uk', businessType: 'private-limited-company', businessDescription: 'A restaurant group operating multiple urban dining venues specialising in contemporary street food and casual dining.', mcc: '5812 - Eating Places, Restaurants' },
  { id: '10', businessName: 'NORTHFIELD DENTAL PRACTICE', annualCardTurnover: '£350,000', salesFunnelProgress: 'Signup Completed', initialSource: null, initialCampaign: null, firstActive: '14:07 • 5 Jan 2026', contactName: 'Dr. Helen Ward', phone: '07633456789', email: 'helen@northfielddental.co.uk', businessType: 'sole-trader', businessDescription: 'A dental practice providing general and cosmetic dental care services for both NHS and private patients.', mcc: '7299 - Services, Not Elsewhere Classified' },
]

interface SelectMerchantModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (merchant: Merchant) => void
}

const ROW_BG_ODD = '#fbfcfd'
const ROW_BG_EVEN = '#f5f7fa'

export function SelectMerchantModal({ isOpen, onClose, onSelect }: SelectMerchantModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (!isOpen) return null

  const selectedMerchant = MERCHANTS.find(m => m.id === selectedId) ?? null

  return (
    <div className={overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={modalPanel}>

        <div className={header}>
          <Text as="h2" font="heading2">Select merchant</Text>
        </div>

        <div className={toolbar}>
          <button className={filterButton}>
            <FunnelIcon size={16} />
            <span>Filter</span>
          </button>
          <button className={searchButton}>
            <MagnifyingGlassIcon size={16} />
          </button>
        </div>

        <div className={tableSection}>
          <div className={tableBorder}>
            <table className={table}>
              <thead className={tableHead}>
                <tr>
                  <th className={th}>Business Name</th>
                  <th className={th}>Annual Card Turnover</th>
                  <th className={th}>Sales Funnel Progress</th>
                  <th className={th}>Initial Source</th>
                  <th className={th}>Initial Campaign</th>
                  <th className={th}>First Active</th>
                </tr>
              </thead>
              <tbody>
                {MERCHANTS.map((merchant, index) => {
                  const isSelected = selectedId === merchant.id
                  const rowBg = isSelected ? '#ffffff' : index % 2 === 0 ? ROW_BG_ODD : ROW_BG_EVEN
                  return (
                    <tr
                      key={merchant.id}
                      className={isSelected ? trSelected : tr}
                      style={{ backgroundColor: rowBg }}
                      onClick={() => setSelectedId(merchant.id)}
                    >
                      <td className={`${tdPrimary} ${isSelected ? tdFirstSelected : ''}`}>{merchant.businessName}</td>
                      <td className={td}>{merchant.annualCardTurnover}</td>
                      <td className={td}>{merchant.salesFunnelProgress}</td>
                      <td className={td}>
                        {merchant.initialSource
                          ? merchant.initialSource
                          : <span className={muted}>–</span>
                        }
                      </td>
                      <td className={td}>
                        {merchant.initialCampaign
                          ? merchant.initialCampaign
                          : <span className={muted}>–</span>
                        }
                      </td>
                      <td className={td}>{merchant.firstActive}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            isDisabled={!selectedMerchant}
            onClick={() => { if (selectedMerchant) { onSelect(selectedMerchant); onClose() } }}
          >
            Start application
          </Button>
        </div>

      </div>
    </div>
  )
}
