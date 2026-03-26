/**
 * Netlify serverless: raw audio (base64) → Whisper transcript → same JSON patch as voice-extract.
 * POST JSON: { section, audioBase64, mimeType }
 * Set OPENAI_API_KEY in Netlify environment (and .env for `netlify dev`).
 */

import { extractPatchFromTranscript, SYSTEM } from './voice-shared.mjs'

const WHISPER_MODEL = 'whisper-1'

/**
 * @param {Buffer} buffer
 * @param {string} mimeType
 * @param {string} apiKey
 */
async function whisperTranscribe(buffer, mimeType, apiKey) {
  const ext = mimeType.includes('webm') ? 'webm' : mimeType.includes('mp4') || mimeType.includes('m4a') ? 'm4a' : 'webm'
  const blob = new Blob([new Uint8Array(buffer)], { type: mimeType || 'audio/webm' })
  const form = new FormData()
  form.append('file', blob, `recording.${ext}`)
  form.append('model', WHISPER_MODEL)

  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: form,
  })

  if (!res.ok) {
    const errText = await res.text()
    const err = new Error(`Whisper: ${res.status}`)
    err.detail = errText.slice(0, 500)
    throw err
  }

  const data = await res.json()
  return typeof data.text === 'string' ? data.text : ''
}

export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const key = process.env.OPENAI_API_KEY
  if (!key) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server missing OPENAI_API_KEY' }),
    }
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }

  const { section, audioBase64, mimeType } = body
  if (!section || !SYSTEM[section]) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid or missing section' }),
    }
  }
  if (!audioBase64 || typeof audioBase64 !== 'string') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing audioBase64' }),
    }
  }

  let buffer
  try {
    buffer = Buffer.from(audioBase64, 'base64')
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid base64 audio' }) }
  }

  if (buffer.length < 256) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Recording too short or empty' }),
    }
  }

  const mt = typeof mimeType === 'string' && mimeType.trim() ? mimeType.trim() : 'audio/webm'

  try {
    const transcript = await whisperTranscribe(buffer, mt, key)
    if (!transcript.trim()) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ patch: {}, transcript: '' }),
      }
    }

    const patch = await extractPatchFromTranscript(section, transcript, key)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ patch, transcript: transcript.trim() }),
    }
  } catch (e) {
    const detail = e.detail ? String(e.detail) : ''
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({
        error: e instanceof Error ? e.message : 'Transcription or extraction failed',
        detail: detail.slice(0, 200),
      }),
    }
  }
}
