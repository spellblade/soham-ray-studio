# ADR-0003: Vite SPA + React Router, not TanStack Start

## Status

Accepted

## Context

The first scaffold used TanStack Start (file routes, `createServerFn`, Nitro SSR). The public CV does not need SSR, and TanStack was not the stack the owner wanted.

## Decision

Ship a Vite SPA with React Router. JSON `/api/*` handlers cover profile, Studio lock, contact, and Better Auth. Nitro stays for the Vercel build and the PWA middleware.

## Consequences

- Positive: simpler client routing, no generated `routeTree`, Studio and Neon stay the same.
- Negative: first paint of `/` waits on `GET /api/profile` (sample content is shown immediately as fallback).
