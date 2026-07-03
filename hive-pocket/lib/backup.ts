// Cloud backup — PURE envelope format + validation (unit-tested). The network
// push/pull lives in ./backupSync so this module stays free of react-native /
// Supabase imports and is testable under ts-jest. MIGRATION/MONEY lane: the sync
// layer is SCAFFOLD-AND-FLAGGED, never wired to real credentials here.
// Local-first is the source of truth; cloud is a backup, never a gate.
import type { HiveData } from './types';

export const BACKUP_VERSION = 1;

export interface BackupEnvelope {
  version: number;
  savedAt: string; // ISO
  data: HiveData;
}

export type RestoreResult =
  | { ok: true; envelope: BackupEnvelope }
  | { ok: false; reason: string };

/** Wrap a snapshot in a versioned, timestamped envelope (pure — pass the time in). */
export function buildBackup(data: HiveData, savedAtIso: string): BackupEnvelope {
  return { version: BACKUP_VERSION, savedAt: savedAtIso, data };
}

const KEYS: (keyof HiveData)[] = ['apiaries', 'hives', 'inspections', 'treatments', 'tasks'];

/** Validate an untrusted envelope (e.g. from a restore) before applying it. */
export function readBackup(raw: unknown): RestoreResult {
  if (typeof raw !== 'object' || raw === null) {
    return { ok: false, reason: 'Not a backup.' };
  }
  const env = raw as Partial<BackupEnvelope>;
  if (typeof env.version !== 'number') return { ok: false, reason: 'Missing version.' };
  if (env.version > BACKUP_VERSION) {
    return { ok: false, reason: 'Backup is from a newer app version.' };
  }
  const data = env.data as Partial<HiveData> | undefined;
  if (!data || KEYS.some((k) => !Array.isArray(data[k]))) {
    return { ok: false, reason: 'Backup data is incomplete.' };
  }
  return { ok: true, envelope: { version: env.version, savedAt: env.savedAt ?? '', data: data as HiveData } };
}

/** True only when Supabase is configured — cloud backup is off otherwise. */
export function isBackupConfigured(): boolean {
  return Boolean(process.env.EXPO_PUBLIC_SUPABASE_URL && process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
}

export const BACKUP_NOT_CONFIGURED =
  'Cloud backup turns on after you sign in on a configured build. Your data is ' +
  'already saved on this device — export CSV any time.';
