// Varroa mite-count math. Pure functions, fully unit-tested.
//
// Thresholds follow the Honey Bee Health Coalition's "Tools for Varroa
// Management" guidance (economic treatment threshold ≈ 3 mites per 100 bees).
// Per the project guardrails, this app reports the measured infestation level;
// it does not prescribe a specific treatment. Always confirm against a current
// local extension recommendation before treating.
import type { MiteCount } from './types';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'unknown';

export interface MiteResult {
  /** Mites per 100 bees (wash / sugar roll). Undefined for sticky board. */
  per100Bees?: number;
  /** Mites per day (sticky board 24h drop). Undefined for wash / roll. */
  perDay?: number;
  level: RiskLevel;
  /** Plain-language summary — informational, not a treatment directive. */
  message: string;
}

const SOURCE = 'Honey Bee Health Coalition — Tools for Varroa Management';

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Mites per 100 bees for a wash or sugar-roll sample. */
export function mitesPer100Bees(count: MiteCount): number | undefined {
  if (count.method === 'sticky_board') return undefined;
  if (!count.bees || count.bees <= 0) return undefined;
  if (count.mites < 0) return undefined;
  return round1((count.mites / count.bees) * 100);
}

/** Average mites per day for a sticky-board drop. */
export function mitesPerDay(count: MiteCount): number | undefined {
  if (count.method !== 'sticky_board') return undefined;
  if (!count.days || count.days <= 0) return undefined;
  if (count.mites < 0) return undefined;
  return round1(count.mites / count.days);
}

/**
 * Classify infestation risk from a mite count.
 *
 * Wash / sugar roll (per 100 bees): <2 low, 2–<3 moderate, ≥3 high — the ≥3
 * boundary is the Coalition's economic treatment threshold.
 *
 * Sticky board (natural drop per day) is only a rough screen; a wash is more
 * reliable. Bands used: <5 low, 5–<10 moderate, ≥10 high.
 */
export function infestationRisk(count: MiteCount): MiteResult {
  if (count.method === 'sticky_board') {
    const perDay = mitesPerDay(count);
    if (perDay === undefined) {
      return { level: 'unknown', message: 'Not enough data for a sticky-board estimate.' };
    }
    let level: RiskLevel = 'low';
    if (perDay >= 10) level = 'high';
    else if (perDay >= 5) level = 'moderate';
    return {
      perDay,
      level,
      message:
        `≈ ${perDay} mites/day natural drop (${level} band). Sticky-board counts are a ` +
        `rough screen — confirm with an alcohol wash. Source: ${SOURCE}.`,
    };
  }

  const per100Bees = mitesPer100Bees(count);
  if (per100Bees === undefined) {
    return { level: 'unknown', message: 'Enter mites and bees sampled to get a result.' };
  }
  let level: RiskLevel = 'low';
  if (per100Bees >= 3) level = 'high';
  else if (per100Bees >= 2) level = 'moderate';
  return {
    per100Bees,
    level,
    message:
      `${per100Bees} mites per 100 bees (${level}). The economic treatment threshold is ` +
      `≈ 3 per 100 bees. Source: ${SOURCE}.`,
  };
}
