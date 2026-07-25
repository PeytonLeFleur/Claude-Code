// Minimal payment graph ("who pays whom") for night-end settle-up.
// Pure and DB-free so it can be unit-tested in isolation.

export interface PlayerNet {
  playerId: string
  name: string
  /** Positive = owed money (up), negative = owes money (down). Cents. */
  netCents: number
}

export interface Payment {
  fromPlayerId: string
  fromName: string
  toPlayerId: string
  toName: string
  amountCents: number
}

export interface SettleResult {
  nets: PlayerNet[]
  payments: Payment[]
  /** True when all nets sum to exactly zero. */
  balanced: boolean
  /** Signed leftover in cents when the books don't balance (rounding, miscounts). */
  imbalanceCents: number
}

/**
 * Greedy min-cash-flow: repeatedly settle the biggest debtor against the
 * biggest creditor. Produces at most n-1 payments. O(n^2) selection, which is
 * nothing at basement scale (<= 10 players).
 */
export function computeSettlement(nets: PlayerNet[]): SettleResult {
  const imbalanceCents = nets.reduce((sum, n) => sum + n.netCents, 0)

  // Work on mutable copies so callers' input is untouched.
  const bal = nets.map((n) => ({ ...n }))
  const payments: Payment[] = []

  // Guard bound: each iteration zeroes out at least one party.
  for (let guard = 0; guard < bal.length * 2; guard++) {
    let debtorIdx = -1
    let creditorIdx = -1
    for (let i = 0; i < bal.length; i++) {
      if (bal[i].netCents < 0 && (debtorIdx === -1 || bal[i].netCents < bal[debtorIdx].netCents)) {
        debtorIdx = i
      }
      if (bal[i].netCents > 0 && (creditorIdx === -1 || bal[i].netCents > bal[creditorIdx].netCents)) {
        creditorIdx = i
      }
    }
    if (debtorIdx === -1 || creditorIdx === -1) break

    const debtor = bal[debtorIdx]
    const creditor = bal[creditorIdx]
    const amount = Math.min(-debtor.netCents, creditor.netCents)
    if (amount <= 0) break

    payments.push({
      fromPlayerId: debtor.playerId,
      fromName: debtor.name,
      toPlayerId: creditor.playerId,
      toName: creditor.name,
      amountCents: amount,
    })
    debtor.netCents += amount
    creditor.netCents -= amount
  }

  return {
    nets,
    payments,
    balanced: imbalanceCents === 0,
    imbalanceCents,
  }
}
