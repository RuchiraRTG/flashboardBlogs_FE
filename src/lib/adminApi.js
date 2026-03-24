import { apiRequest, extractCollection, extractEntity } from './apiClient'

export async function signInAdmin({ username, password }) {
  const response = await apiRequest('/admin/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  const token =
    response?.token ||
    response?.data?.token ||
    response?.data?.accessToken ||
    response?.accessToken

  const admin = response?.admin || response?.data?.admin || null

  if (!token) {
    throw new Error('Sign-in succeeded but no token was returned by the server.')
  }

  return { token, admin, raw: response }
}

export async function getAdminSession(token) {
  return apiRequest('/admin/me', {
    method: 'GET',
    token
  })
}

export async function getBlogs() {
  const response = await apiRequest('/blogs', { method: 'GET' })
  return extractCollection(response)
}

export async function createBlog(blog, token) {
  const response = await apiRequest('/blogs', {
    method: 'POST',
    token,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blog)
  })

  return extractEntity(response)
}

export async function updateBlog(id, blog, token) {
  const response = await apiRequest(`/blogs/${id}`, {
    method: 'PUT',
    token,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blog)
  })

  return extractEntity(response)
}

export async function deleteBlog(id, token) {
  return apiRequest(`/blogs/${id}`, {
    method: 'DELETE',
    token
  })
}

export async function getCategories() {
  const response = await apiRequest('/categories', { method: 'GET' })
  return extractCollection(response)
}

export async function createCategory(category, token) {
  const response = await apiRequest('/categories', {
    method: 'POST',
    token,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  })

  return extractEntity(response)
}

export async function getTopics() {
  const response = await apiRequest('/topics', { method: 'GET' })
  return extractCollection(response)
}

export async function createTopic(topic, token) {
  const response = await apiRequest('/topics', {
    method: 'POST',
    token,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topic)
  })

  return extractEntity(response)
}

export async function uploadAdminImage(file, token) {
  const formData = new FormData()
  formData.append('image', file)

  const response = await apiRequest('/images/upload', {
    method: 'POST',
    token,
    body: formData
  })

  const payload = extractEntity(response) || response

  if (!payload?.url) {
    throw new Error('Image upload succeeded but image URL was not returned by the server.')
  }

  return payload
}
