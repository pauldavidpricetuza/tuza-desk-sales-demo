import React from 'react'
import { ApplicationsList } from './ApplicationsList'

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

interface V2ApplicationsListProps {
  logoPicker: React.ReactNode
  logoLabel?: string
  onStartApplication: (data: ApplicationData) => void
  onOpenApplication: (data: ApplicationData) => void
  onSettingsClick?: () => void
}

/** Same list as V0/V1 — only the application page differs (voice assist). */
export function V2ApplicationsList(props: V2ApplicationsListProps) {
  return <ApplicationsList {...props} />
}
