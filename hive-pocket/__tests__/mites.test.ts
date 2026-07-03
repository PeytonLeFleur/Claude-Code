import { mitesPer100Bees, mitesPerDay, infestationRisk } from '../lib/mites';
import type { MiteCount } from '../lib/types';

const wash = (mites: number, bees: number): MiteCount => ({
  method: 'alcohol_wash',
  mites,
  bees,
  date: '2026-06-01',
});

describe('mitesPer100Bees', () => {
  it('computes percent from a 300-bee wash', () => {
    expect(mitesPer100Bees(wash(9, 300))).toBe(3); // 3 per 100
  });

  it('rounds to one decimal', () => {
    expect(mitesPer100Bees(wash(5, 300))).toBe(1.7);
  });

  it('returns undefined without a bee count', () => {
    expect(mitesPer100Bees({ method: 'sugar_roll', mites: 4, date: 'x' })).toBeUndefined();
  });

  it('returns undefined for a sticky board', () => {
    expect(
      mitesPer100Bees({ method: 'sticky_board', mites: 20, days: 3, date: 'x' }),
    ).toBeUndefined();
  });
});

describe('mitesPerDay', () => {
  it('averages the drop over the days in', () => {
    expect(
      mitesPerDay({ method: 'sticky_board', mites: 30, days: 3, date: 'x' }),
    ).toBe(10);
  });

  it('is undefined for wash/roll', () => {
    expect(mitesPerDay(wash(3, 300))).toBeUndefined();
  });
});

describe('infestationRisk (wash)', () => {
  it('flags high at/above the 3% economic threshold', () => {
    expect(infestationRisk(wash(9, 300)).level).toBe('high');
    expect(infestationRisk(wash(10, 300)).level).toBe('high');
  });

  it('flags moderate in the 2–3% band', () => {
    expect(infestationRisk(wash(6, 300)).level).toBe('moderate'); // 2.0
    expect(infestationRisk(wash(8, 300)).level).toBe('moderate'); // 2.7
  });

  it('flags low below 2%', () => {
    expect(infestationRisk(wash(3, 300)).level).toBe('low'); // 1.0
  });

  it('cites the source in the message', () => {
    expect(infestationRisk(wash(9, 300)).message).toMatch(/Honey Bee Health Coalition/);
  });

  it('is unknown without enough data', () => {
    expect(infestationRisk({ method: 'alcohol_wash', mites: 5, date: 'x' }).level).toBe(
      'unknown',
    );
  });
});

describe('infestationRisk (sticky board)', () => {
  it('bands the daily drop', () => {
    expect(infestationRisk({ method: 'sticky_board', mites: 30, days: 3, date: 'x' }).level).toBe(
      'high',
    );
    expect(infestationRisk({ method: 'sticky_board', mites: 21, days: 3, date: 'x' }).level).toBe(
      'moderate',
    );
    expect(infestationRisk({ method: 'sticky_board', mites: 9, days: 3, date: 'x' }).level).toBe(
      'low',
    );
  });
});
