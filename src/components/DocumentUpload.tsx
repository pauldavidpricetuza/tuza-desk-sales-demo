import { useRef, useState } from 'react'
import clsx from 'clsx'
import { CheckCircleIcon, PlusIcon, UploadSimpleIcon, WarningCircleIcon, XIcon } from '@phosphor-icons/react'
import { themeVars } from '#theme/theme.css.js'
import { Button } from '#ui/Button/Button'
import * as s from './DocumentUpload.css'

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface DocumentUploadFile {
  id: string
  name: string
  /** File size in bytes */
  size: number
  status?: 'uploading' | 'success' | 'error'
  /** 0-100, used when status === 'uploading' */
  progress?: number
  errorMessage?: string
}

export interface FileRejection {
  file: File
  reason: 'type' | 'size'
}

export interface DocumentUploadProps {
  label?: string
  dropText?: string
  /** Shown when `isDisabled` (Figma disabled state copy). */
  disabledDropText?: string
  helpText?: string
  acceptedFileTypes?: string[]
  /** Max file size in bytes */
  maxFileSize?: number
  files?: DocumentUploadFile[]
  isDisabled?: boolean
  onSelect?: (files: File[]) => void
  onDrop?: (files: File[]) => void
  onRemove?: (id: string) => void
  onReject?: (rejections: FileRejection[]) => void
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function matchesType(file: File, types: string[]): boolean {
  return types.some(t => {
    if (t.startsWith('.')) return file.name.toLowerCase().endsWith(t.toLowerCase())
    if (t.endsWith('/*')) return file.type.startsWith(t.slice(0, -1))
    return file.type === t
  })
}

function partitionFiles(
  files: File[],
  acceptedTypes?: string[],
  maxSize?: number,
): { valid: File[]; rejected: FileRejection[] } {
  const valid: File[] = []
  const rejected: FileRejection[] = []
  for (const f of files) {
    if (acceptedTypes?.length && !matchesType(f, acceptedTypes)) {
      rejected.push({ file: f, reason: 'type' })
    } else if (maxSize != null && f.size > maxSize) {
      rejected.push({ file: f, reason: 'size' })
    } else {
      valid.push(f)
    }
  }
  return { valid, rejected }
}

// ─── File rows — Figma 7549-53630 / 53631 / 53632 ────────────────────────────────

function FileRow({ file, onRemove }: { file: DocumentUploadFile; onRemove: (id: string) => void }) {
  const status = file.status ?? 'success'
  const isError = status === 'error'
  const isUploading = status === 'uploading'

  if (isUploading) {
    return (
      <div className={s.fileCard}>
        <div className={s.fileRow}>
          <p className={s.fileName}>{file.name}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={s.fileSize}>{formatBytes(file.size)}</span>
            <Button
              type="button"
              variant="secondary"
              className={s.removeBtn}
              title={`Remove ${file.name}`}
              onClick={() => onRemove(file.id)}
              leftIcon={<XIcon size={12} color={themeVars.semanticColour.text.brandSecondary} />}
            >
              {null}
            </Button>
          </div>
        </div>
        <div className={s.progressTrack}>
          <div
            className={s.progressFill}
            style={{ width: `${Math.min(100, Math.max(0, file.progress ?? 0))}%` }}
          />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <div className={clsx(s.fileCard, s.fileCardError)}>
          <div className={s.fileRow}>
            <p className={clsx(s.fileName, s.fileNameError)}>{file.name}</p>
            <div className={s.fileMeta}>
              <WarningCircleIcon size={16} color={themeVars.colourPalette.red700} weight="fill" />
              <span className={clsx(s.fileSize, s.fileSizeError)}>{formatBytes(file.size)}</span>
              <Button
                type="button"
                variant="secondary"
                className={s.removeBtn}
                title={`Remove ${file.name}`}
                onClick={() => onRemove(file.id)}
                leftIcon={<XIcon size={12} color={themeVars.semanticColour.text.brandSecondary} />}
              >
                {null}
              </Button>
            </div>
          </div>
        </div>
        {file.errorMessage && (
          <p className={s.errorLine}>{file.errorMessage}</p>
        )}
      </div>
    )
  }

  // Success
  return (
    <div className={s.fileRowSuccess}>
      <p className={s.fileName}>{file.name}</p>
      <div className={s.fileRowSuccessRight}>
        <CheckCircleIcon size={16} color={themeVars.semanticColour.text.success} weight="fill" />
        <span className={s.fileSize}>{formatBytes(file.size)}</span>
        <Button
          type="button"
          variant="secondary"
          className={s.removeBtn}
          title={`Remove ${file.name}`}
          onClick={() => onRemove(file.id)}
          leftIcon={<XIcon size={12} color={themeVars.semanticColour.text.brandSecondary} />}
        >
          {null}
        </Button>
      </div>
    </div>
  )
}

// ─── Main component — Figma Document Upload 7549-53621 ───────────────────────────

export function DocumentUpload({
  label = 'Upload ID Document',
  dropText = 'Drag and drop your files here',
  disabledDropText = 'Drag and drop your document here',
  helpText = 'Upload a .jpeg, .png or .pdf (up to 8MB)',
  acceptedFileTypes,
  maxFileSize,
  files = [],
  isDisabled = false,
  onSelect,
  onDrop,
  onRemove,
  onReject,
}: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const hasErrorFile = files.some(f => f.status === 'error')

  function handleFiles(incoming: File[], via: 'select' | 'drop') {
    const { valid, rejected } = partitionFiles(incoming, acceptedFileTypes, maxFileSize)
    if (rejected.length) onReject?.(rejected)
    if (valid.length) {
      if (via === 'drop') onDrop?.(valid)
      else onSelect?.(valid)
    }
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (!isDisabled) setIsDragging(true)
  }

  function onDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  function onDropEvent(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    if (isDisabled) return
    const items = [...e.dataTransfer.items].filter(i => i.kind === 'file')
    const fileList = items.map(i => i.getAsFile()).filter((f): f is File => f !== null)
    handleFiles(fileList, 'drop')
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    handleFiles(Array.from(e.target.files), 'select')
    e.target.value = ''
  }

  const acceptAttr = acceptedFileTypes?.join(',')
  const displayDropText = isDisabled ? disabledDropText : dropText

  return (
    <div className={s.root}>
      <div className={s.uploadBlock}>
        <span className={s.label}>{label}</span>

        <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        data-disabled={isDisabled ? 'true' : 'false'}
        onKeyDown={e => {
          if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropEvent}
        onClick={() => { if (!isDisabled) inputRef.current?.click() }}
        className={clsx(
          s.dropZone,
          isDragging && s.dropZoneDragging,
          isDisabled && s.dropZoneDisabled,
          hasErrorFile && s.dropZoneDimmed,
        )}
      >
        <div className={s.innerCol}>
          <div className={s.iconCircle}>
            <UploadSimpleIcon size={24} color={themeVars.semanticColour.text.brandDefault} />
          </div>
          <div className={s.textCol}>
            <p className={s.dropText}>{displayDropText}</p>
            <p className={s.orText}>or</p>
            <span
              className={s.browseBtnWrap}
              onClick={e => e.stopPropagation()}
              onPointerDown={e => e.stopPropagation()}
            >
              <Button
                type="button"
                variant="primary"
                isDisabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) inputRef.current?.click()
                }}
                leftIcon={
                  <PlusIcon
                    size={16}
                    weight="bold"
                    color={themeVars.semanticColour.button.primary.color}
                  />
                }
              >
                Browse files
              </Button>
            </span>
            <p className={s.helpText}>{helpText}</p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={acceptAttr}
          multiple
          style={{ display: 'none' }}
          onChange={onInputChange}
          disabled={isDisabled}
        />
        </div>
      </div>

      {files.length > 0 && (
        <div className={s.fileList}>
          {files.map(f => (
            <FileRow key={f.id} file={f} onRemove={id => onRemove?.(id)} />
          ))}
        </div>
      )}
    </div>
  )
}
