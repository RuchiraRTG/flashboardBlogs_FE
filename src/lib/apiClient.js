const DEFAULT_API_BASE_URL = 'http://localhost:5001/api'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '')

function buildHeaders(token, customHeaders = {}) {
  const headers = {
    ...customHeaders
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export async function apiRequest(path, options = {}) {
  const { token, headers, ...restOptions } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: buildHeaders(token, headers)
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const body = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const errorMessage =
      (isJson && (body.message || body.error)) ||
      `Request failed with status ${response.status}`

    const error = new Error(errorMessage)
    error.status = response.status
    error.body = body
    throw error
  }

  return body
}

export function extractCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

export function extractEntity(payload) {
  if (!payload) {
    return null
  }

  if (payload.data && typeof payload.data === 'object') {
    return payload.data
  }

  if (typeof payload === 'object') {
    return payload
  }

  return null
}

export function getEntityId(entity) {
  return entity?._id || entity?.id || entity?.slug
}

export { API_BASE_URL }
