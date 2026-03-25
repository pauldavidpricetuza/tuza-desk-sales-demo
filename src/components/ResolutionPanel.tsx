import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  XIcon, AsteriskIcon, CheckCircleIcon,
  UploadSimpleIcon, PlusIcon,
} from '@phosphor-icons/react'
import clsx from 'clsx'
import { Button } from '#ui/Button/Button'
import { Select } from '#ui/Select/Select'
import { Textarea } from '#ui/Textarea/Textarea'
import * as s from './ResolutionPanel.css'
import { themeVars } from '#theme/theme.css'

interface ResolutionPanelProps {
  checkLabel: string
  onClose: () => void
  onResolve: () => void
}

type Opinion = '' | 'agree' | 'disagree'
type SolutionChoice = '' | 'accept' | 'reject'
type EvidenceChoice = '' | 'yes' | 'no'

interface UploadedFile { name: string; size: string }

// ── Timeline step wrapper ────────────────────────────────────────────────────

interface TimelineStepProps {
  isComplete: boolean
  isFirst: boolean
  isLastVisible: boolean
  prevComplete: boolean
  children: React.ReactNode
  className?: string
}

function TimelineStep({ isComplete, isFirst, isLastVisible, prevComplete, children, className }: TimelineStepProps) {
  return (
    <div className={clsx(s.timelineStep, className)}>
      <div className={s.timelineGutter}>
        {!isFirst && (
          <div
            className={prevComplete ? s.lineSolid : s.lineDashed}
            style={{ top: 0, height: 9 }}
          />
        )}
        <div className={isComplete ? s.timelineDotComplete : s.timelineDotPending} />
        {!isLastVisible && (
          <div
            className={isComplete ? s.lineSolid : s.lineDashed}
            style={{ top: 16, bottom: 0 }}
          />
        )}
      </div>
      <div className={s.flexOne}>
        {children}
      </div>
    </div>
  )
}

// ── Component ────────────────────────────────────────────────────────────────

