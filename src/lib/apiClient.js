const DEFAULT_API_BASE_URL = 'http://localhost:5002'

const RAW_API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '')

function normalizePath(path = '') {
  if (!path) {
    return ''
  }

  return path.startsWith('/') ? path : `/${path}`
}

function buildApiUrl(path) {
  const normalizedPath = normalizePath(path)

  // Supports backends mounted at root (/admin/sign-in) and /api (/api/admin/sign-in).
  if (RAW_API_BASE_URL.endsWith('/api')) {
    return `${RAW_API_BASE_URL}${normalizedPath}`
  }

  return `${RAW_API_BASE_URL}/api${normalizedPath}`
}

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

  const primaryUrl = buildApiUrl(path)
  const fallbackUrl = `${RAW_API_BASE_URL}${normalizePath(path)}`

  let response

  try {
    response = await fetch(primaryUrl, {
      ...restOptions,
      headers: buildHeaders(token, headers)
    })
  } catch (error) {
    // If network fetch fails, retry once against root-mounted routes.
    if (primaryUrl !== fallbackUrl) {
      response = await fetch(fallbackUrl, {
        ...restOptions,
        headers: buildHeaders(token, headers)
      })
    } else {
      throw error
    }
  }

  if (response.status === 404 && primaryUrl !== fallbackUrl) {
    response = await fetch(fallbackUrl, {
    ...restOptions,
    headers: buildHeaders(token, headers)
  })
  }

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

export { RAW_API_BASE_URL as API_BASE_URL }
