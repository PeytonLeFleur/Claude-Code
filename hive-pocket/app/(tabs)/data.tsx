import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useHiveStore } from '@/lib/store';
import { hivesToCsv, inspectionsToCsv, parseHivesCsv } from '@/lib/csv';
import { buildBackup } from '@/lib/backup';
import { pushBackup } from '@/lib/backupSync';

// Data portability is a core promise (project CLAUDE.md), so this lives in the
// free tier. Export = copy CSV to clipboard (works on web + native without a
// native file picker); a native file/share export is a later on-device iteration.
export default function DataScreen() {
  const snapshot = useHiveStore((s) => s.snapshot);
  const importHives = useHiveStore((s) => s.importHives);
  const hives = useHiveStore((s) => s.hives);
  const inspections = useHiveStore((s) => s.inspections);

  const [status, setStatus] = useState<string | null>(null);
  const [paste, setPaste] = useState('');

  const data = useMemo(() => snapshot(), [snapshot, hives, inspections]);

  const copy = async (label: string, csv: string) => {
    await Clipboard.setStringAsync(csv);
    setStatus(`Copied ${label} to clipboard.`);
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setPaste(text);
    setStatus(text ? 'Pasted from clipboard.' : 'Clipboard was empty.');
  };

  const backupNow = async () => {
    try {
      await pushBackup('me', buildBackup(snapshot(), new Date().toISOString()));
      setStatus('Backed up to cloud.');
    } catch (e) {
      // Expected until Supabase + sign-in are configured — flagged, not broken.
      setStatus(e instanceof Error ? e.message : 'Cloud backup is not available yet.');
    }
  };

  const runImport = () => {
    const rows = parseHivesCsv(paste);
    if (rows.length === 0) {
      setStatus('No hives found. Need a header row with a "hive" column.');
      return;
    }
    const n = importHives(rows);
    setStatus(`Imported ${n} ${n === 1 ? 'hive' : 'hives'}.`);
    setPaste('');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={styles.h1}>Data</Text>
        <Text style={styles.sub}>Your records are yours — export is free, forever.</Text>

        <Text style={styles.section}>Export</Text>
        <Pressable
          onPress={() => copy('hives CSV', hivesToCsv(data))}
          accessibilityRole="button"
          style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        >
          <Text style={styles.btnText}>Copy hives CSV ({hives.length})</Text>
        </Pressable>
        <Pressable
          onPress={() => copy('inspections CSV', inspectionsToCsv(data))}
          accessibilityRole="button"
          style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
        >
          <Text style={styles.btnText}>Copy inspections CSV ({inspections.length})</Text>
        </Pressable>

        <Text style={styles.section}>Cloud backup</Text>
        <Text style={styles.help}>
          Local-first: your data is already saved on this device. Cloud backup is a safety net
          that turns on after sign-in on a configured build.
        </Text>
        <Pressable
          onPress={backupNow}
          accessibilityRole="button"
          style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
        >
          <Text style={styles.btnGhostText}>Back up now</Text>
        </Pressable>

        <Text style={styles.section}>Import hives</Text>
        <Text style={styles.help}>
          Paste CSV with columns: apiary, hive, installed_at (only “hive” is required).
        </Text>
        <TextInput
          value={paste}
          onChangeText={setPaste}
          placeholder={'apiary,hive,installed_at\nHome Yard,Blue,2026-04-01'}
          placeholderTextColor="#a8a29e"
          style={styles.textarea}
          multiline
          textAlignVertical="top"
        />
        <View style={styles.row}>
          <Pressable
            onPress={pasteFromClipboard}
            accessibilityRole="button"
            style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
          >
            <Text style={styles.btnGhostText}>Paste</Text>
          </Pressable>
          <Pressable
            onPress={runImport}
            accessibilityRole="button"
            style={({ pressed }) => [styles.btn, styles.grow, pressed && styles.pressed]}
          >
            <Text style={styles.btnText}>Import</Text>
          </Pressable>
        </View>

        {status ? <Text style={styles.status}>{status}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0' },
  body: { padding: 20, gap: 10 },
  h1: { fontSize: 32, fontWeight: '800', color: '#1c1917' },
  sub: { fontSize: 14, color: '#78716c' },
  section: { fontSize: 18, fontWeight: '700', color: '#44403c', marginTop: 18 },
  help: { fontSize: 13, color: '#78716c' },
  btn: {
    backgroundColor: '#b45309',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  grow: { flex: 1 },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  btnGhost: {
    borderWidth: 1,
    borderColor: '#b45309',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  btnGhostText: { color: '#b45309', fontSize: 17, fontWeight: '700' },
  pressed: { opacity: 0.85 },
  textarea: {
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#e7e0d3',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1c1917',
    minHeight: 120,
  },
  row: { flexDirection: 'row', gap: 10 },
  status: { fontSize: 14, color: '#166534', fontWeight: '600', marginTop: 8 },
});
