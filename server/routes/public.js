import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { pool } from '../db.js'
import { notifyHospital } from '../mailer.js'
import { serializePost, findPublishedPostBySlug } from '../posts.js'
import { validator, asyncHandler } from '../validate.js'

const router = Router()

const PUBLISHED = "status = 'published' AND published_at <= UTC_TIMESTAMP()"

router.get('/posts', asyncHandler(async (req, res) => {
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 9, 1), 24)
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
  const category = String(req.query.category || '').trim()
  const search = String(req.query.q || '').trim().slice(0, 100)

  const where = [PUBLISHED]
  const params = []
  if (category) {
    where.push('category = ?')
    params.push(category)
  }
  if (search) {
    where.push('(title LIKE ? OR excerpt LIKE ?)')
    params.push(`%${search}%`, `%${search}%`)
  }
  const whereSql = where.join(' AND ')

  const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM blog_posts WHERE ${whereSql}`, params)
  const [rows] = await pool.query(
    `SELECT * FROM blog_posts WHERE ${whereSql} ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?`,
    [...params, limit, (page - 1) * limit]
  )
  const [categories] = await pool.query(
    `SELECT category, COUNT(*) AS count FROM blog_posts WHERE ${PUBLISHED} GROUP BY category ORDER BY category`
  )

  res.json({
    items: rows.map((row) => serializePost(row, { withContent: false })),
    total,
    page,
    pages: Math.max(1, Math.ceil(total / limit)),
    categories,
  })
}))

router.get('/posts/:slug', asyncHandler(async (req, res) => {
  const post = await findPublishedPostBySlug(req.params.slug)
  if (!post) return res.status(404).json({ error: 'Article not found.' })

  await pool.query('UPDATE blog_posts SET views = views + 1 WHERE id = ?', [post.id])
  post.views += 1

  // Related: same category first, then the most recent other articles.
  const [related] = await pool.query(
    `SELECT * FROM blog_posts WHERE ${PUBLISHED} AND id <> ?
     ORDER BY (category = ?) DESC, published_at DESC LIMIT 3`,
    [post.id, post.category]
  )
  res.json({ post, related: related.map((row) => serializePost(row, { withContent: false })) })
}))

router.get('/gallery', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM gallery_images ORDER BY sort_order ASC, id DESC')
  res.json({
    items: rows.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      image: row.image_url,
      width: row.width,
      height: row.height,
      sortOrder: row.sort_order,
    })),
  })
}))

// Forms: 5 submissions per 10 minutes per IP, plus a hidden "website" honeypot field.
const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again in a few minutes or call us directly.' },
})

const isSpam = (body) => Boolean(body?.website)

router.post('/contact', formLimiter, asyncHandler(async (req, res) => {
  if (isSpam(req.body)) return res.status(201).json({ ok: true })

  const v = validator(req.body)
  const name = v.text('name', { label: 'Name', required: true, min: 2, max: 120 })
  const email = v.email('email', { label: 'Email', required: true })
  const phone = v.phone('phone', { label: 'Phone number', required: true })
  const subject = v.text('subject', { label: 'Subject', required: true, min: 3, max: 200 })
  const message = v.text('message', { label: 'Message', required: true, min: 10, max: 5000 })
  v.done()

  const [result] = await pool.query(
    'INSERT INTO contact_messages (name, email, phone, subject, message, ip) VALUES (?, ?, ?, ?, ?, ?)',
    [name, email, phone, subject, message, req.ip]
  )

  notifyHospital({
    subject: `New website enquiry: ${subject}`,
    heading: 'New contact message',
    replyTo: email,
    rows: [['Name', name], ['Email', email], ['Phone', phone], ['Subject', subject], ['Message', message]],
  })

  res.status(201).json({ ok: true, id: result.insertId })
}))

router.post('/appointments', formLimiter, asyncHandler(async (req, res) => {
  if (isSpam(req.body)) return res.status(201).json({ ok: true })

  const v = validator(req.body)
  const name = v.text('name', { label: 'Name', required: true, min: 2, max: 120 })
  const email = v.email('email', { label: 'Email', required: true })
  const phone = v.phone('phone', { label: 'Phone number', required: true })
  const department = v.text('department', { label: 'Department', required: true, max: 100 })
  const date = v.text('date', {
    label: 'Preferred date',
    required: true,
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    patternMessage: 'Please choose a valid date.',
  })
  const message = v.text('message', { label: 'Message', max: 2000 })

  // Allow "today" in any timezone by comparing against yesterday (UTC).
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  if (date && date < yesterday) v.fail('date', 'Please choose a date in the future.')
  v.done()

  const [result] = await pool.query(
    `INSERT INTO appointments (name, email, phone, department, preferred_date, message, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, department, date, message || null, req.ip]
  )

  notifyHospital({
    subject: `New appointment request: ${department} on ${date}`,
    heading: 'New appointment request',
    replyTo: email,
    rows: [['Name', name], ['Email', email], ['Phone', phone], ['Department', department], ['Preferred date', date], ['Message', message]],
  })

  res.status(201).json({ ok: true, id: result.insertId })
}))

export default router
