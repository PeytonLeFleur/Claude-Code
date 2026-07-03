import {
  suggestTasksForInspection,
  suggestTasksForTreatment,
  newTaskDrafts,
  taskKey,
  DEFAULT_INSPECTION_INTERVAL_DAYS,
} from '../lib/reminders';
import type { Inspection, Treatment, Task } from '../lib/types';

const NOW = new Date('2026-06-01T00:00:00Z');

const base: Inspection = {
  id: 'i1',
  hiveId: 'h1',
  date: '2026-06-01',
  queen: 'queenright',
  brood: 'laying_well',
  temperament: 'calm',
  stores: 'adequate',
};

const dayOf = (iso: string) => iso.slice(0, 10);

describe('suggestTasksForInspection', () => {
  it('always schedules a routine inspection at the default interval', () => {
    const tasks = suggestTasksForInspection(base, NOW);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].kind).toBe('inspection');
    expect(dayOf(tasks[0].dueAt)).toBe('2026-06-15'); // +14
    expect(DEFAULT_INSPECTION_INTERVAL_DAYS).toBe(14);
  });

  it('adds an urgent feeding task when out of stores', () => {
    const tasks = suggestTasksForInspection({ ...base, stores: 'empty' }, NOW);
    const feed = tasks.find((t) => t.kind === 'feeding');
    expect(feed).toBeDefined();
    expect(dayOf(feed!.dueAt)).toBe('2026-06-02'); // +1
  });

  it('adds a queen follow-up when queenless', () => {
    const tasks = suggestTasksForInspection({ ...base, queen: 'queenless' }, NOW);
    expect(tasks.some((t) => t.kind === 'follow_up')).toBe(true);
  });

  it('plans a treatment on a high mite load, with a sourced-guidance caveat', () => {
    const tasks = suggestTasksForInspection(
      { ...base, miteCount: { method: 'alcohol_wash', mites: 12, bees: 300, date: 'x' } },
      NOW,
    );
    const treat = tasks.find((t) => t.kind === 'treatment');
    expect(treat).toBeDefined();
    expect(treat!.title).toMatch(/confirm against local guidance/i);
  });

  it('recommends a recheck (not treatment) on a moderate load', () => {
    const tasks = suggestTasksForInspection(
      { ...base, miteCount: { method: 'alcohol_wash', mites: 6, bees: 300, date: 'x' } },
      NOW,
    );
    expect(tasks.some((t) => t.kind === 'mite_check')).toBe(true);
    expect(tasks.some((t) => t.kind === 'treatment')).toBe(false);
  });
});

describe('suggestTasksForTreatment', () => {
  const t: Treatment = {
    id: 't1',
    hiveId: 'h1',
    type: 'oxalic_acid',
    appliedAt: '2026-06-01',
    followUpDays: 7,
  };
  it('schedules a follow-up at the withdrawal window', () => {
    const tasks = suggestTasksForTreatment(t, NOW);
    expect(dayOf(tasks[0].dueAt)).toBe('2026-06-08');
  });
  it('is empty without a follow-up window', () => {
    expect(suggestTasksForTreatment({ ...t, followUpDays: undefined }, NOW)).toEqual([]);
  });
});

describe('newTaskDrafts (dedup)', () => {
  const draft = { hiveId: 'h1', kind: 'inspection' as const, dueAt: 'x', title: 'Routine inspection' };

  it('suppresses a draft that matches an OPEN task', () => {
    const existing: Task[] = [{ id: 'a', done: false, ...draft }];
    expect(newTaskDrafts(existing, [draft])).toHaveLength(0);
  });

  it('allows a draft when the matching task is already done', () => {
    const existing: Task[] = [{ id: 'a', done: true, ...draft }];
    expect(newTaskDrafts(existing, [draft])).toHaveLength(1);
  });

  it('collapses duplicate drafts within one batch', () => {
    expect(newTaskDrafts([], [draft, { ...draft, dueAt: 'y' }])).toHaveLength(1);
  });

  it('taskKey ignores dueAt', () => {
    const other = { ...draft, dueAt: 'zzz' };
    expect(taskKey(draft)).toBe(taskKey(other));
  });
});
