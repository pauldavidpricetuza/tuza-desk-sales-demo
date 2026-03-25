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

interface V1ApplicationsListProps {
  logoPicker: React.ReactNode
  logoLabel?: string
  onStartApplication: (data: ApplicationData) => void
  onOpenApplication: (data: ApplicationData) => void
  onSettingsClick?: () => void
}

// V1 uses the same applications list — only the application detail flow differs
export function V1ApplicationsList(props: V1ApplicationsListProps) {
  return <ApplicationsList {...props} />
}
