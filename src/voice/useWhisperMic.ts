import { useCallback, useEffect, useRef, useState } from 'react'

export function canUseWhisperMic(): boolean {
  return typeof MediaRecorder !== 'undefined' && typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia
}

export interface UseWhisperMicResult {
  isRecording: boolean
  error: string | null
  setError: (msg: string | null) => void
  startRecording: () => Promise<void>
  stopRecording: () => Promise<Blob | null>
}

export function useWhisperMic(): UseWhisperMicResult {
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
  }, [])

  const startRecording = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : ''
      const mr = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream)
      mediaRecorderRef.current = mr
      chunksRef.current = []
      mr.ondataavailable = e => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      mr.start()
      setIsRecording(true)
    } catch {
      setError('Microphone permission denied or unavailable.')
      setIsRecording(false)
    }
  }, [])

  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    const mr = mediaRecorderRef.current
    if (!mr || mr.state === 'inactive') {
      stopStream()
      setIsRecording(false)
      return null
    }
    return new Promise(resolve => {
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' })
        chunksRef.current = []
        mediaRecorderRef.current = null
        stopStream()
        setIsRecording(false)
        resolve(blob.size > 0 ? blob : null)
      }
      mr.stop()
    })
  }, [stopStream])

  useEffect(
    () => () => {
      const mr = mediaRecorderRef.current
      if (mr && mr.state !== 'inactive') {
        mr.onstop = null
        mr.stop()
      }
      stopStream()
    },
    [stopStream],
  )

  return { isRecording, error, setError, startRecording, stopRecording }
}
