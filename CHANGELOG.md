# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-

### Changed

- Replaced TanStack Start with a Vite SPA and React Router. Studio, Neon, and Better Auth stay.
- Aligned README, docs index, changelog, EditorConfig, and GitHub templates with universal master template v3 formatting.

### Fixed

-

## [0.1.0] - 2026-09-07

### Added

- Editorial public site: hero, selected work, about, tools, CV, contact, footer.
- Project cards with hover copy, category chips, and case-study pages.
- Software-engineer sample profile (experience timeline, grouped tools, availability).
- Studio: claim / unlock / lock with a private passphrase (PBKDF2); Google / X are identity only.
- Contact form with owner inbox.
- Client-side PDF export of the published profile.
- Neon when `DATABASE_URL` is set; PGLite fallback for local / preview.
- GitHub metadata, docs, and CI.

### Changed

-

### Deprecated

-

### Removed

-

### Fixed

-

### Security

- Studio passphrase stored as salt + PBKDF2 hash; sessions stored as token hashes with expiry.
