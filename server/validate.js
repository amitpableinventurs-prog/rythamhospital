export class ValidationError extends Error {
  constructor(fields) {
    super('Please correct the highlighted fields.')
    this.status = 422
    this.fields = fields
  }
}

/**
 * Collects field errors while reading a request body. Call `done()` at the end;
 * it throws a ValidationError (sent to the client as 422) if anything failed.
 */
export function validator(body = {}) {
  const errors = {}
  const fail = (field, message) => {
    if (!errors[field]) errors[field] = message
  }

  const text = (field, { label = field, required = false, max = 255, min = 0, pattern, patternMessage } = {}) => {
    const raw = body[field]
    const value = typeof raw === 'string' ? raw.trim() : raw == null ? '' : String(raw).trim()
    if (!value) {
      if (required) fail(field, `${label} is required.`)
      return ''
    }
    if (value.length < min) fail(field, `${label} must be at least ${min} characters.`)
    if (value.length > max) fail(field, `${label} must be at most ${max} characters.`)
    if (pattern && !pattern.test(value)) fail(field, patternMessage || `${label} is not valid.`)
    return value
  }

  return {
    errors,
    fail,
    text,
    email: (field, options = {}) =>
      text(field, {
        max: 190,
        ...options,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        patternMessage: 'Please enter a valid email address.',
      }),
    phone: (field, options = {}) =>
      text(field, {
        max: 20,
        ...options,
        pattern: /^\+?[0-9\s-]{7,20}$/,
        patternMessage: 'Please enter a valid phone number.',
      }),
    oneOf: (field, allowed, { label = field, fallback } = {}) => {
      const value = body[field] ?? fallback
      if (!allowed.includes(value)) fail(field, `${label} must be one of: ${allowed.join(', ')}.`)
      return value
    },
    done() {
      if (Object.keys(errors).length) throw new ValidationError(errors)
    },
  }
}

// Wrap async route handlers so rejected promises reach the error middleware.
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
