# Security

## Public vs private

| Surface | Who |
| :--- | :--- |
| CV, work, about, PDF of published profile | Anyone |
| Contact **submit** | Anyone (rate-limit is not implemented; keep the form if you accept mail) |
| Studio editor, save, inbox, change key | Holder of the current passphrase + valid session |

Cloning GitHub gives **code and sample content**, not Neon data and not the key.

## Studio passphrase

- Claimed by the owner; never written as plaintext.
- PBKDF2, SHA-256, 120 000 iterations, 32-byte derived key, random salt.
- Compare with `timingSafeEqual` on equal-length hex.
- Session token: 32 random bytes, stored as SHA-256, ~7 day expiry.

Treat the phrase like a password-manager secret. Short or reused phrases are the real risk, not the hash format.

## Environment

Keep `DATABASE_URL` and `BETTER_AUTH_SECRET` in Vercel / `.env`. If two deploys share one Neon URL, they share the lock and the CV.

## Disclosure

See [SECURITY.md](../SECURITY.md). Do not file public issues for lock bypasses or secret leaks.
