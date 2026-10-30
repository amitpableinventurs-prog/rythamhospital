export class ApiError extends Error {
  constructor(message, status, fields = {}) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

async function request(path, { method = 'GET', body, signal } = {}) {
  const isForm = body instanceof FormData
  let response
  try {
    response = await fetch(`/api${path}`, {
      method,
      signal,
      credentials: 'same-origin',
      headers: body && !isForm ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('Could not reach the server. Please check your connection and try again.', 0)
  }

  const data = await response.json().catch(() => ({}))
  if (response.status === 401 && path.startsWith('/admin/') && path !== '/admin/login') {
    // Session expired: the admin panel listens for this and shows the login screen.
    window.dispatchEvent(new Event('admin:unauthorized'))
  }
  if (!response.ok) {
    throw new ApiError(data.error || 'Something went wrong. Please try again.', response.status, data.fields)
  }
  return data
}

const query = (params = {}) => {
  const search = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== null))
  const text = search.toString()
  return text ? `?${text}` : ''
}

export const api = {
  get: (path, params, options) => request(`${path}${query(params)}`, options),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
}
