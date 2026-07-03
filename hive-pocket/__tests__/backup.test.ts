import { buildBackup, readBackup, BACKUP_VERSION } from '../lib/backup';
import type { HiveData } from '../lib/types';

const data: HiveData = {
  apiaries: [{ id: 'a1', name: 'Home', createdAt: 'x' }],
  hives: [],
  inspections: [],
  treatments: [],
  tasks: [],
};

describe('buildBackup', () => {
  it('stamps version and savedAt around the snapshot', () => {
    const env = buildBackup(data, '2026-06-01T00:00:00Z');
    expect(env.version).toBe(BACKUP_VERSION);
    expect(env.savedAt).toBe('2026-06-01T00:00:00Z');
    expect(env.data).toBe(data);
  });
});

describe('readBackup', () => {
  it('round-trips a built backup', () => {
    const env = buildBackup(data, '2026-06-01T00:00:00Z');
    const res = readBackup(env);
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.envelope.data.apiaries).toHaveLength(1);
  });

  it('rejects non-objects and missing version', () => {
    expect(readBackup(null).ok).toBe(false);
    expect(readBackup('nope').ok).toBe(false);
    expect(readBackup({ data }).ok).toBe(false);
  });

  it('rejects a newer-version backup', () => {
    const res = readBackup({ version: BACKUP_VERSION + 1, savedAt: 'x', data });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toMatch(/newer app version/i);
  });

  it('rejects incomplete data', () => {
    const res = readBackup({ version: BACKUP_VERSION, savedAt: 'x', data: { apiaries: [] } });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toMatch(/incomplete/i);
  });
});
