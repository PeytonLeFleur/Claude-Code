import { useState } from 'react';
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
import { suggestTasksForTreatment } from '@/lib/reminders';
import { SegmentedField } from '@/components/SegmentedField';
import { TREATMENT_OPTIONS } from '@/lib/treatmentOptions';
import type { TreatmentType } from '@/lib/types';

function toNum(s: string): number | undefined {
  const n = Number(s.trim());
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export default function LogTreatment() {
  const { hiveId } = useLocalSearchParams<{ hiveId: string }>();
  const router = useRouter();
  const hive = useHiveStore((s) => s.hives.find((h) => h.id === hiveId));
  const addTreatment = useHiveStore((s) => s.addTreatment);
  const addTasks = useHiveStore((s) => s.addTasks);

  const [type, setType] = useState<TreatmentType>('oxalic_acid');
  const [followUp, setFollowUp] = useState('7');
  const [note, setNote] = useState('');

  const onSave = () => {
    if (!hiveId) return;
    const followUpDays = toNum(followUp);
    const treatment = addTreatment({
      hiveId,
      type,
      appliedAt: new Date().toISOString(),
      followUpDays: followUpDays && followUpDays > 0 ? followUpDays : undefined,
      note: note.trim() || undefined,
    });
    // Schedule the follow-up / re-check reminder if a window was given.
    addTasks(suggestTasksForTreatment(treatment, new Date()));
    router.back();
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Stack.Screen options={{ title: hive ? `Treat ${hive.name}` : 'Log treatment' }} />
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <SegmentedField
          label="Treatment"
          options={TREATMENT_OPTIONS}
          value={type}
          onChange={setType}
        />

        <View style={styles.field}>
          <Text style={styles.label}>Follow-up in (days)</Text>
          <TextInput
            value={followUp}
            onChangeText={setFollowUp}
            placeholder="e.g. 7 — leave blank for none"
            placeholderTextColor="#a8a29e"
            style={styles.input}
            keyboardType="number-pad"
          />
          <Text style={styles.help}>
            Set the re-check / withdrawal window from the product label or your local guidance.
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Dose, conditions, anything to remember…"
            placeholderTextColor="#a8a29e"
            style={styles.note}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <Pressable
        onPress={onSave}
        disabled={!hiveId}
        accessibilityRole="button"
        style={({ pressed }) => [styles.save, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.saveText}>Save treatment</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0' },
  body: { padding: 20, gap: 18 },
  field: { gap: 8 },
  label: { fontSize: 15, fontWeight: '700', color: '#57534e' },
  help: { fontSize: 13, color: '#78716c' },
  input: {
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#e7e0d3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 20,
    color: '#1c1917',
    minHeight: 56,
  },
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
  save: {
    margin: 20,
    backgroundColor: '#b45309',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
