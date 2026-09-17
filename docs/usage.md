# Usage

## Public site

Anyone with the URL can read the CV, filter work, open case studies, export a PDF of **published** content, and send a contact message.

## Studio (`/studio`)

The footer link is quiet on purpose.

1. **First visit — claim.** Choose a passphrase (minimum 8 characters) and confirm it. That hash becomes the only editor credential for this database.
2. **Later — unlock.** Enter the same key. A session lasts about seven days in this browser.
3. **Edit.** Tabs: Identity, About, Work (including case-study fields), CV, Tools, Inbox, Lock.
4. **Save & publish** writes the JSON profile. The public site and PDF pick it up after reload.
5. **Lock** drops the session on this device. **Change key** retires the old passphrase.

An email account never grants publish rights.

## PDF

Header / hero / CV “Download PDF” run `jspdf` in the browser from the current profile. No server round-trip.

## Contact inbox

Messages land in Postgres. Only an unlocked Studio session can list them.

## One CV per deploy

This instance has a single `site_profile` row. Another person gets their own CV only by deploying **their** Vercel project with **their** Neon database and claiming **their** key.
