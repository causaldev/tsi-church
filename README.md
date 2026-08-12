# Gospel Light International Church — Aware Branch

Premium institutional website with an embedded Payload CMS admin portal (`/admin`).

Built for **shared Node.js hosting** (cPanel Node.js App / Passenger / similar) — no Docker, no separate database server.

## Stack

- Next.js (App Router) + React + TypeScript + Tailwind CSS
- Payload CMS 3 at `/admin`
- **SQLite** database file (`data/glic.db`)
- Local `media/` folder for uploads (sermons, videos, books, images)
- English + Amharic architecture (`/en`, `/am`)

## Requirements

Your shared host must support:

- **Node.js 20+** (or 22)
- Persistent disk for `data/` and `media/`
- Ability to run `npm start` (or set Application Startup File to the Next server)

> Classic PHP-only shared hosting cannot run this app. Use a plan with a Node.js application feature.

## Local development

```bash
# Node 20+ required
cp .env.example .env
npm install
npm run dev
```

Open:

- Site: http://localhost:3000/en
- Admin: http://localhost:3000/admin

Seed official English content from the GLIC PDF:

```bash
npm run seed
```

## Shared hosting deploy

1. Set production values in `.env` (`NEXT_PUBLIC_SERVER_URL`, `PAYLOAD_SECRET`, admin password).
2. On the server (or in CI), install and build:

```bash
npm install
npm run build
npm run seed   # first deploy only
npm start
```

3. In cPanel **Setup Node.js App** (typical):
   - Application root: project folder
   - Application URL: your domain
   - Application startup file / script: `npm start` (or `node_modules/next/dist/bin/next start`)
   - Environment variables: copy from `.env`
4. Ensure `data/` and `media/` are writable by the Node process and **not deleted** on redeploy.
5. Prefer reverse-proxy HTTPS from the host’s SSL panel.

### What to back up

- `data/glic.db` (all CMS content)
- `media/` (uploaded files)

## Admin portal

Editors can update most site content and upload:

- Sermons (video/audio/embed)
- Videos
- Livestream embeds
- Books (covers / PDFs)
- Events, blog posts, locations, ministries, history milestones, values

## Content rules

Official copy is seeded from `GLIC website content edited`. Do not invent service times, branch lists, dates, theology, or contact details beyond the supplied document.
