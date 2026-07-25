import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'
import { CreateSeasonForm, StartNightForm } from '@/components/console/forms'
import type { Night, Season } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

export default async function ConsoleHome() {
  const sb = createServiceClient()
  const [{ data: seasonData }, { data: nightData }] = await Promise.all([
    sb.from('seasons').select('*').order('started_at', { ascending: false }),
    sb.from('nights').select('*').order('started_at', { ascending: false }).limit(20),
  ])
  const seasons = (seasonData ?? []) as Season[]
  const nights = (nightData ?? []) as Night[]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-xs tracking-widest text-white/40 uppercase">New season</h2>
        <CreateSeasonForm />
      </section>

      {seasons.length > 0 ? (
        <section>
          <h2 className="mb-3 text-xs tracking-widest text-white/40 uppercase">Start a night</h2>
          <StartNightForm seasons={seasons} />
        </section>
      ) : null}

      <section>
        <h2 className="mb-3 text-xs tracking-widest text-white/40 uppercase">Nights</h2>
        {nights.length === 0 ? (
          <p className="text-white/40">No nights yet. Create a season, then start a night.</p>
        ) : (
          <ul className="divide-y divide-white/5 rounded-xl border border-white/10">
            {nights.map((n) => (
              <li key={n.id}>
                <Link href={`/console/night/${n.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-white/5">
                  <span className="text-white">{n.label ?? 'Night'}</span>
                  <span className="flex items-center gap-3 text-sm text-white/40">
                    <span>{new Date(n.started_at).toLocaleDateString()}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${n.revealed ? 'bg-white/10 text-white/60' : n.status === 'live' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/50'}`}>
                      {n.revealed ? 'revealed' : n.status}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
