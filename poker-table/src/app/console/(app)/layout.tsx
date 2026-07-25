import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isOperator } from '@/lib/auth/guard'

// Guards every /console route except /console/login (which lives outside this
// route group).
export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  if (!(await isOperator())) redirect('/console/login')

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-5 lg:p-8">
      <nav className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <Link href="/console" className="text-lg font-semibold text-white">
          Console
        </Link>
        <Link href="/tv" className="text-sm text-white/50 hover:text-white">
          TV dashboard →
        </Link>
      </nav>
      {children}
    </div>
  )
}
