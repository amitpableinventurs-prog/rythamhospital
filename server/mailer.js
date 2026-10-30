import nodemailer from 'nodemailer'
import { config } from './config.js'

const transport = config.mail.host
  ? nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.secure,
      auth: config.mail.user ? { user: config.mail.user, pass: config.mail.pass } : undefined,
    })
  : null

export const mailEnabled = Boolean(transport && config.mail.to)

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

function renderTable(heading, rows) {
  const body = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>` +
        `<td style="padding:8px 12px;color:#0a2540;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join('')
  return (
    `<div style="font-family:Arial,sans-serif;max-width:600px">` +
    `<h2 style="color:#04979E;margin:0 0 12px">${escapeHtml(heading)}</h2>` +
    `<table style="border-collapse:collapse;width:100%;background:#f8f9fa;border-radius:8px">${body}</table>` +
    `<p style="color:#9ca3af;font-size:12px;margin-top:16px">Sent from the website form at ${escapeHtml(config.siteUrl)}. ` +
    `View it in the admin panel: ${escapeHtml(config.siteUrl)}/admin</p></div>`
  )
}

/**
 * Notify the hospital inbox. Failures are logged, never thrown: the
 * submission is already saved in the database and visible in the admin panel.
 */
export async function notifyHospital({ subject, heading, rows, replyTo }) {
  if (!mailEnabled) return
  try {
    await transport.sendMail({
      from: config.mail.from,
      to: config.mail.to,
      replyTo,
      subject,
      text: rows.filter(([, v]) => v).map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: renderTable(heading, rows),
    })
  } catch (error) {
    console.error('[mail] Failed to send notification:', error.message)
  }
}
