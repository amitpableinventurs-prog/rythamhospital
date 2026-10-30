import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

const env = (key, fallback = '') => {
  const value = process.env[key]
  return value === undefined || value === '' ? fallback : value
}

const isProduction = env('NODE_ENV') === 'production'

export const config = {
  isProduction,
  port: Number(env('PORT', 5088)),
  // Public URL of the website, used for canonical links, sitemap and emails.
  siteUrl: env('SITE_URL', 'http://localhost:5288').replace(/\/$/, ''),

  paths: {
    root: path.resolve(here, '..'),
    dist: path.resolve(here, '../dist'),
    uploads: path.resolve(here, 'uploads'),
    seed: path.resolve(here, 'seed'),
    doctorAssets: path.resolve(here, '../src/assets/doctors'),
  },

  db: {
    host: env('DB_HOST', '127.0.0.1'),
    port: Number(env('DB_PORT', 3306)),
    user: env('DB_USER', 'root'),
    password: env('DB_PASSWORD', ''),
    database: env('DB_NAME', 'rhythm_hospital'),
  },

  auth: {
    jwtSecret: env('JWT_SECRET'),
    cookieName: 'rh_admin',
    sessionDays: 7,
    initialAdmin: {
      name: env('ADMIN_NAME', 'Administrator'),
      email: env('ADMIN_EMAIL'),
      password: env('ADMIN_PASSWORD'),
    },
  },

  mail: {
    host: env('SMTP_HOST'),
    port: Number(env('SMTP_PORT', 587)),
    secure: env('SMTP_SECURE', 'false') === 'true',
    user: env('SMTP_USER'),
    pass: env('SMTP_PASS'),
    from: env('MAIL_FROM', env('SMTP_USER')),
    // Inbox that receives contact messages and appointment requests.
    to: env('MAIL_TO', env('SMTP_USER')),
  },
}

if (!config.auth.jwtSecret || config.auth.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be set in .env and be at least 32 characters long.')
}
