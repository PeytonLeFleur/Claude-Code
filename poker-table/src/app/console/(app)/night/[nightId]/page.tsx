import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import { formatUSD } from '@/lib/domain/money'
import {
  BuyInForm,
  MarkBonusPaid,
  OpenHandButton,
  RecordResultForm,
  RevealButton,
  SeatPlayersForm,
  SnapshotForm,
  TransferForm,
} from '@/components/console/forms'
import type { Bonus, Hand, Night, NightSeat, Player } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <h2 className="mb-3 text-xs tracking-widest text-white/40 uppercase">{title}</h2>
      {children}
    </section>
  )
}

export default async function NightControl({ params }: { params: Promise<{ nightId: string }> }) {
  const { nightId } = await params
  const sb = createServiceClient()

  const { data: nightData } = await sb.from('nights').select('*').eq('id', nightId).maybeSingle()
  if (!nightData) notFound()
  const night = nightData as Night

  const [{ data: seatData }, { data: playerData }, { data: openData }, { data: bonusData }] = await Promise.all([
    sb.from('night_seats').select('*').eq('night_id', nightId).order('seat'),
    sb.from('players').select('*').eq('active', true).order('display_name'),
    sb.from('hands').select('*').eq('night_id', nightId).eq('status', 'open').order('hand_no', { ascending: false }).limit(1),
    sb.from('bonuses').select('*').eq('night_id', nightId).order('created_at', { ascending: false }),
  ])

  const seats = (seatData ?? []) as NightSeat[]
  const players = (playerData ?? []) as Player[]
  const byId = new Map(players.map((p) => [p.id, p]))
  const seatedPlayers = seats.map((s) => byId.get(s.player_id)).filter((p): p is Player => Boolean(p))
  const openHand = ((openData ?? [])[0] as Hand | undefined) ?? null
  const bonuses = (bonusData ?? []) as Bonus[]
  const nameOf = (id: string) => byId.get(id)?.display_name ?? '—'

  const closed = night.status === 'closed'

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">{night.label ?? 'Night'}</h1>
          <p className="text-sm text-white/40">
            Hand #{night.hand_counter} · dealer seat {night.dealer_seat ?? 0} · ante {formatUSD(night.ante_cents)} · buy-in {formatUSD(night.buyin_cents)}
            {night.revealed ? ' · revealed' : ''}
          </p>
        </div>
        <Link href={`/console/night/${nightId}/settle`} className="rounded-lg border border-white/15 px-4 py-2 text-white hover:bg-white/5">
          Settle up →
        </Link>
      </header>

      {closed ? (
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/60">
          This night is closed{night.revealed ? ' and revealed' : ''}. It&apos;s read-only now.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Seat players">
          <SeatPlayersForm nightId={nightId} players={players} currentNames={seatedPlayers.map((p) => p.display_name)} />
        </Section>

        <Section title="Buy-ins & rebuys">
          {seatedPlayers.length === 0 ? (
            <p className="text-sm text-white/40">Seat players first.</p>
          ) : (
            <BuyInForm nightId={nightId} players={seatedPlayers} />
          )}
        </Section>

        <Section title="Hand">
          <div className="space-y-4">
            <OpenHandButton nightId={nightId} disabled={closed || seatedPlayers.length === 0 || Boolean(openHand)} />
            <RecordResultForm openHand={openHand} seatedPlayers={seatedPlayers} />
          </div>
        </Section>

        <Section title="Stack snapshot">
          {seatedPlayers.length === 0 ? (
            <p className="text-sm text-white/40">Seat players first.</p>
          ) : (
            <SnapshotForm nightId={nightId} handId={openHand?.id ?? null} seatedPlayers={seatedPlayers} />
          )}
        </Section>

        <Section title="Chip transfer">
          {seatedPlayers.length < 2 ? (
            <p className="text-sm text-white/40">Need at least two seated players.</p>
          ) : (
            <TransferForm nightId={nightId} players={seatedPlayers} />
          )}
        </Section>

        <Section title="7‑2 ledger">
          {bonuses.length === 0 ? (
            <p className="text-sm text-white/40">No 7‑2 invoices yet.</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {bonuses.map((b) => (
                <li key={b.id} className="flex items-center justify-between">
                  <span className="text-white/80">
                    {nameOf(b.payer_player_id)} <span className="text-white/40">owes</span> {nameOf(b.winner_player_id)} {formatUSD(b.amount_cents)}
                  </span>
                  <MarkBonusPaid bonusId={b.id} paid={b.paid} />
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      <Section title="End of night">
        <RevealButton nightId={nightId} />
        <p className="mt-2 text-sm text-white/40">
          Revealing closes the night and unlocks hole-card data on the TV. Do this once everyone&apos;s done.
        </p>
      </Section>
    </div>
  )
}
