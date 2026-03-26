import { useState, useEffect, useRef, useMemo } from 'react'
import { AsteriskIcon, CaretDoubleDownIcon, Spinner } from '@phosphor-icons/react'
import clsx from 'clsx'
import { Button } from '#ui/Button/Button'
import { ResolutionPanel } from './ResolutionPanel'
import * as s from './V1ChecksSection.css'
import { themeVars } from '#theme/theme.css'

type CheckStatus = 'failed' | 'failed-to-run' | 'passed' | 'skipped'

interface SubCheck {
  id: string
  label: string
  result: CheckStatus
}

interface SimpleCheck {
  type: 'simple'
  id: string
  label: string
  result: CheckStatus
}

interface GroupCheck {
  type: 'group'
  id: string
  label: string
  subChecks: SubCheck[]
}

type CheckItem = SimpleCheck | GroupCheck

/** Matches Figma Enterprise 2.0 — Checks (node 8426:136597). */
const CHECK_ITEMS: CheckItem[] = [
  { type: 'simple', id: 'trading-name', label: 'Trading name', result: 'failed' },
  { type: 'simple', id: 'trading-address', label: 'Trading address', result: 'failed' },
  { type: 'simple', id: 'reg-address', label: 'Registered address', result: 'passed' },
  { type: 'simple', id: 'entity-type', label: 'Entity type', result: 'skipped' },
  { type: 'simple', id: 'mcc', label: 'Merchant category code', result: 'passed' },
  { type: 'simple', id: 'proof-banking', label: 'Proof of banking', result: 'passed' },
  {
    type: 'group',
    id: 'shareholder-paul',
    label: 'Shareholder: Paul Price',
    subChecks: [
      { id: 'paul-name', label: 'Name', result: 'failed' },
      { id: 'paul-role', label: 'Role', result: 'failed' },
    ],
  },
  {
    type: 'group',
    id: 'shareholder-rose',
    label: 'Shareholder: Rose Ford',
    subChecks: [
      { id: 'rose-dob', label: 'Date of birth', result: 'failed' },
      { id: 'rose-nationality', label: 'Nationality', result: 'failed' },
    ],
  },
]

const STATUS_DOT_COLOR: Record<Exclude<CheckStatus, 'skipped'>, string> = {
  'failed': themeVars.colourPalette.statusRed,
  'failed-to-run': themeVars.colourPalette.statusOrange,
  'passed': themeVars.colourPalette.statusGreen,
}

const STATUS_LABEL: Record<CheckStatus, string> = {
  'failed': 'Issue found',
  'failed-to-run': 'Failed to run',
  'passed': 'Passed',
  'skipped': 'Skipped',
}

interface V1ChecksSectionProps {
  onSubmit: () => void
  allPreviousComplete: boolean
  isVisible?: boolean
}

export function V1ChecksSection({ isVisible = false }: V1ChecksSectionProps) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())
  const [allDone, setAllDone] = useState(false)
  const [resolvingCheckId, setResolvingCheckId] = useState<string | null>(null)
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set())
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (!isVisible || hasStartedRef.current) return
    hasStartedRef.current = true

    setRevealedIds(new Set())
    setAllDone(false)

    const shuffled = [...CHECK_ITEMS].sort(() => Math.random() - 0.5)
    let cumulative = 1200

    shuffled.forEach((item, i) => {
      const delay = 1500 + Math.random() * 1500
      cumulative += delay
      const t = setTimeout(() => {
        setRevealedIds(prev => new Set([...prev, item.id]))
      }, cumulative)
      timersRef.current.push(t)

      if (i === shuffled.length - 1) {
        const doneT = setTimeout(() => setAllDone(true), cumulative + 600)
        timersRef.current.push(doneT)
      }
    })

    return () => timersRef.current.forEach(clearTimeout)
  }, [isVisible])

  const allResolvableChecks = useMemo(() => {
    const flat: SubCheck[] = []
    for (const item of CHECK_ITEMS) {
      if (item.type === 'simple') {
        flat.push({ id: item.id, label: item.label, result: item.result })
      } else {
        flat.push(...item.subChecks)
      }
    }
    return flat
  }, [])

  const failedCount = allResolvableChecks.filter(
    c => c.result === 'failed' || c.result === 'failed-to-run'
  ).length

  const resolvingCheck = resolvingCheckId
    ? allResolvableChecks.find(c => c.id === resolvingCheckId)
    : null

  function handleResolve() {
    if (!resolvingCheckId) return
    const newResolved = new Set([...resolvedIds, resolvingCheckId])
    setResolvedIds(newResolved)

    const nextFailed = allResolvableChecks.find(
      c => (c.result === 'failed' || c.result === 'failed-to-run') && !newResolved.has(c.id)
    )
    if (nextFailed) {
      setResolvingCheckId(nextFailed.id)
    } else {
      setResolvingCheckId(null)
    }
  }

  return (
    <div className={s.root}>
    <div className={s.scrollColumn}>

      <div className={clsx(
        s.innerContainer,
        resolvingCheckId ? s.innerWithPanel : s.innerDefault,
      )}>

        {/* Agent bar */}
        <div className={clsx(
          s.agentBar,
          resolvingCheckId ? s.agentBarHidden : s.agentBarVisible,
        )}>
          <div className={s.agentBadge}>
            <AsteriskIcon
              size={14}
              color={themeVars.foregroundColour.foregroundAccent}
              weight="bold"
              className={allDone ? s.asteriskStatic : s.asteriskAnimated}
            />
            <span className={s.agentBadgeLabel}>Data Quality Agent</span>
          </div>

          <span className={allDone ? s.agentMessageDone : s.agentMessageLoading}>
            {allDone
              ? `${CHECK_ITEMS.length} of ${CHECK_ITEMS.length} application checks completed. ${failedCount} issues found.`
              : `${revealedIds.size} of ${CHECK_ITEMS.length} application checks completed...`}
          </span>
        </div>

        {/* Check rows */}
        {CHECK_ITEMS.map(item => {
          const isRevealed = revealedIds.has(item.id)

          if (item.type === 'simple') {
            return (
              <SimpleCheckRow
                key={item.id}
                check={item}
                isRevealed={isRevealed}
                isResolved={resolvedIds.has(item.id)}
                onStartResolution={() => setResolvingCheckId(item.id)}
              />
            )
          }

          return (
            <GroupCheckCard
              key={item.id}
              group={item}
              isRevealed={isRevealed}
              resolvedIds={resolvedIds}
              onStartResolution={(subId: string) => setResolvingCheckId(subId)}
            />
          )
        })}

      </div>
    </div>

    {resolvingCheck && (
      <ResolutionPanel
        key={resolvingCheck.id}
        checkLabel={resolvingCheck.label}
        onClose={() => setResolvingCheckId(null)}
        onResolve={handleResolve}
      />
    )}
    </div>
  )
}

