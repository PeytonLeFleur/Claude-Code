// Cloud-backup NETWORK layer. MIGRATION/MONEY lane (see project CLAUDE.md):
// SCAFFOLD-AND-FLAGGED. It targets the Supabase `backups` table (RLS own-row) but
// stays inert until Supabase + sign-in are configured in a dev build, and is
// never wired to real credentials here. Kept separate from ./backup so the pure
// envelope logic stays unit-testable without react-native / Supabase imports.
import { supabase } from './supabase';
import {
  readBackup,
  isBackupConfigured,
  BACKUP_NOT_CONFIGURED,
  type BackupEnvelope,
} from './backup';

/** Push the local snapshot to the signed-in user's backup row. */
export async function pushBackup(userId: string, envelope: BackupEnvelope): Promise<void> {
  if (!isBackupConfigured()) throw new Error(BACKUP_NOT_CONFIGURED);
  const { error } = await supabase.from('backups').upsert({
    user_id: userId,
    version: envelope.version,
    saved_at: envelope.savedAt,
    payload: envelope.data,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

/** Pull the signed-in user's most recent backup. */
export async function pullBackup(userId: string): Promise<BackupEnvelope> {
  if (!isBackupConfigured()) throw new Error(BACKUP_NOT_CONFIGURED);
  const { data, error } = await supabase
    .from('backups')
    .select('version, saved_at, payload')
    .eq('user_id', userId)
    .single();
  if (error) throw new Error(error.message);
  const result = readBackup({ version: data.version, savedAt: data.saved_at, data: data.payload });
  if (!result.ok) throw new Error(result.reason);
  return result.envelope;
}
