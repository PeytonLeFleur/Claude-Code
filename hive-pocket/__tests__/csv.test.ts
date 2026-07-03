import {
  toCsv,
  inspectionsToCsv,
  parseCsv,
  parseHivesCsv,
  hivesToCsv,
} from '../lib/csv';
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

describe('parseCsv', () => {
  it('parses a simple grid', () => {
    expect(parseCsv('a,b\n1,2\n3,4')).toEqual([
      ['a', 'b'],
      ['1', '2'],
      ['3', '4'],
    ]);
  });

  it('handles quoted commas, escaped quotes, and CRLF', () => {
    expect(parseCsv('x,y\r\n"a,b","say ""hi"""')).toEqual([
      ['x', 'y'],
      ['a,b', 'say "hi"'],
    ]);
  });

  it('handles newlines inside quotes and drops blank trailing lines', () => {
    expect(parseCsv('note\n"line1\nline2"\n')).toEqual([['note'], ['line1\nline2']]);
  });
});

describe('parseHivesCsv', () => {
  it('imports rows with apiary + hive + installed_at', () => {
    const rows = parseHivesCsv('apiary,hive,installed_at\nHome Yard,Blue,2026-04-01\nHome Yard,Green,');
    expect(rows).toEqual([
      { apiary: 'Home Yard', hive: 'Blue', installedAt: '2026-04-01' },
      { apiary: 'Home Yard', hive: 'Green', installedAt: undefined },
    ]);
  });

  it('tolerates column order and missing apiary (defaults to Imported)', () => {
    const rows = parseHivesCsv('hive\nSolo');
    expect(rows).toEqual([{ apiary: 'Imported', hive: 'Solo', installedAt: undefined }]);
  });

  it('skips rows with no hive name and returns [] without a hive column', () => {
    expect(parseHivesCsv('apiary,hive\nYardA,\nYardA,Red')).toEqual([
      { apiary: 'YardA', hive: 'Red', installedAt: undefined },
    ]);
    expect(parseHivesCsv('apiary,notes\nYardA,hello')).toEqual([]);
    expect(parseHivesCsv('')).toEqual([]);
  });
});

describe('hivesToCsv', () => {
  it('round-trips through parseHivesCsv', () => {
    const data: HiveData = {
      apiaries: [{ id: 'a1', name: 'Home Yard', createdAt: 'x' }],
      hives: [
        { id: 'h1', apiaryId: 'a1', name: 'Blue', installedAt: '2026-04-01', createdAt: 'x' },
        { id: 'h2', apiaryId: 'a1', name: 'Green', createdAt: 'x' },
      ],
      inspections: [],
      treatments: [],
      tasks: [],
    };
    const csv = hivesToCsv(data);
    expect(parseHivesCsv(csv)).toEqual([
      { apiary: 'Home Yard', hive: 'Blue', installedAt: '2026-04-01' },
      { apiary: 'Home Yard', hive: 'Green', installedAt: undefined },
    ]);
  });
});
