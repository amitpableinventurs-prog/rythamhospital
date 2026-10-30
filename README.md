# Rhythm Multispeciality Hospital website

React (Vite) website with a Node.js + MySQL backend for the blog, contact form,
appointment requests, gallery and an admin panel at `/admin`.

## Project layout

| Path | What it is |
| --- | --- |
| `src/` | React website and admin panel (`src/admin`) |
| `server/` | Express API, MySQL schema/seed, uploads, email, SEO (sitemap, meta tags) |
| `shared/site.js` | Hospital details (address, phones, social links) and page titles/descriptions, used by both the site and the server |
| `server/uploads/` | Images uploaded from the admin panel (back this folder up) |

## Run locally

1. Start MySQL (XAMPP control panel). The `rhythm_hospital` database and its tables are created automatically.
2. `npm install`
3. `npm run dev` starts both the website (http://localhost:5288) and the API (port 5088).
4. Admin panel: http://localhost:5288/admin, using `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`
   (the account is created on first start; change the password under **Settings**).

## Deploy (production)

1. Create `.env` from `.env.example`. Set `SITE_URL` to the real domain (e.g. `https://www.rhythmhospital.in`),
   the MySQL credentials, a long random `JWT_SECRET`, `ADMIN_EMAIL`/`ADMIN_PASSWORD`, and SMTP details for email.
2. `npm install` and then `npm run build`. `SITE_URL` is built into the site, so rebuild if it changes.
3. `npm start` serves the website, the API, `/sitemap.xml` and `/robots.txt` on `PORT`.
   Keep it running with a process manager (e.g. `pm2 start npm --name rhythm -- start`) and restart it after every build.
4. Put it behind HTTPS (nginx/Apache reverse proxy or your host's Node.js app setup).

## After going live (SEO checklist)

- Create/claim a **Google Business Profile** for the hospital. It is the biggest factor for "hospital near me" searches.
  Then replace `mapEmbedUrl` in `shared/site.js` with the profile's embed link for an exact map pin.
- Add the site to **Google Search Console** and submit `https://<your-domain>/sitemap.xml`.
- Upload real photos in **Admin > Gallery** and cover images for blog posts.
- Add any other social profiles in `shared/site.js` (`social`), which fills the icons and Google's `sameAs` data.

## Email notifications

Contact messages and appointment requests are always saved (see the admin panel). To also email them,
fill in the `SMTP_*` and `MAIL_TO` settings. For Gmail: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`,
`SMTP_SECURE=true`, `SMTP_USER=<gmail address>` and an App Password as `SMTP_PASS`.
