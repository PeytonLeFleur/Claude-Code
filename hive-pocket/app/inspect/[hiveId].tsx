import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useHiveStore } from '@/lib/store';
import { colonyRisk } from '@/lib/risk';
import { suggestTasksForInspection } from '@/lib/reminders';
import { mergePhotos, removePhoto, MAX_PHOTOS } from '@/lib/photos';
import { DICTATION } from '@/lib/dictation';
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
  const addTasks = useHiveStore((s) => s.addTasks);

  const [queen, setQueen] = useState<QueenStatus>(INSPECTION_DEFAULTS.queen);
  const [brood, setBrood] = useState<BroodStatus>(INSPECTION_DEFAULTS.brood);
  const [temperament, setTemperament] = useState<Temperament>(
    INSPECTION_DEFAULTS.temperament,
  );
  const [stores, setStores] = useState<Stores>(INSPECTION_DEFAULTS.stores);
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const addPhoto = async () => {
    if (photos.length >= MAX_PHOTOS) {
      setStatus(`Up to ${MAX_PHOTOS} photos per inspection.`);
      return;
    }
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      setStatus('Photo access was denied.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.7,
    });
    if (res.canceled) return;
    setPhotos((p) => mergePhotos(p, res.assets.map((a) => a.uri)));
    setStatus(null);
  };

  const onDictate = () => {
    // Honest UX: voice-to-note is an on-device feature; degrade to typing here.
    setStatus(DICTATION.reason);
  };

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
    const insp = addInspection({
      hiveId,
      date: new Date().toISOString(),
      queen,
      brood,
      temperament,
      stores,
      note: note.trim() || undefined,
      photos: photos.length ? photos : undefined,
    });
    // Auto-generate next-action reminders (deduped against open tasks).
    addTasks(suggestTasksForInspection(insp, new Date()));
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

        <View style={styles.noteHead}>
          <Text style={styles.label}>Note</Text>
          <Pressable
            onPress={onDictate}
            accessibilityRole="button"
            accessibilityLabel="Dictate note"
            style={({ pressed }) => [styles.dictate, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.dictateText}>🎤 Dictate</Text>
          </Pressable>
        </View>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Anything worth remembering…"
          placeholderTextColor="#a8a29e"
          style={styles.note}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Photos</Text>
        <View style={styles.photoRow}>
          {photos.map((uri) => (
            <Pressable
              key={uri}
              onPress={() => setPhotos((p) => removePhoto(p, uri))}
              accessibilityRole="button"
              accessibilityLabel="Remove photo"
              style={styles.thumbWrap}
            >
              <Image source={{ uri }} style={styles.thumb} />
              <View style={styles.thumbX}>
                <Text style={styles.thumbXText}>×</Text>
              </View>
            </Pressable>
          ))}
          {photos.length < MAX_PHOTOS ? (
            <Pressable
              onPress={addPhoto}
              accessibilityRole="button"
              accessibilityLabel="Add photo"
              style={({ pressed }) => [styles.addPhoto, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.addPhotoText}>＋</Text>
            </Pressable>
          ) : null}
        </View>

        {status ? <Text style={styles.status}>{status}</Text> : null}

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
  noteHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dictate: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#b45309',
    minHeight: 40,
    justifyContent: 'center',
  },
  dictateText: { color: '#b45309', fontSize: 14, fontWeight: '700' },
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
  photoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  thumbWrap: { width: 72, height: 72 },
  thumb: { width: 72, height: 72, borderRadius: 12, backgroundColor: '#e7e0d3' },
  thumbX: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1c1917',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbXText: { color: '#fff', fontSize: 16, fontWeight: '800', lineHeight: 18 },
  addPhoto: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#b45309',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: { fontSize: 32, color: '#b45309', fontWeight: '700' },
  status: { fontSize: 14, color: '#57534e', fontStyle: 'italic' },
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