export function ResolutionPanel({ checkLabel, onClose, onResolve }: ResolutionPanelProps) {
  const [opinion, setOpinion] = useState<Opinion>('')
  const [disagreeReason, setDisagreeReason] = useState('')
  const [solutionChoice, setSolutionChoice] = useState<SolutionChoice>('')
  const [evidenceChoice, setEvidenceChoice] = useState<EvidenceChoice>('')
  const [rejectReason, setRejectReason] = useState('')
  const [evidenceDesc, setEvidenceDesc] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const delays = [300, 900, 1500]
    delays.forEach((ms, i) => {
      const t = setTimeout(() => {
        setVisibleSections(prev => new Set([...prev, i + 1]))
      }, ms)
      timersRef.current.push(t)
    })
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  const scrollToSection = useCallback((sectionNum: number) => {
    requestAnimationFrame(() => {
      const el = scrollRef.current?.querySelector(`[data-section="${sectionNum}"]`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }, [])

  const showSuggestion = opinion !== ''
  const showEvidence = solutionChoice === 'accept'
  const showRejectFields = solutionChoice === 'reject'
  const isResolvable = solutionChoice !== ''

  const show = (n: number) => visibleSections.has(n)

  const sectionDefs = [
    { id: 1, visible: show(1), complete: true },
    { id: 2, visible: show(2), complete: true },
    { id: 3, visible: show(3), complete: opinion !== '' },
    { id: 4, visible: showSuggestion && show(4), complete: solutionChoice !== '' },
    { id: 5, visible: showEvidence && show(5), complete: evidenceChoice !== '' },
  ]
  const visSecs = sectionDefs.filter(sec => sec.visible)

  function getTp(sectionId: number) {
    const idx = visSecs.findIndex(sec => sec.id === sectionId)
    if (idx === -1) return { isComplete: false, isFirst: true, isLastVisible: true, prevComplete: false }
    return {
      isComplete: visSecs[idx].complete,
      isFirst: idx === 0,
      isLastVisible: idx === visSecs.length - 1,
      prevComplete: idx > 0 ? visSecs[idx - 1].complete : false,
    }
  }

  function handleOpinion(val: Opinion) {
    setOpinion(val)
    if (!visibleSections.has(4)) {
      setTimeout(() => {
        setVisibleSections(prev => new Set([...prev, 4]))
        setTimeout(() => scrollToSection(4), 60)
      }, 400)
    } else {
      setTimeout(() => scrollToSection(4), 50)
    }
  }

  function handleSolutionChoice(val: SolutionChoice) {
    setSolutionChoice(val)
    if (val === 'accept' && !visibleSections.has(5)) {
      setTimeout(() => {
        setVisibleSections(prev => new Set([...prev, 5]))
        setTimeout(() => scrollToSection(5), 60)
      }, 400)
    } else if (val === 'reject') {
      setTimeout(() => scrollToSection(4), 50)
    } else {
      setTimeout(() => scrollToSection(5), 50)
    }
  }

  function handleEvidenceChoice(val: EvidenceChoice) {
    setEvidenceChoice(val)
    if (val === 'yes') {
      setTimeout(() => scrollToSection(5), 50)
    }
  }

  function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return
    const newFiles: UploadedFile[] = Array.from(files).map(f => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
    e.target.value = ''
  }

  function removeFile(index: number) {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={s.panelShell}>

      {/* ── Sticky title bar ── */}
      <div className={s.titleBar}>
        <span className={s.titleText}>{checkLabel}</span>
        <Button
          variant="secondary"
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          title="Close"
          leftIcon={<XIcon size={16} color={themeVars.semanticColour.text.brandDefault} />}
        >
          {null}
        </Button>
      </div>

      {/* ── Scrollable body ── */}
      <div ref={scrollRef} className={s.scrollBody}>

        {/* Agent badge */}
        <div className={clsx(s.agentBadge, s.reveal)}>
          <AsteriskIcon size={14} color={themeVars.foregroundColour.foregroundAccent} weight="bold" />
          <span className={s.agentBadgeLabel}>Data Quality Agent</span>
        </div>

        {/* Timeline sections */}
        <div className={s.timelineContainer}>

          {/* Section 1: Reviewed application data */}
          {show(1) && (
            <TimelineStep {...getTp(1)} className={s.reveal}>
              <div data-section={1} style={{ paddingBottom: themeVars.spacing['spacing-6'] }}>
                <div className={s.sectionTitle}>
                  <span className={s.heading}>Reviewed application data</span>
                </div>
                <div className={s.sectionStackTight}>
                  <span className={s.label}>Trading address</span>
                  <div className={s.fieldBox}>45-46 Charlotte Rd, London, EC1 2AD</div>
                </div>
              </div>
            </TimelineStep>
          )}

          {/* Section 2: Found an issue */}
          {show(2) && (
            <TimelineStep {...getTp(2)} className={s.reveal}>
              <div data-section={2} style={{ paddingBottom: themeVars.spacing['spacing-6'] }}>
                <div className={s.sectionTitle}>
                  <span className={s.heading}>Found an issue</span>
                </div>
                <div className={s.sectionStack}>
                  <span className={s.body}>Abbreviated street name</span>
                  <span className={s.desc}>
                    Trading address provided on the application uses an abbreviated street name
                    ('Rd' instead of 'Road') and lowercase letter 'b' in the building number.
                  </span>
                </div>
              </div>
            </TimelineStep>
          )}

          {/* Section 3: Requested your opinion */}
          {show(3) && (
            <TimelineStep {...getTp(3)} className={s.reveal}>
              <div data-section={3} style={{ paddingBottom: showSuggestion ? themeVars.spacing['spacing-6'] : 0 }}>
                <div className={s.sectionTitle}>
                  <span className={s.heading}>Requested your opinion on the issue</span>
                </div>
                <div className={s.sectionStack}>
                  <span className={s.body}>Do you agree or disagree that these issues are valid?</span>
                  <div className={s.radioRow}>
                    <div className={s.radioCard} data-selected={opinion === 'agree'} onClick={() => handleOpinion('agree')}>
                      <div className={s.radioDot} data-selected={opinion === 'agree'} />
                      <span className={s.body}>Agree</span>
                    </div>
                    <div className={s.radioCard} data-selected={opinion === 'disagree'} onClick={() => handleOpinion('disagree')}>
                      <div className={s.radioDot} data-selected={opinion === 'disagree'} />
                      <span className={s.body}>Disagree</span>
                    </div>
                  </div>

                  {opinion === 'disagree' && (
                    <div className={clsx(s.sectionStack, s.reveal)}>
                      <span className={s.body}>What do you think caused the issues?</span>
                      <Select label="Email" value="other" showStatusIcon fullWidth items={[{ value: 'other', label: 'Other reason' }]} />
                      <Textarea
                        label="Specify your reason"
                        value={disagreeReason}
                        onChange={setDisagreeReason}
                        placeholder="TBC"
                        showStatusIcon={!!disagreeReason}
                        fullWidth
                      />
                    </div>
                  )}
                </div>
              </div>
            </TimelineStep>
          )}

          {/* Section 4: Suggested a solution */}
          {showSuggestion && show(4) && (
            <TimelineStep {...getTp(4)} className={s.reveal}>
              <div data-section={4} style={{ paddingBottom: (showEvidence || showRejectFields) ? themeVars.spacing['spacing-6'] : 0 }}>
                <div className={s.sectionTitle}>
                  <span className={s.heading}>Suggested a solution</span>
                </div>
                <div className={s.sectionStack}>
                  <span className={s.body}>Update trading address</span>
                  <span className={s.desc}>Add the full address to match exactly with the registered business address.</span>
                  <div className={s.sectionStackTight}>
                    <span className={s.label}>Trading address</span>
                    <div className={clsx(s.fieldBox, s.fieldBoxRow)}>
                      <span>45-46 Charlotte Road, London, EC1 2AD</span>
                      <CheckCircleIcon size={18} color="#2e7d32" weight="fill" style={{ flexShrink: 0 }} />
                    </div>
                  </div>
                  <span className={s.body}>Do you want to accept or reject the suggested solution?</span>
                  <div className={s.radioRow}>
                    <div className={s.radioCard} data-selected={solutionChoice === 'accept'} onClick={() => handleSolutionChoice('accept')}>
                      <div className={s.radioDot} data-selected={solutionChoice === 'accept'} />
                      <span className={s.body}>Accept</span>
                    </div>
                    <div className={s.radioCard} data-selected={solutionChoice === 'reject'} onClick={() => handleSolutionChoice('reject')}>
                      <div className={s.radioDot} data-selected={solutionChoice === 'reject'} />
                      <span className={s.body}>Reject</span>
                    </div>
                  </div>

                  {showRejectFields && (
                    <div className={clsx(s.sectionStack, s.reveal)}>
                      <Textarea
                        label="How could the issues be resolved?"
                        value={rejectReason}
                        onChange={setRejectReason}
                        placeholder="TBC"
                        showStatusIcon={!!rejectReason}
                        fullWidth
                      />
                      <FileUploadZone
                        label="Upload documents to resolve issues (optional)"
                        uploadedFiles={uploadedFiles}
                        onFilePick={handleFilePick}
                        onRemoveFile={removeFile}
                        fileInputRef={fileInputRef}
                      />
                    </div>
                  )}
                </div>
              </div>
            </TimelineStep>
          )}

          {/* Section 5: Requested additional evidence (after Accept) */}
          {showEvidence && show(5) && (
            <TimelineStep {...getTp(5)} className={s.reveal}>
              <div data-section={5}>
                <div className={s.sectionTitle}>
                  <span className={s.heading}>Requested additional evidence</span>
                </div>
                <div className={s.sectionStack}>
                  <span className={s.body}>Do you want to submit additional evidence to resolve this issue?</span>
                  <div className={s.radioRow}>
                    <div className={s.radioCard} data-selected={evidenceChoice === 'yes'} onClick={() => handleEvidenceChoice('yes')}>
                      <div className={s.radioDot} data-selected={evidenceChoice === 'yes'} />
                      <span className={s.body}>Yes</span>
                    </div>
                    <div className={s.radioCard} data-selected={evidenceChoice === 'no'} onClick={() => handleEvidenceChoice('no')}>
                      <div className={s.radioDot} data-selected={evidenceChoice === 'no'} />
                      <span className={s.body}>No</span>
                    </div>
                  </div>

                  {evidenceChoice === 'yes' && (
                    <div className={clsx(s.sectionStack, s.reveal)}>
                      <Textarea
                        label="Describe the evidence you're uploading"
                        value={evidenceDesc}
                        onChange={setEvidenceDesc}
                        placeholder="TBC"
                        showStatusIcon={!!evidenceDesc}
                        fullWidth
                      />
                      <FileUploadZone
                        label="Upload additional evidence"
                        uploadedFiles={uploadedFiles}
                        onFilePick={handleFilePick}
                        onRemoveFile={removeFile}
                        fileInputRef={fileInputRef}
                      />
                    </div>
                  )}
                </div>
              </div>
            </TimelineStep>
          )}

        </div>{/* end timeline sections */}
      </div>

      {/* ── Sticky footer bar ── */}
      <div className={s.footer}>
        <Button variant="secondary" onClick={onClose}>
          <span className={s.kbdBadge}>S</span> Skip issue
        </Button>
        <Button onClick={onResolve} isDisabled={!isResolvable}>
          <span className={s.kbdBadge}>R</span> Resolve issue
        </Button>
      </div>
    </div>
  )
}

// ── File upload sub-component ────────────────────────────────────────────────

function FileUploadZone({ label, uploadedFiles, onFilePick, onRemoveFile, fileInputRef }: {
  label: string
  uploadedFiles: UploadedFile[]
  onFilePick: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (i: number) => void
  fileInputRef: React.RefObject<HTMLInputElement>
}) {
  return (
    <div className={s.sectionStack}>
      <span className={s.body}>{label}</span>
      <div className={s.uploadZone}>
        <UploadSimpleIcon size={24} color={themeVars.semanticColour.text.brandSecondary} />
        <span className={s.uploadHint}>Drag and drop your files here</span>
        <span className={s.uploadSubHint}>or</span>
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()} leftIcon={<PlusIcon size={14} weight="bold" />}>
          Browse files
        </Button>
        <span className={s.uploadSizeHint}>Upload a .jpeg, .png or .pdf (up to 8MB)</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpeg,.jpg,.png,.pdf"
          multiple
          style={{ display: 'none' }}
          onChange={onFilePick}
        />
      </div>

      {uploadedFiles.map((f, i) => (
        <div key={f.name + i} className={s.fileRow}>
          <span className={s.fileRowName}>{f.name}</span>
          <div className={s.fileRowMeta}>
            <CheckCircleIcon size={16} color="#2e7d32" weight="fill" />
            <span className={s.fileRowSize}>{f.size}</span>
            <Button
              variant="secondary"
              type="button"
              className={s.removeBtn}
              onClick={() => onRemoveFile(i)}
              title="Remove file"
              leftIcon={<XIcon size={14} color={themeVars.colourPalette.cyanotype50} />}
            >
              {null}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
