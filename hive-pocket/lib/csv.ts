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

/**
 * Minimal RFC-4180-ish CSV parser: handles quoted cells, "" escapes, commas and
 * newlines inside quotes, and CRLF. Returns a matrix of string cells. Trailing
 * blank lines are dropped.
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (ch === '\r') {
      // ignore — handled by the following \n
    } else {
      cell += ch;
    }
  }
  // Flush the final cell/row if there's anything pending.
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  // Drop fully-empty rows (e.g. a trailing newline).
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

export interface ParsedHiveRow {
  apiary: string;
  hive: string;
  installedAt?: string;
}

/**
 * Parse a pasted CSV of hives into rows ready for bulk import. Requires a header
 * with (case-insensitive) `hive`; `apiary` and `installed_at`/`installedAt` are
 * optional. Rows without a hive name are skipped. Never throws on malformed input.
 */
export function parseHivesCsv(text: string): ParsedHiveRow[] {
  const matrix = parseCsv(text);
  if (matrix.length < 2) return [];

  const header = matrix[0].map((h) => h.trim().toLowerCase());
  const hiveIdx = header.indexOf('hive');
  if (hiveIdx === -1) return [];
  const apiaryIdx = header.indexOf('apiary');
  const installedIdx = header.findIndex((h) =>
    ['installed_at', 'installedat', 'installed'].includes(h),
  );

  const out: ParsedHiveRow[] = [];
  for (let r = 1; r < matrix.length; r += 1) {
    const cells = matrix[r];
    const hive = (cells[hiveIdx] ?? '').trim();
    if (!hive) continue;
    const apiary = apiaryIdx === -1 ? '' : (cells[apiaryIdx] ?? '').trim();
    const installedRaw = installedIdx === -1 ? '' : (cells[installedIdx] ?? '').trim();
    out.push({
      apiary: apiary || 'Imported',
      hive,
      installedAt: installedRaw || undefined,
    });
  }
  return out;
}

const HIVE_HEADERS = ['apiary', 'hive', 'installed_at'];

/** One row per hive, joined to its apiary name — round-trips with parseHivesCsv. */
export function hivesToCsv(data: HiveData): string {
  const apiaryById = new Map(data.apiaries.map((a) => [a.id, a]));
  const rows = data.hives.map((h) => [
    apiaryById.get(h.apiaryId)?.name ?? '',
    h.name,
    h.installedAt ?? '',
  ]);
  return toCsv(HIVE_HEADERS, rows);
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
