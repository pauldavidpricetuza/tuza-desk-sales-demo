import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { XIcon, NoteIcon } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useIsMobile } from '../hooks/useIsMobile'
import { Button } from '#ui/Button/Button'
import * as s from './NotesPanel.css'
import { themeVars } from '#theme/theme.css'

interface NotesPanelProps {
  isOpen: boolean
  onClose: () => void
  storageKey: string
}

const POS_KEY = 'v1-notes-panel-pos'
const SIZE_KEY = 'v1-notes-panel-size'
const DEFAULT_SIZE = { width: 340, height: 420 }
const MIN_WIDTH = 240
const MIN_HEIGHT = 180

function getDefaultPos() {
  return { x: Math.max(0, window.innerWidth - 380), y: 120 }
}

function loadJson<T>(key: string, fallback: () => T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch {}
  return fallback()
}

function useDebouncedSave(value: string, key: string, delayMs = 500) {
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      localStorage.setItem(key, value)
      setSavedAt(new Date())
    }, delayMs)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [value, key, delayMs])
  return savedAt
}

export function NotesPanel({ isOpen, onClose, storageKey }: NotesPanelProps) {
  const isMobile = useIsMobile()
  const [notes, setNotes] = useState(() => localStorage.getItem(storageKey) ?? '')
  const savedAt = useDebouncedSave(notes, storageKey)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [pos, setPos] = useState<{ x: number; y: number }>(() => loadJson(POS_KEY, getDefaultPos))
  const [size, setSize] = useState<{ width: number; height: number }>(() => loadJson(SIZE_KEY, () => DEFAULT_SIZE))

  useEffect(() => { setNotes(localStorage.getItem(storageKey) ?? '') }, [storageKey])
  useEffect(() => { if (isOpen) setTimeout(() => textareaRef.current?.focus(), 50) }, [isOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape' && isOpen) onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => { localStorage.setItem(POS_KEY, JSON.stringify(pos)) }, [pos])
  useEffect(() => { localStorage.setItem(SIZE_KEY, JSON.stringify(size)) }, [size])

  const formatSavedAt = useCallback((d: Date) => {
    const h = d.getHours().toString().padStart(2, '0')
    const m = d.getMinutes().toString().padStart(2, '0')
    return `Saved ${h}:${m}`
  }, [])

  function handleDragStart(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('button')) return
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startPosX = pos.x
    const startPosY = pos.y

    function onMove(me: MouseEvent) {
      setPos({ x: Math.max(0, startPosX + me.clientX - startX), y: Math.max(0, startPosY + me.clientY - startY) })
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function handleResizeStart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = size.width
    const startH = size.height

    function onMove(me: MouseEvent) {
      setSize({
        width: Math.max(MIN_WIDTH, startW + me.clientX - startX),
        height: Math.max(MIN_HEIGHT, startH + me.clientY - startY),
      })
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  if (!isOpen) return null

  const headerContent = (
    <>
      <div className={s.headerLeft}>
        <div className={s.iconBox}>
          <NoteIcon size={16} color={themeVars.semanticColour.text.brandDefault} />
        </div>
        <span className={s.notesTitle}>Notes</span>
      </div>
      <Button
        variant="secondary"
        type="button"
        className={s.closeBtn}
        onClick={onClose}
        title="Close notes"
        leftIcon={<XIcon size={16} color={themeVars.semanticColour.text.brandDefault} />}
      >
        {null}
      </Button>
    </>
  )

  const bodyContent = (
    <div className={s.bodyInner}>
      <textarea
        ref={textareaRef}
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Add notes about this application…"
        className={s.notesTextarea}
      />
      <p className={s.hintText}>
        Notes are auto-saved and not visible to merchant
      </p>
    </div>
  )

  if (isMobile) {
    return createPortal(
      <div className={s.mobileFullscreen}>
        <div className={clsx(s.header, s.headerMobile)}>{headerContent}</div>
        <div className={s.headerDivider} />
        <div className={s.body}>{bodyContent}</div>
      </div>,
      document.body
    )
  }

  return createPortal(
    <div
      className={s.floatingPanel}
      style={{ left: pos.x, top: pos.y, width: size.width, height: size.height }}
    >
      <div className={clsx(s.header, s.headerDesktop)} onMouseDown={handleDragStart}>
        {headerContent}
      </div>
      <div className={s.headerDivider} />
      <div className={clsx(s.body, s.bodyRounded)}>{bodyContent}</div>

      <div className={s.resizeGrip} onMouseDown={handleResizeStart}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="8.5" cy="8.5" r="1" fill={themeVars.colourPalette.cyanotype30} />
          <circle cx="5" cy="8.5" r="1" fill={themeVars.colourPalette.cyanotype30} />
          <circle cx="8.5" cy="5" r="1" fill={themeVars.colourPalette.cyanotype30} />
        </svg>
      </div>
    </div>,
    document.body
  )
}

interface NotesButtonProps {
  onClick: () => void
  isOpen: boolean
}

export function NotesButton({ onClick, isOpen }: NotesButtonProps) {
  return (
    <Button
      variant="secondary"
      type="button"
      className={s.notesButton}
      onClick={onClick}
      dataOpen={isOpen}
      leftIcon={<NoteIcon size={16} color={themeVars.semanticColour.text.brandDefault} />}
    >
      Notes
    </Button>
  )
}
