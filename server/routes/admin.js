import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import bcrypt from 'bcryptjs'
import { pool } from '../db.js'
import { requireAdmin, setSessionCookie, clearSessionCookie } from '../auth.js'
import { imageUpload, saveOptimisedImage, deleteUpload } from '../uploads.js'
import { serializePost, readPostInput } from '../posts.js'
import { validator, asyncHandler, ValidationError } from '../validate.js'

const router = Router()

// ── Session ──────────────────────────────────────────────

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please wait 15 minutes and try again.' },
})

router.post('/login', loginLimiter, asyncHandler(async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase()
  const password = String(req.body?.password || '')
  const [[admin]] = await pool.query('SELECT * FROM admins WHERE email = ?', [email])
  const valid = admin && (await bcrypt.compare(password, admin.password_hash))
  if (!valid) return res.status(401).json({ error: 'Incorrect email or password.' })

  setSessionCookie(res, admin)
  res.json({ admin: { id: admin.id, name: admin.name, email: admin.email } })
}))

router.post('/logout', (req, res) => {
  clearSessionCookie(res)
  res.json({ ok: true })
})

// Everything below requires a logged-in admin.
router.use(requireAdmin)

router.get('/me', (req, res) => res.json({ admin: req.admin }))

router.put('/password', asyncHandler(async (req, res) => {
  const v = validator(req.body)
  const current = v.text('currentPassword', { label: 'Current password', required: true, max: 200 })
  const next = v.text('newPassword', { label: 'New password', required: true, min: 10, max: 200 })
  v.done()

  const [[admin]] = await pool.query('SELECT * FROM admins WHERE id = ?', [req.admin.id])
  if (!admin || !(await bcrypt.compare(current, admin.password_hash))) {
    throw new ValidationError({ currentPassword: 'Current password is incorrect.' })
  }
  await pool.query('UPDATE admins SET password_hash = ? WHERE id = ?', [await bcrypt.hash(next, 12), admin.id])
  res.json({ ok: true })
}))

// ── Dashboard ────────────────────────────────────────────

router.get('/stats', asyncHandler(async (req, res) => {
  const [[posts]] = await pool.query(
    `SELECT SUM(status = 'published') AS published, SUM(status = 'draft') AS drafts, COALESCE(SUM(views), 0) AS views
     FROM blog_posts`
  )
  const [[messages]] = await pool.query(
    "SELECT COUNT(*) AS total, SUM(status = 'new') AS unread FROM contact_messages"
  )
  const [[appointments]] = await pool.query(
    "SELECT COUNT(*) AS total, SUM(status = 'pending') AS pending FROM appointments"
  )
  const [[gallery]] = await pool.query('SELECT COUNT(*) AS total FROM gallery_images')
  const [recentMessages] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5')
  const [recentAppointments] = await pool.query('SELECT * FROM appointments ORDER BY created_at DESC LIMIT 5')

  const n = (value) => Number(value || 0)
  res.json({
    posts: { published: n(posts.published), drafts: n(posts.drafts), views: n(posts.views) },
    messages: { total: n(messages.total), unread: n(messages.unread) },
    appointments: { total: n(appointments.total), pending: n(appointments.pending) },
    gallery: { total: n(gallery.total) },
    recentMessages: recentMessages.map(serializeMessage),
    recentAppointments: recentAppointments.map(serializeAppointment),
  })
}))

// ── Blog posts ───────────────────────────────────────────

router.get('/posts', asyncHandler(async (req, res) => {
  const where = ['1 = 1']
  const params = []
  if (['draft', 'published'].includes(req.query.status)) {
    where.push('status = ?')
    params.push(req.query.status)
  }
  const search = String(req.query.q || '').trim()
  if (search) {
    where.push('(title LIKE ? OR category LIKE ? OR author_name LIKE ?)')
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }
  const [rows] = await pool.query(
    `SELECT * FROM blog_posts WHERE ${where.join(' AND ')} ORDER BY COALESCE(published_at, created_at) DESC`,
    params
  )
  res.json({ items: rows.map((row) => serializePost(row, { withContent: false })) })
}))

router.get('/posts/:id', asyncHandler(async (req, res) => {
  const [[row]] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id])
  if (!row) return res.status(404).json({ error: 'Post not found.' })
  res.json({ post: serializePost(row) })
}))

const savePost = async (sql, params) => {
  try {
    return await pool.query(sql, params)
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') throw new ValidationError({ slug: 'Another post already uses this URL slug.' })
    throw error
  }
}

