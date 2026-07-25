import Link from 'next/link'
import { SettleView } from '@/components/console/SettleView'

export const dynamic = 'force-dynamic'

export default async function SettlePage({ params }: { params: Promise<{ nightId: string }> }) {
  const { nightId } = await params
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Settle up</h1>
        <Link href={`/console/night/${nightId}`} className="text-sm text-white/50 hover:text-white">
          ← Back to night
        </Link>
      </header>
      <p className="text-sm text-white/40">
        Nets are current stack minus buy-ins. Enter final chip counts as a stack snapshot on the
        night page first for an accurate settle.
      </p>
      <SettleView nightId={nightId} />
    </div>
  )
}
