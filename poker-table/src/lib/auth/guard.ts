import 'server-only'

import { cookies } from 'next/headers'
import { OPERATOR_COOKIE, verifySessionToken } from './operator'

/** True when the current request carries a valid operator session cookie. */
export async function isOperator(): Promise<boolean> {
  const jar = await cookies()
  return verifySessionToken(jar.get(OPERATOR_COOKIE)?.value)
}

/** For route handlers: returns a 401 Response when not authed, else null. */
export async function requireOperator(): Promise<Response | null> {
  if (await isOperator()) return null
  return Response.json({ error: 'unauthorized' }, { status: 401 })
}
