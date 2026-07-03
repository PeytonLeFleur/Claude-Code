// Colony risk colouring for the apiary dashboard. Pure and unit-tested.
// Keeping `daysSinceInspection` as an input (rather than reading the clock here)
// keeps this deterministic and testable.
import type { Inspection } from './types';
import { infestationRisk } from './mites';

export type ColonyRiskLevel = 'ok' | 'watch' | 'urgent' | 'unknown';

export interface ColonyRisk {
  level: ColonyRiskLevel;
  /** Hex colour for the dashboard card. */
  color: string;
  /** Human-readable reasons, most-severe first. */
  reasons: string[];
}

export interface ColonySnapshot {
  lastInspection?: Inspection;
  /** Whole days since the last inspection; undefined if never inspected. */
  daysSinceInspection?: number;
  /** After this many days a colony is "due" for a look. Default 21. */
  dueAfterDays?: number;
}

const COLORS: Record<ColonyRiskLevel, string> = {
  ok: '#16a34a', // green
  watch: '#f59e0b', // amber
  urgent: '#dc2626', // red
  unknown: '#9ca3af', // gray
};

/** Rank so we can take the worst signal as the card colour. */
const RANK: Record<ColonyRiskLevel, number> = { unknown: 0, ok: 1, watch: 2, urgent: 3 };

export function colonyRisk(snap: ColonySnapshot): ColonyRisk {
  const insp = snap.lastInspection;
  if (!insp) {
    return { level: 'unknown', color: COLORS.unknown, reasons: ['Never inspected'] };
  }

  const dueAfter = snap.dueAfterDays ?? 21;
  let level: ColonyRiskLevel = 'ok';
  const reasons: string[] = [];

  const bump = (to: ColonyRiskLevel, reason: string) => {
    reasons.push(reason);
    if (RANK[to] > RANK[level]) level = to;
  };

  // Queen / brood.
  if (insp.queen === 'queenless') bump('urgent', 'Queenless');
  else if (insp.queen === 'virgin') bump('watch', 'Virgin queen — needs follow-up');
  if (insp.brood === 'none') bump('urgent', 'No brood');
  else if (insp.brood === 'spotty') bump('watch', 'Spotty brood pattern');

  // Stores.
  if (insp.stores === 'empty') bump('urgent', 'Out of stores — feed now');
  else if (insp.stores === 'light') bump('watch', 'Light on stores');

  // Mites.
  if (insp.miteCount) {
    const mite = infestationRisk(insp.miteCount);
    if (mite.level === 'high') bump('urgent', 'High mite load');
    else if (mite.level === 'moderate') bump('watch', 'Moderate mite load');
  }

  // Temperament (informational — never worse than watch).
  if (insp.temperament === 'hot') bump('watch', 'Very defensive');

  // Overdue for a look.
  if (snap.daysSinceInspection !== undefined && snap.daysSinceInspection > dueAfter) {
    bump('watch', `Not inspected in ${snap.daysSinceInspection} days`);
  }

  if (reasons.length === 0) reasons.push('Looks healthy');
  return { level, color: COLORS[level], reasons };
}

export function riskColor(level: ColonyRiskLevel): string {
  return COLORS[level];
}
