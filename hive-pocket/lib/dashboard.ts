// Dashboard derivations — pure, so the apiary risk grid is unit-testable.
// `now` is always passed in; nothing here reads the clock.
import type { HiveData, Hive, Inspection } from './types';
import { colonyRisk, ColonyRisk } from './risk';

export function latestInspection(
  inspections: Inspection[],
  hiveId: string,
): Inspection | undefined {
  return inspections
    .filter((i) => i.hiveId === hiveId)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}

/** Whole days from an ISO date to `now` (floored, never negative). */
export function daysSince(iso: string, now: Date): number {
  const ms = now.getTime() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}

export interface DashboardCard {
  hive: Hive;
  apiaryName: string;
  lastInspectionDate?: string;
  daysSinceInspection?: number;
  risk: ColonyRisk;
}

/** One card per hive, each with its worst-signal risk colour. */
export function buildDashboard(data: HiveData, now: Date): DashboardCard[] {
  const apiaryById = new Map(data.apiaries.map((a) => [a.id, a]));

  return data.hives.map((hive) => {
    const insp = latestInspection(data.inspections, hive.id);
    const days = insp ? daysSince(insp.date, now) : undefined;
    const risk = colonyRisk({
      lastInspection: insp,
      daysSinceInspection: days,
    });
    return {
      hive,
      apiaryName: apiaryById.get(hive.apiaryId)?.name ?? '',
      lastInspectionDate: insp?.date,
      daysSinceInspection: days,
      risk,
    };
  });
}

/** Sort worst-first so the dashboard surfaces colonies that need attention. */
export function sortByUrgency(cards: DashboardCard[]): DashboardCard[] {
  const rank = { urgent: 3, watch: 2, ok: 1, unknown: 0 } as const;
  return [...cards].sort((a, b) => rank[b.risk.level] - rank[a.risk.level]);
}
