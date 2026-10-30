import jwt from 'jsonwebtoken'
import { config } from './config.js'

const { jwtSecret, cookieName, sessionDays } = config.auth

export function setSessionCookie(res, admin) {
  const token = jwt.sign({ sub: admin.id, name: admin.name, email: admin.email }, jwtSecret, {
    expiresIn: `${sessionDays}d`,
  })
  res.cookie(cookieName, token, {
    httpOnly: true,
    // Strict: the cookie is never sent on cross-site requests, which blocks CSRF.
    sameSite: 'strict',
    secure: config.isProduction,
    path: '/api',
    maxAge: sessionDays * 24 * 60 * 60 * 1000,
  })
}

export function clearSessionCookie(res) {
  res.clearCookie(cookieName, { path: '/api' })
}

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[cookieName]
  if (!token) return res.status(401).json({ error: 'Please log in.' })
  try {
    const payload = jwt.verify(token, jwtSecret)
    req.admin = { id: payload.sub, name: payload.name, email: payload.email }
    next()
  } catch {
    clearSessionCookie(res)
    res.status(401).json({ error: 'Your session has expired. Please log in again.' })
  }
}
