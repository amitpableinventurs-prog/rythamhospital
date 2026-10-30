import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import multer from 'multer'
import sharp from 'sharp'
import { config } from './config.js'

const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
const MAX_WIDTH = 1600

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (ACCEPTED_TYPES.has(file.mimetype)) return cb(null, true)
    const error = new Error('Only JPG, PNG, WebP or AVIF images are allowed.')
    error.status = 400
    cb(error)
  },
}).single('image')

/**
 * Re-encode an uploaded image as an optimised WebP (max 1600px wide, EXIF
 * stripped, orientation applied). Re-encoding also guarantees the stored file
 * really is an image, whatever the client claimed.
 */
export async function saveOptimisedImage(buffer) {
  await fs.mkdir(config.paths.uploads, { recursive: true })
  const fileName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.webp`

  let info
  try {
    info = await sharp(buffer)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(config.paths.uploads, fileName))
  } catch {
    const error = new Error('The file could not be read as an image.')
    error.status = 400
    throw error
  }

  return { url: `/uploads/${fileName}`, width: info.width, height: info.height }
}

// Remove a previously uploaded file; ignores anything outside /uploads.
export async function deleteUpload(url) {
  if (!url || !url.startsWith('/uploads/')) return
  const fileName = path.basename(url)
  await fs.rm(path.join(config.paths.uploads, fileName), { force: true })
}
