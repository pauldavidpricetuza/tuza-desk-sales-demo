/**
 * Netlify serverless: transcript + section → JSON patch for voice fill (OpenAI).
 * Set OPENAI_API_KEY in Netlify environment (and .env for `netlify dev`).
 */

import { extractPatchFromTranscript, SYSTEM } from './voice-shared.mjs'

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

  const { section, transcript } = body
  if (!section || !SYSTEM[section]) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid or missing section' }),
    }
  }
  if (!transcript || typeof transcript !== 'string' || !transcript.trim()) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing transcript' }),
    }
  }

  try {
    const patch = await extractPatchFromTranscript(section, transcript, key)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ patch }),
    }
  } catch (e) {
    const detail =
      typeof e === 'object' && e !== null && 'detail' in e && typeof e.detail === 'string'
        ? e.detail.slice(0, 200)
        : ''
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({
        error: e instanceof Error ? e.message : 'Extraction failed',
        detail,
      }),
    }
  }
}
