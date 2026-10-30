import fs from 'node:fs/promises'
import path from 'node:path'
import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { config } from './config.js'
import { initDatabase } from './db.js'
import { mailEnabled } from './mailer.js'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'
import { resolvePageMeta, injectHead, renderSitemap, renderRobots } from './seo.js'
import { asyncHandler } from './validate.js'

const app = express()

// Only trust X-Forwarded-For from a proxy on this machine (Vite in dev, nginx/Apache in production).
app.set('trust proxy', 'loopback')
app.disable('x-powered-by')

app.use(
  helmet({
    // The site loads Google Fonts and inline JSON-LD; a CSP can be added once hosting is final.
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
)
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.use('/api', publicRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }))

// Uploaded file names are unique, so they can be cached for a long time.
app.use('/uploads', express.static(config.paths.uploads, { maxAge: '30d', immutable: true, fallthrough: false }))

app.get('/sitemap.xml', asyncHandler(async (req, res) => {
  res.type('application/xml').set('Cache-Control', 'public, max-age=3600').send(await renderSitemap())
}))
app.get('/robots.txt', (req, res) => res.type('text/plain').send(renderRobots()))

// In production this server also serves the built React app, injecting
// page-specific meta tags so links shared on social media show a preview.
if (config.isProduction) {
  const indexHtml = await fs.readFile(path.join(config.paths.dist, 'index.html'), 'utf8')

  app.use('/assets', express.static(path.join(config.paths.dist, 'assets'), { maxAge: '1y', immutable: true }))
  app.use(express.static(config.paths.dist, { index: false, maxAge: '1h' }))

  app.get(/^\/admin(\/.*)?$/, (req, res) => {
    res.set('X-Robots-Tag', 'noindex, nofollow').send(indexHtml)
  })
  app.get(/.*/, asyncHandler(async (req, res) => {
    const meta = await resolvePageMeta(req.path)
    res.status(meta.status).type('html').send(injectHead(indexHtml, meta))
  }))
}

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.fields) return res.status(error.status || 422).json({ error: error.message, fields: error.fields })
  if (error.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'Images must be smaller than 10 MB.' })
  if (error.status && error.status < 500) return res.status(error.status).json({ error: error.message })
  if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid request.' })
  console.error(error)
  res.status(500).json({ error: 'Something went wrong on our side. Please try again.' })
})

try {
  await initDatabase()
} catch (error) {
  console.error(`[db] Could not connect to MySQL at ${config.db.host}:${config.db.port} - is it running?`)
  console.error(`     ${error.message}`)
  process.exit(1)
}

app.listen(config.port, () => {
  console.log(`[server] API ready on http://localhost:${config.port} (${config.isProduction ? 'production' : 'development'})`)
  if (!mailEnabled) console.log('[mail] SMTP not configured - form submissions are saved but no email is sent.')
})
