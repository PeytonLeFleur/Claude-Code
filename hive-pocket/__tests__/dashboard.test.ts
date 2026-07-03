import { buildDashboard, sortByUrgency, daysSince, latestInspection } from '../lib/dashboard';
import type { HiveData, Inspection } from '../lib/types';

const insp = (hiveId: string, date: string, over: Partial<Inspection> = {}): Inspection => ({
  id: `${hiveId}-${date}`,
  hiveId,
  date,
  queen: 'queenright',
  brood: 'laying_well',
  temperament: 'calm',
  stores: 'adequate',
  ...over,
});

const data: HiveData = {
  apiaries: [{ id: 'a1', name: 'Home Yard', createdAt: '2026-01-01' }],
  hives: [
    { id: 'h1', apiaryId: 'a1', name: 'Blue', createdAt: '2026-01-01' },
    { id: 'h2', apiaryId: 'a1', name: 'Green', createdAt: '2026-01-01' },
    { id: 'h3', apiaryId: 'a1', name: 'Red', createdAt: '2026-01-01' },
  ],
  inspections: [
    insp('h1', '2026-05-01'),
    insp('h1', '2026-06-01'), // latest for h1
    insp('h2', '2026-06-10', { queen: 'queenless' }),
    // h3 never inspected
  ],
  treatments: [],
  tasks: [],
};

const NOW = new Date('2026-06-15T00:00:00Z');

describe('daysSince', () => {
  it('floors whole days and never goes negative', () => {
    expect(daysSince('2026-06-10', NOW)).toBe(5);
    expect(daysSince('2026-07-01', NOW)).toBe(0);
  });
});

describe('latestInspection', () => {
  it('returns the most recent by date', () => {
    expect(latestInspection(data.inspections, 'h1')?.date).toBe('2026-06-01');
  });
  it('is undefined when none', () => {
    expect(latestInspection(data.inspections, 'h3')).toBeUndefined();
  });
});

describe('buildDashboard', () => {
  it('produces one card per hive with apiary name', () => {
    const cards = buildDashboard(data, NOW);
    expect(cards).toHaveLength(3);
    expect(cards.every((c) => c.apiaryName === 'Home Yard')).toBe(true);
  });

  it('marks a queenless hive urgent and an uninspected hive unknown', () => {
    const cards = buildDashboard(data, NOW);
    const byName = Object.fromEntries(cards.map((c) => [c.hive.name, c]));
    expect(byName.Green.risk.level).toBe('urgent');
    expect(byName.Red.risk.level).toBe('unknown');
    expect(byName.Blue.risk.level).toBe('ok');
  });
});

describe('sortByUrgency', () => {
  it('orders urgent before ok before unknown', () => {
    const cards = sortByUrgency(buildDashboard(data, NOW));
    expect(cards.map((c) => c.risk.level)).toEqual(['urgent', 'ok', 'unknown']);
  });
});
