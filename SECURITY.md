# Security policy

## Supported versions

| Version | Supported |
| :--- | :--- |
| 0.1.x | Yes |

## Reporting a vulnerability

**Do not open a public GitHub issue** for security problems.

Use [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories/working-with-repository-security-advisories/privately-reporting-a-security-vulnerability) on this repository, or email the address published on the live site.

Initial response target: **48 hours**.

## What this app protects

- The **public CV** is public by design.
- **Studio** (save profile, inbox) requires the owner passphrase. The phrase is never stored; only a PBKDF2 hash and salt live in Postgres.
- Email sign-in, if enabled, is identity only and **does not** unlock Studio.

See [docs/security.md](docs/security.md) for hashing parameters, session handling, and deployment notes.
