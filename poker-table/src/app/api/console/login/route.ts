import { cookies } from 'next/headers'
import { OPERATOR_COOKIE, buildSessionToken, verifyPassword } from '@/lib/auth/operator'

export async function POST(req: Request) {
  let password = ''
  try {
    const body = await req.json()
    password = typeof body?.password === 'string' ? body.password : ''
  } catch {
    return Response.json({ error: 'bad request' }, { status: 400 })
  }

  if (!verifyPassword(password)) {
    return Response.json({ error: 'wrong password' }, { status: 401 })
  }

  const jar = await cookies()
  jar.set(OPERATOR_COOKIE, buildSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12, // 12h — one long poker night
  })
  return Response.json({ ok: true })
}

export async function DELETE() {
  const jar = await cookies()
  jar.delete(OPERATOR_COOKIE)
  return Response.json({ ok: true })
}
