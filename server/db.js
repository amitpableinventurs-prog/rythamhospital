import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import { config } from './config.js'

export let pool

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS blog_posts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(190) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author_name VARCHAR(150) NOT NULL,
    author_details LONGTEXT NULL,
    cover_image VARCHAR(500) NULL,
    cover_alt VARCHAR(255) NULL,
    content LONGTEXT NOT NULL,
    meta_title VARCHAR(255) NULL,
    meta_description VARCHAR(320) NULL,
    status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
    views INT UNSIGNED NOT NULL DEFAULT 0,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_posts_listing (status, published_at),
    INDEX idx_posts_category (category)
  )`,
  `CREATE TABLE IF NOT EXISTS contact_messages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') NOT NULL DEFAULT 'new',
    ip VARCHAR(45) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_messages_status (status, created_at)
  )`,
  `CREATE TABLE IF NOT EXISTS appointments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    department VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    message TEXT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    ip VARCHAR(45) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_appointments_status (status, created_at)
  )`,
  `CREATE TABLE IF NOT EXISTS gallery_images (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    width INT UNSIGNED NULL,
    height INT UNSIGNED NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
]

export async function initDatabase() {
  const { database, ...connection } = config.db

  // Create the database on first run so a fresh XAMPP install works out of the box.
  const bootstrap = await mysql.createConnection(connection)
  await bootstrap.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  )
  await bootstrap.end()

  pool = mysql.createPool({
    ...config.db,
    connectionLimit: 10,
    charset: 'utf8mb4',
    timezone: 'Z',
    dateStrings: ['DATE'],
  })

  for (const statement of SCHEMA) await pool.query(statement)
  await seedAdmin()
  await seedBlogPosts()
}

async function seedAdmin() {
  const [[{ count }]] = await pool.query('SELECT COUNT(*) AS count FROM admins')
  if (count > 0) return

  const { name, email, password } = config.auth.initialAdmin
  if (!email || !password) {
    console.warn('[db] No admin account exists. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env to create one.')
    return
  }
  const hash = await bcrypt.hash(password, 12)
  await pool.query('INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)', [name, email.toLowerCase(), hash])
  console.log(`[db] Created admin account ${email}`)
}

// Import the articles that used to be hardcoded in the frontend, once.
async function seedBlogPosts() {
  const [[{ count }]] = await pool.query('SELECT COUNT(*) AS count FROM blog_posts')
  if (count > 0) return

  const posts = JSON.parse(await fs.readFile(path.join(config.paths.seed, 'blog-posts.json'), 'utf8'))
  for (const post of posts) {
    const authorDetails = { ...post.authorDetails, photo: await copyDoctorPhoto(post.authorDetails.photo) }
    await pool.query(
      `INSERT INTO blog_posts
        (slug, title, excerpt, category, author_name, author_details, content, status, views, published_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?)`,
      [
        post.slug, post.title, post.excerpt, post.category, post.author,
        JSON.stringify(authorDetails), JSON.stringify(post.content), post.views,
        new Date(post.publishedAt), new Date(post.updatedAt || post.publishedAt),
      ]
    )
  }
  console.log(`[db] Seeded ${posts.length} blog posts`)
}

async function copyDoctorPhoto(fileName) {
  if (!fileName) return null
  const target = `seed-${crypto.randomBytes(4).toString('hex')}-${fileName}`
  await fs.mkdir(config.paths.uploads, { recursive: true })
  await fs.copyFile(path.join(config.paths.doctorAssets, fileName), path.join(config.paths.uploads, target))
  return `/uploads/${target}`
}
