// All money in the system is integer cents. No floats, ever.

export const ANTE_CENTS = 5
export const SEVEN_TWO_BONUS_CENTS = 50
export const DEFAULT_BUYIN_CENTS = 2000

/** Format cents as USD, e.g. -1250 -> "-$12.50". */
export function formatUSD(cents: number): string {
  const sign = cents < 0 ? '-' : ''
  const abs = Math.abs(cents)
  const dollars = Math.floor(abs / 100)
  const rem = (abs % 100).toString().padStart(2, '0')
  return `${sign}$${dollars.toLocaleString('en-US')}.${rem}`
}

/** Signed format for deltas, e.g. 500 -> "+$5.00". */
export function formatDelta(cents: number): string {
  if (cents > 0) return `+${formatUSD(cents)}`
  return formatUSD(cents)
}

/** Parse a dollar string ("12.50", "$12.50", "12") into integer cents. */
export function parseDollarsToCents(input: string): number | null {
  const cleaned = input.replace(/[$,\s]/g, '')
  if (cleaned === '' || !/^-?\d*\.?\d{0,2}$/.test(cleaned)) return null
  const value = Number(cleaned)
  if (Number.isNaN(value)) return null
  return Math.round(value * 100)
}
