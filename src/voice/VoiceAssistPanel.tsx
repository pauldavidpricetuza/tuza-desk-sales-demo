import { useCallback, useEffect, useRef, useState } from 'react'
import { MicrophoneIcon, MicrophoneSlashIcon } from '@phosphor-icons/react'
import { Button } from '#ui/Button/Button'
import type { V1Section } from '../components/V1TitleBar'
import type { VoiceSection } from './fieldSchemas'
import { blobToBase64 } from './blobToBase64'
import { canUseWhisperMic, useWhisperMic } from './useWhisperMic'
import * as s from './VoiceAssistPanel.css'

const VOICE_FROM_AUDIO_PATH = '/.netlify/functions/voice-from-audio'

function sectionToVoiceApi(s: V1Section): VoiceSection | null {
  if (s === 'checks') return null
  return s
}

interface VoiceAssistPanelProps {
  currentSection: V1Section
  onPatch: (section: VoiceSection, patch: Record<string, unknown>) => void
}

export function VoiceAssistPanel({ currentSection, onPatch }: VoiceAssistPanelProps) {
  const apiSection = sectionToVoiceApi(currentSection)
  const { isRecording, error: micError, setError: setMicError, startRecording, stopRecording } = useWhisperMic()

  const [applyError, setApplyError] = useState<string | null>(null)
  const [applying, setApplying] = useState(false)
  const onPatchRef = useRef(onPatch)
  onPatchRef.current = onPatch

  const prevApiSectionRef = useRef<VoiceSection | null>(null)
  useEffect(() => {
    if (prevApiSectionRef.current !== null && prevApiSectionRef.current !== apiSection) {
      setApplyError(null)
    }
    prevApiSectionRef.current = apiSection
  }, [apiSection])

  const sendRecording = useCallback(
    async (blob: Blob) => {
      if (!apiSection) return
      if (blob.size < 256) {
        setApplyError('Recording too short. Speak for a moment, then stop.')
        return
      }
      setApplyError(null)
      setApplying(true)
      try {
        const audioBase64 = await blobToBase64(blob)
        const res = await fetch(VOICE_FROM_AUDIO_PATH, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: apiSection,
            audioBase64,
            mimeType: blob.type || 'audio/webm',
          }),
        })
        const data = (await res.json()) as {
          patch?: Record<string, unknown>
          transcript?: string
          error?: string
          detail?: string
        }
        if (!res.ok) {
          setApplyError(data.error ?? `Request failed (${res.status})`)
          return
        }
        const tr = typeof data.transcript === 'string' ? data.transcript.trim() : ''
        const patch = data.patch ?? {}
        if (Object.keys(patch).length > 0) {
          onPatchRef.current(apiSection, patch)
        } else if (tr) {
          setApplyError('Nothing could be inferred for the form from this clip. Try adding more detail.')
        }
      } catch {
        setApplyError(
          'Could not reach the voice API. Use npm run dev:netlify (not vite alone), set OPENAI_API_KEY in .env, or deploy with that variable in Netlify.',
        )
      } finally {
        setApplying(false)
      }
    },
    [apiSection],
  )

  async function toggleMic() {
    setApplyError(null)
    setMicError(null)
    if (isRecording) {
      const blob = await stopRecording()
      if (blob) await sendRecording(blob)
    } else {
      await startRecording()
    }
  }

  if (!canUseWhisperMic()) {
    return (
      <div className={s.wrap}>
        <p className={s.errorText}>
          Recording is not supported in this browser. Use a current Chrome, Edge, or Firefox with microphone access.
        </p>
      </div>
    )
  }

  if (!apiSection) {
    return (
      <div className={s.wrap}>
        <p className={s.hint}>Voice fill is available on Business Info, Products &amp; Pricing, and Application.</p>
      </div>
    )
  }

  return (
    <div className={s.wrap}>
      <p className={s.hint}>
        Press start, speak your answers, then stop. Audio is transcribed with OpenAI Whisper and fields update
        automatically. Use this site on localhost or HTTPS and allow microphone access when the browser asks.
      </p>
      <div className={s.row}>
        <Button
          type="button"
          variant={isRecording ? 'warning' : 'secondary'}
          leftIcon={isRecording ? <MicrophoneSlashIcon size={16} /> : <MicrophoneIcon size={16} />}
          onClick={() => void toggleMic()}
          isDisabled={applying}
        >
          {isRecording ? 'Stop & apply' : 'Start recording'}
        </Button>
        {isRecording && <span className={s.hint}>Recording… speak now.</span>}
        {applying && <span className={s.status}>Processing audio…</span>}
      </div>
      {micError && <p className={s.errorText}>{micError}</p>}
      {applyError && <p className={s.errorText}>{applyError}</p>}
    </div>
  )
}