router.post('/posts', asyncHandler(async (req, res) => {
  const data = readPostInput(req.body)
  if (data.status === 'published' && !data.published_at) data.published_at = new Date()

  const columns = Object.keys(data)
  const [result] = await savePost(
    `INSERT INTO blog_posts (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
    Object.values(data)
  )
  const [[row]] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [result.insertId])
  res.status(201).json({ post: serializePost(row) })
}))

router.put('/posts/:id', asyncHandler(async (req, res) => {
  const [[existing]] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id])
  if (!existing) return res.status(404).json({ error: 'Post not found.' })

  const data = readPostInput(req.body)
  // Keep the original publish date unless the admin changed it.
  if (!data.published_at) data.published_at = existing.published_at
  if (data.status === 'published' && !data.published_at) data.published_at = new Date()

  await savePost(
    `UPDATE blog_posts SET ${Object.keys(data).map((c) => `${c} = ?`).join(', ')} WHERE id = ?`,
    [...Object.values(data), existing.id]
  )
  const [[row]] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [existing.id])
  res.json({ post: serializePost(row) })
}))

router.delete('/posts/:id', asyncHandler(async (req, res) => {
  const [result] = await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id])
  if (!result.affectedRows) return res.status(404).json({ error: 'Post not found.' })
  res.json({ ok: true })
}))

// ── Image uploads (blog covers, author photos) ───────────

const runUpload = (req, res) =>
  new Promise((resolve, reject) => imageUpload(req, res, (error) => (error ? reject(error) : resolve())))

router.post('/uploads', asyncHandler(async (req, res) => {
  await runUpload(req, res)
  if (!req.file) return res.status(400).json({ error: 'Please choose an image to upload.' })
  res.status(201).json(await saveOptimisedImage(req.file.buffer))
}))

// ── Contact messages ─────────────────────────────────────

function serializeMessage(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  }
}

function serializeAppointment(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    department: row.department,
    date: row.preferred_date,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  }
}

// Shared list/update/delete handlers for the two inbox tables.
function inboxRoutes(path, table, statuses, serialize) {
  router.get(`/${path}`, asyncHandler(async (req, res) => {
    const params = []
    let where = ''
    if (statuses.includes(req.query.status)) {
      where = 'WHERE status = ?'
      params.push(req.query.status)
    }
    const [rows] = await pool.query(`SELECT * FROM ${table} ${where} ORDER BY created_at DESC LIMIT 500`, params)
    res.json({ items: rows.map(serialize) })
  }))

  router.patch(`/${path}/:id`, asyncHandler(async (req, res) => {
    const v = validator(req.body)
    const status = v.oneOf('status', statuses, { label: 'Status' })
    v.done()
    const [result] = await pool.query(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, req.params.id])
    if (!result.affectedRows) return res.status(404).json({ error: 'Not found.' })
    res.json({ ok: true })
  }))

  router.delete(`/${path}/:id`, asyncHandler(async (req, res) => {
    const [result] = await pool.query(`DELETE FROM ${table} WHERE id = ?`, [req.params.id])
    if (!result.affectedRows) return res.status(404).json({ error: 'Not found.' })
    res.json({ ok: true })
  }))
}

inboxRoutes('messages', 'contact_messages', ['new', 'read', 'replied'], serializeMessage)
inboxRoutes('appointments', 'appointments', ['pending', 'confirmed', 'completed', 'cancelled'], serializeAppointment)

// ── Gallery ──────────────────────────────────────────────

router.post('/gallery', asyncHandler(async (req, res) => {
  await runUpload(req, res)
  const v = validator(req.body)
  const title = v.text('title', { label: 'Description', required: true, max: 200 })
  const category = v.text('category', { label: 'Category', required: true, max: 100 })
  if (!req.file) v.fail('image', 'Please choose an image to upload.')
  v.done()

  const image = await saveOptimisedImage(req.file.buffer)
  const [result] = await pool.query(
    'INSERT INTO gallery_images (title, category, image_url, width, height) VALUES (?, ?, ?, ?, ?)',
    [title, category, image.url, image.width, image.height]
  )
  res.status(201).json({ id: result.insertId, ...image })
}))

router.patch('/gallery/:id', asyncHandler(async (req, res) => {
  const v = validator(req.body)
  const title = v.text('title', { label: 'Description', required: true, max: 200 })
  const category = v.text('category', { label: 'Category', required: true, max: 100 })
  const sortOrder = Number.parseInt(req.body?.sortOrder ?? 0, 10) || 0
  v.done()
  const [result] = await pool.query(
    'UPDATE gallery_images SET title = ?, category = ?, sort_order = ? WHERE id = ?',
    [title, category, sortOrder, req.params.id]
  )
  if (!result.affectedRows) return res.status(404).json({ error: 'Image not found.' })
  res.json({ ok: true })
}))

router.delete('/gallery/:id', asyncHandler(async (req, res) => {
  const [[row]] = await pool.query('SELECT * FROM gallery_images WHERE id = ?', [req.params.id])
  if (!row) return res.status(404).json({ error: 'Image not found.' })
  await pool.query('DELETE FROM gallery_images WHERE id = ?', [row.id])
  await deleteUpload(row.image_url)
  res.json({ ok: true })
}))

export default router
