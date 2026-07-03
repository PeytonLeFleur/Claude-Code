// CSV export — data portability is a core promise (see project CLAUDE.md), so this
// lives in the free core, not behind the paywall. Pure and unit-tested.
import type { HiveData } from './types';

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = String(value);
  // Quote if the cell contains a comma, quote, or newline.
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv(headers: string[], rows: unknown[][]): string {
  const head = headers.map(escapeCell).join(',');
  const body = rows.map((r) => r.map(escapeCell).join(',')).join('\n');
  return body ? `${head}\n${body}` : head;
}

const INSPECTION_HEADERS = [
  'apiary',
  'hive',
  'date',
  'queen',
  'brood',
  'temperament',
  'stores',
  'mites_per_100_bees',
  'note',
];

/** One row per inspection, joined to its hive and apiary names. */
export function inspectionsToCsv(data: HiveData): string {
  const hiveById = new Map(data.hives.map((h) => [h.id, h]));
  const apiaryById = new Map(data.apiaries.map((a) => [a.id, a]));

  const rows = [...data.inspections]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((insp) => {
      const hive = hiveById.get(insp.hiveId);
      const apiary = hive ? apiaryById.get(hive.apiaryId) : undefined;
      const per100 =
        insp.miteCount && insp.miteCount.bees
          ? (insp.miteCount.mites / insp.miteCount.bees) * 100
          : '';
      return [
        apiary?.name ?? '',
        hive?.name ?? '',
        insp.date,
        insp.queen,
        insp.brood,
        insp.temperament,
        insp.stores,
        per100 === '' ? '' : Math.round(Number(per100) * 10) / 10,
        insp.note ?? '',
      ];
    });

  return toCsv(INSPECTION_HEADERS, rows);
}
