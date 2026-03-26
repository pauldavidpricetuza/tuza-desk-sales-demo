import type { ReactNode } from 'react'
import { NoteIcon, CaretRightIcon, LockSimpleIcon } from '@phosphor-icons/react'
import clsx from 'clsx'
import { Button } from '#ui/Button/Button'
import * as s from './V1TitleBar.css'
import { themeVars } from '#theme/theme.css'

export type V1Section = 'business-info' | 'products' | 'application' | 'checks'

const STEPS: { id: V1Section; label: string }[] = [
  { id: 'business-info', label: 'Business Info' },
  { id: 'products',      label: 'Products & Pricing' },
  { id: 'application',   label: 'Application' },
  { id: 'checks',        label: 'Checks' },
]

interface V1TitleBarProps {
  merchantName?: string
  currentSection: V1Section
  completedSections: Set<V1Section>
  lockedSections: Set<V1Section>
  onNavigate: (section: V1Section) => void
  allComplete: boolean
  onSubmit: () => void
  notesOpen: boolean
  onNotesToggle: () => void
  isMobile?: boolean
  /** Optional slot below the title bar (e.g. V2 voice assist). */
  voiceSlot?: ReactNode
}

function getStepClass(
  step: { id: V1Section },
  currentSection: V1Section,
  completedSections: Set<V1Section>,
  lockedSections: Set<V1Section>,
  index: number,
  steps: { id: V1Section }[],
) {
  const isActive = step.id === currentSection
  const isCompleted = completedSections.has(step.id)
  const isLocked = lockedSections.has(step.id)
  const prevStep = index > 0 ? steps[index - 1] : null
  const prevIsComplete = !prevStep || completedSections.has(prevStep.id)
  const isNaturallyAccessible = isCompleted || isActive || prevIsComplete
  const canNavigate = !isActive

  let className = s.stepBtnInaccessible
  let showLock = false

  if (isActive) {
    className = s.stepBtnActive
  } else if (isLocked) {
    className = s.stepBtnLocked
    showLock = true
  } else if (isCompleted || isNaturallyAccessible) {
    className = s.stepBtnAccessible
  }

  return { className, canNavigate, showLock, isActive }
}

export function V1TitleBar({
  merchantName,
  currentSection,
  completedSections,
  lockedSections,
  onNavigate,
  allComplete,
  onSubmit,
  notesOpen,
  onNotesToggle,
  isMobile = false,
  voiceSlot,
}: V1TitleBarProps) {
  if (isMobile) {
    return (
      <>
      <div className={s.mobileBar}>
        <div className={s.mobileScrollRow}>
          {STEPS.map((step, i) => {
            const st = getStepClass(step, currentSection, completedSections, lockedSections, i, STEPS)
            return (
              <div key={step.id} className={s.stepItem}>
                {i > 0 && <CaretRightIcon size={8} color={themeVars.colourPalette.cyanotype40} />}
                <button
                  onClick={() => st.canNavigate && onNavigate(step.id)}
                  className={clsx(s.mobileStepBtn, st.isActive && s.mobileStepBtnActive)}
                >
                  {st.showLock && <LockSimpleIcon size={12} />}
                  {step.label}
                </button>
              </div>
            )
          })}
        </div>
      </div>
      {voiceSlot}
      </>
    )
  }

  return (
    <>
    <div className={s.desktopBar}>
      {/* Left: title */}
      <div className={s.titleColumn}>
        <span className={s.merchantTitle}>
          {merchantName || 'Application'}
        </span>
      </div>

      {/* Centre: navigation breadcrumb */}
      <div className={s.navRow}>
        {STEPS.map((step, i) => {
          const st = getStepClass(step, currentSection, completedSections, lockedSections, i, STEPS)
          return (
            <div key={step.id} className={s.stepItem}>
              {i > 0 && <CaretRightIcon size={8} color={themeVars.colourPalette.cyanotype40} />}
              <button
                onClick={() => st.canNavigate && onNavigate(step.id)}
                className={st.className}
              >
                {st.showLock && <LockSimpleIcon size={16} />}
                {step.label}
              </button>
            </div>
          )
        })}
      </div>

      {/* Right: Notes + Submit */}
      <div className={s.rightColumn}>
        <Button onClick={onNotesToggle} variant="secondary" leftIcon={<NoteIcon size={16} />}>
          Notes
        </Button>
        <Button onClick={onSubmit} isDisabled={!allComplete}>
          Submit application
        </Button>
      </div>
    </div>
    {voiceSlot}
    </>
  )
}
