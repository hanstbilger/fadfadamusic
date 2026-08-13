# Fadfada — website

A lean, bilingual (English/German), mobile-first site for the Fadfada duo.

## Pages
- `index.html` — Home (hero, intro, featured video, highlights, signup)
- `live.html` — Live / Dates (upcoming + past shows)
- `listen.html` — Listen & Watch (videos + Bandcamp)
- `about.html` — About (full bio + member cards)
- `press.html` — Press / For promoters (facts, quotes, downloadable photos, booking)
- `contact.html` — Contact (booking + general + mailing list)

## Preview
Double-click `index.html` to open it in a browser. Everything works from the
files as-is; the videos, Bandcamp players, and web fonts load when you're online.

## Deploy
It's a static site — no build step. Upload the whole folder to any static host
(Netlify, Cloudflare Pages, GitHub Pages, or your current host). Point your own
domain at it (e.g. `fadfada.band`). For GitHub Pages, drop these files in the repo
root and enable Pages.

## Language toggle
EN/DE switch is in the top bar. The choice is remembered on the visitor's device.
To change the default, edit the `initLang()` logic in `js/main.js`.

## Mailing list (email capture)
Every page has a signup. Out of the box it opens a pre-filled email to
`contact@hansbilger.com` so it works immediately. To connect a real list
(Mailchimp, Buttondown, MailerLite…), open `js/main.js` and set
`NEWSLETTER_ENDPOINT` to your provider's form POST URL — the forms will then
submit there automatically.

## Things to update
- **Instagram** — the footer Instagram icon points to a placeholder. Replace the
  URL in each page's footer (or in `build`-generated files) with the dedicated
  Fadfada handle once it exists.
- **Social links** — Spotify/Bandcamp currently use the existing artist pages;
  swap for dedicated Fadfada profiles when ready.
- **Upcoming dates** — add them to the "Upcoming" section in `live.html` (copy the
  structure of a past show entry and place it above the list).
- **EPK PDF** — if you want a downloadable one-sheet on the Press page, drop the
  PDF into `assets/` and add a link.

## Photos
Press photos on `press.html` are click-to-download. Album cover credit is set to
"© Hans Bilger / Kinan Fleihan" — adjust credits in `press.html` as needed.
Images were optimized for web; originals remain in your archive.
