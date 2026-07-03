import { colonyRisk } from '../lib/risk';
import type { Inspection } from '../lib/types';

const base: Inspection = {
  id: 'i1',
  hiveId: 'h1',
  date: '2026-06-01',
  queen: 'queenright',
  brood: 'laying_well',
  temperament: 'calm',
  stores: 'adequate',
};

describe('colonyRisk', () => {
  it('is unknown when never inspected', () => {
    expect(colonyRisk({}).level).toBe('unknown');
  });

  it('is ok for a healthy recent inspection', () => {
    const r = colonyRisk({ lastInspection: base, daysSinceInspection: 3 });
    expect(r.level).toBe('ok');
    expect(r.reasons).toContain('Looks healthy');
  });

  it('is urgent when queenless', () => {
    const r = colonyRisk({ lastInspection: { ...base, queen: 'queenless' } });
    expect(r.level).toBe('urgent');
    expect(r.reasons[0]).toBe('Queenless');
  });

  it('is urgent when out of stores', () => {
    expect(colonyRisk({ lastInspection: { ...base, stores: 'empty' } }).level).toBe('urgent');
  });

  it('is urgent on a high mite load', () => {
    const r = colonyRisk({
      lastInspection: {
        ...base,
        miteCount: { method: 'alcohol_wash', mites: 12, bees: 300, date: 'x' },
      },
    });
    expect(r.level).toBe('urgent');
    expect(r.reasons).toContain('High mite load');
  });

  it('is watch when light on stores', () => {
    expect(colonyRisk({ lastInspection: { ...base, stores: 'light' } }).level).toBe('watch');
  });

  it('is watch when overdue for inspection', () => {
    const r = colonyRisk({ lastInspection: base, daysSinceInspection: 40 });
    expect(r.level).toBe('watch');
    expect(r.reasons.some((x) => x.includes('40 days'))).toBe(true);
  });

  it('takes the worst signal as the level', () => {
    const r = colonyRisk({
      lastInspection: { ...base, queen: 'queenless', stores: 'light' },
      daysSinceInspection: 40,
    });
    expect(r.level).toBe('urgent'); // queenless dominates
  });

  it('returns a colour for the level', () => {
    expect(colonyRisk({ lastInspection: base, daysSinceInspection: 1 }).color).toBe('#16a34a');
  });
});
