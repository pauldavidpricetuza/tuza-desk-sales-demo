/** Browser-safe base64 for upload (avoids stack limits on large blobs). */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result
      if (typeof dataUrl !== 'string') {
        reject(new Error('Unexpected read result'))
        return
      }
      const comma = dataUrl.indexOf(',')
      resolve(comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl)
    }
    reader.onerror = () => reject(reader.error ?? new Error('read failed'))
    reader.readAsDataURL(blob)
  })
}
