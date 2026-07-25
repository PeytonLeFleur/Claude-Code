import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'

// Single shared operator password gates the /console write surface. This
// protects WRITES only — the hole-card embargo is enforced by RLS on the anon
// key, not by this cookie. Good enough for a basement.

export const OPERATOR_COOKIE = 'poker_operator'

function constantTimeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

/** Deterministic session token derived from the cookie secret. */
export function buildSessionToken(): string {
  const secret = process.env.CONSOLE_COOKIE_SECRET
  if (!secret) throw new Error('Missing CONSOLE_COOKIE_SECRET in .env.local.')
  return createHmac('sha256', secret).update('operator:v1').digest('hex')
}

/** True if the supplied cookie value is a valid operator session. */
export function verifySessionToken(value: string | undefined | null): boolean {
  if (!value) return false
  try {
    return constantTimeEqual(value, buildSessionToken())
  } catch {
    return false
  }
}

/** True if the supplied password matches CONSOLE_OPERATOR_PASSWORD. */
export function verifyPassword(input: string): boolean {
  const expected = process.env.CONSOLE_OPERATOR_PASSWORD
  if (!expected) throw new Error('Missing CONSOLE_OPERATOR_PASSWORD in .env.local.')
  return constantTimeEqual(input, expected)
}
