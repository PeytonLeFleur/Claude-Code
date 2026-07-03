import { toCsv, inspectionsToCsv } from '../lib/csv';
import type { HiveData } from '../lib/types';

describe('toCsv', () => {
  it('joins headers and rows', () => {
    expect(toCsv(['a', 'b'], [[1, 2], [3, 4]])).toBe('a,b\n1,2\n3,4');
  });

  it('quotes cells with commas, quotes, or newlines', () => {
    expect(toCsv(['x'], [['a,b']])).toBe('x\n"a,b"');
    expect(toCsv(['x'], [['say "hi"']])).toBe('x\n"say ""hi"""');
  });

  it('emits just the header when there are no rows', () => {
    expect(toCsv(['a', 'b'], [])).toBe('a,b');
  });
});

describe('inspectionsToCsv', () => {
  const data: HiveData = {
    apiaries: [{ id: 'a1', name: 'Home Yard', createdAt: 'x' }],
    hives: [{ id: 'h1', apiaryId: 'a1', name: 'Blue', createdAt: 'x' }],
    inspections: [
      {
        id: 'i1',
        hiveId: 'h1',
        date: '2026-06-01',
        queen: 'queenright',
        brood: 'laying_well',
        temperament: 'calm',
        stores: 'adequate',
        note: 'calm, capped brood',
        miteCount: { method: 'alcohol_wash', mites: 9, bees: 300, date: '2026-06-01' },
      },
    ],
    treatments: [],
    tasks: [],
  };

  it('joins inspection rows to hive and apiary names and includes mite %', () => {
    const csv = inspectionsToCsv(data);
    const [header, row] = csv.split('\n');
    expect(header).toContain('mites_per_100_bees');
    expect(row).toContain('Home Yard');
    expect(row).toContain('Blue');
    expect(row).toContain('3'); // 9/300*100
  });
});
