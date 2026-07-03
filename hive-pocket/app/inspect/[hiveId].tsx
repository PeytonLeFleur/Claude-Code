import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHiveStore } from '@/lib/store';
import { colonyRisk } from '@/lib/risk';
import { SegmentedField } from '@/components/SegmentedField';
import {
  QUEEN_OPTIONS,
  BROOD_OPTIONS,
  TEMPERAMENT_OPTIONS,
  STORES_OPTIONS,
  INSPECTION_DEFAULTS,
} from '@/lib/inspectionOptions';
import type { QueenStatus, BroodStatus, Temperament, Stores } from '@/lib/types';

// One-tap inspection: opens on healthy defaults, so a clean colony is a single
// "Save" tap. Writes straight to the offline store (guardrail #1: save-first).
export default function Inspect() {
  const { hiveId } = useLocalSearchParams<{ hiveId: string }>();
  const router = useRouter();
  const hive = useHiveStore((s) => s.hives.find((h) => h.id === hiveId));
  const addInspection = useHiveStore((s) => s.addInspection);

  const [queen, setQueen] = useState<QueenStatus>(INSPECTION_DEFAULTS.queen);
  const [brood, setBrood] = useState<BroodStatus>(INSPECTION_DEFAULTS.brood);
  const [temperament, setTemperament] = useState<Temperament>(
    INSPECTION_DEFAULTS.temperament,
  );
  const [stores, setStores] = useState<Stores>(INSPECTION_DEFAULTS.stores);
  const [note, setNote] = useState('');

  // Live preview of how this inspection colours the colony.
  const preview = useMemo(
    () =>
      colonyRisk({
        lastInspection: {
          id: 'preview',
          hiveId: hiveId ?? '',
          date: 'preview',
          queen,
          brood,
          temperament,
          stores,
        },
        daysSinceInspection: 0,
      }),
    [hiveId, queen, brood, temperament, stores],
  );

  const onSave = () => {
    if (!hiveId) return;
    addInspection({
      hiveId,
      date: new Date().toISOString(),
      queen,
      brood,
      temperament,
      stores,
      note: note.trim() || undefined,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Stack.Screen options={{ title: hive ? `Inspect ${hive.name}` : 'Inspection' }} />
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <SegmentedField label="Queen" options={QUEEN_OPTIONS} value={queen} onChange={setQueen} />
        <SegmentedField label="Brood" options={BROOD_OPTIONS} value={brood} onChange={setBrood} />
        <SegmentedField
          label="Temperament"
          options={TEMPERAMENT_OPTIONS}
          value={temperament}
          onChange={setTemperament}
        />
        <SegmentedField
          label="Stores"
          options={STORES_OPTIONS}
          value={stores}
          onChange={setStores}
        />

        <Text style={styles.label}>Note</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Anything worth remembering…"
          placeholderTextColor="#a8a29e"
          style={styles.note}
          multiline
          textAlignVertical="top"
        />

        <View style={[styles.preview, { borderLeftColor: preview.color }]}>
          <Text style={[styles.previewLevel, { color: preview.color }]}>
            {preview.level.toUpperCase()}
          </Text>
          <Text style={styles.previewReasons}>{preview.reasons.join(' · ')}</Text>
        </View>
      </ScrollView>

      <Pressable
        onPress={onSave}
        disabled={!hiveId}
        accessibilityRole="button"
        style={({ pressed }) => [styles.save, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.saveText}>Save inspection</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0' },
  body: { padding: 20, gap: 18 },
  label: { fontSize: 15, fontWeight: '700', color: '#57534e' },
  note: {
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#e7e0d3',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1c1917',
    minHeight: 88,
  },
  preview: {
    backgroundColor: '#fffdf7',
    borderRadius: 12,
    borderLeftWidth: 6,
    padding: 16,
  },
  previewLevel: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  previewReasons: { fontSize: 15, color: '#44403c', marginTop: 4 },
  save: {
    margin: 20,
    backgroundColor: '#b45309',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