// ── Simple check row ────────────────────────────────────────────────────────

function SimpleCheckRow({ check, isRevealed, isResolved, onStartResolution }: {
  check: SimpleCheck
  isRevealed: boolean
  isResolved: boolean
  onStartResolution: () => void
}) {
  return (
    <div className={s.simpleCheckRow}>
      <div className={s.checkLabelRow}>
        <CaretDoubleDownIcon size={12} color={themeVars.colourPalette.amber600} weight="bold" />
        <span className={s.checkLabelText}>{check.label}</span>
      </div>

      <div className={s.checkStatusArea}>
        {!isRevealed ? (
          <Spinner size={16} color={themeVars.colourPalette.cyanotype50} weight="bold" className={s.spinner} />
        ) : (
          <CheckStatusDisplay
            result={check.result}
            isResolved={isResolved}
            onStartResolution={onStartResolution}
          />
        )}
      </div>
    </div>
  )
}

// ── Group check card (principals) ───────────────────────────────────────────

function GroupCheckCard({ group, isRevealed, resolvedIds, onStartResolution }: {
  group: GroupCheck
  isRevealed: boolean
  resolvedIds: Set<string>
  onStartResolution: (subId: string) => void
}) {
  return (
    <div className={s.groupCard}>
      {/* Group header */}
      <div className={s.groupHeader}>
        <div className={s.checkLabelRow}>
          <CaretDoubleDownIcon size={12} color={themeVars.colourPalette.amber600} weight="bold" />
          <span className={s.checkLabelText}>{group.label}</span>
        </div>
        {!isRevealed && (
          <Spinner size={16} color={themeVars.colourPalette.cyanotype50} weight="bold" className={s.spinner} />
        )}
      </div>

      {/* Sub-check rows */}
      {isRevealed && (
        <div className={s.subCheckTable}>
          {group.subChecks.map((sub, i) => (
            <div
              key={sub.id}
              className={clsx(
                s.subCheckRow,
                i < group.subChecks.length - 1 && s.subCheckRowBorder,
              )}
            >
              <span className={s.subCheckLabel}>{sub.label}</span>

              <div className={s.checkStatusArea}>
                <CheckStatusDisplay
                  result={sub.result}
                  isResolved={resolvedIds.has(sub.id)}
                  onStartResolution={() => onStartResolution(sub.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Status display (shared between simple & sub-checks) ────────────────────

function CheckStatusDisplay({ result, isResolved, onStartResolution }: {
  result: CheckStatus
  isResolved: boolean
  onStartResolution: () => void
}) {
  if (isResolved) {
    return (
      <div className={s.statusRow}>
        <div className={s.resolvedDot} />
        <span className={s.resolvedLabel}>Resolved</span>
      </div>
    )
  }

  return (
    <>
      <div className={s.statusRow}>
        {result === 'skipped' ? (
          <div className={s.statusDotSkipped} />
        ) : (
          <div className={s.statusDot} style={{ background: STATUS_DOT_COLOR[result] }} />
        )}
        <span className={s.statusLabel}>{STATUS_LABEL[result]}</span>
      </div>

      {result === 'failed' && (
        <Button onClick={onStartResolution}>Start resolution</Button>
      )}

      {result === 'failed-to-run' && (
        <Button variant="secondary">Run check again</Button>
      )}
    </>
  )
}
