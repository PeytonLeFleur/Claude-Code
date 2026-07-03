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
import { infestationRisk } from '@/lib/mites';
import { suggestTasksForInspection } from '@/lib/reminders';
import { riskColor, type ColonyRiskLevel } from '@/lib/risk';
import { SegmentedField } from '@/components/SegmentedField';
import { MITE_METHOD_OPTIONS } from '@/lib/inspectionOptions';
import type { MiteMethod, MiteCount } from '@/lib/types';

// Maps mite risk bands onto the shared colony-risk palette.
const LEVEL_COLOR: Record<string, ColonyRiskLevel> = {
  high: 'urgent',
  moderate: 'watch',
  low: 'ok',
  unknown: 'unknown',
};

function toNum(s: string): number | undefined {
  const n = Number(s.trim());
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export default function MiteCalculator() {
  const { hiveId } = useLocalSearchParams<{ hiveId: string }>();
  const router = useRouter();
  const hive = useHiveStore((s) => s.hives.find((h) => h.id === hiveId));
  const addInspection = useHiveStore((s) => s.addInspection);
  const addTasks = useHiveStore((s) => s.addTasks);

  const [method, setMethod] = useState<MiteMethod>('alcohol_wash');
  const [mites, setMites] = useState('');
  const [bees, setBees] = useState('300');
  const [days, setDays] = useState('3');

  const isBoard = method === 'sticky_board';

  const count: MiteCount | undefined = useMemo(() => {
    const m = toNum(mites);
    if (m === undefined) return undefined;
    if (isBoard) {
      const d = toNum(days);
      if (!d) return undefined;
      return { method, mites: m, days: d, date: 'preview' };
    }
    const b = toNum(bees);
    if (!b) return undefined;
    return { method, mites: m, bees: b, date: 'preview' };
  }, [method, mites, bees, days, isBoard]);

  const result = count ? infestationRisk(count) : undefined;

  const onSave = () => {
    if (!hiveId || !count) return;
    // Record as a lightweight "mite check" inspection so it feeds the risk
    // dashboard and auto-reminders. Non-mite fields are left unknown.
    const insp = addInspection({
      hiveId,
      date: new Date().toISOString(),
      queen: 'unknown',
      brood: 'unknown',
      temperament: 'normal',
      stores: 'unknown',
      note: 'Mite check',
      miteCount: { ...count, date: new Date().toISOString() },
    });
    addTasks(suggestTasksForInspection(insp, new Date()));
    router.back();
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Stack.Screen options={{ title: hive ? `Mites — ${hive.name}` : 'Mite check' }} />
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <SegmentedField
          label="Method"
          options={MITE_METHOD_OPTIONS}
          value={method}
          onChange={setMethod}
        />

        <View style={styles.field}>
          <Text style={styles.label}>Mites counted</Text>
          <TextInput
            value={mites}
            onChangeText={setMites}
            placeholder="e.g. 9"
            placeholderTextColor="#a8a29e"
            style={styles.input}
            keyboardType="number-pad"
          />
        </View>

        {isBoard ? (
          <View style={styles.field}>
            <Text style={styles.label}>Days board was in</Text>
            <TextInput
              value={days}
              onChangeText={setDays}
              placeholder="e.g. 3"
              placeholderTextColor="#a8a29e"
              style={styles.input}
              keyboardType="number-pad"
            />
          </View>
        ) : (
          <View style={styles.field}>
            <Text style={styles.label}>Bees sampled</Text>
            <TextInput
              value={bees}
              onChangeText={setBees}
              placeholder="≈300 (½ cup)"
              placeholderTextColor="#a8a29e"
              style={styles.input}
              keyboardType="number-pad"
            />
          </View>
        )}

        <View
          style={[
            styles.result,
            { borderLeftColor: result ? riskColor(LEVEL_COLOR[result.level]) : '#e7e0d3' },
          ]}
        >
          {result ? (
            <>
              <Text
                style={[styles.resultLevel, { color: riskColor(LEVEL_COLOR[result.level]) }]}
              >
                {result.level.toUpperCase()}
              </Text>
              <Text style={styles.resultMsg}>{result.message}</Text>
            </>
          ) : (
            <Text style={styles.resultMsg}>Enter a count to see the result.</Text>
          )}
        </View>
      </ScrollView>

      <Pressable
        onPress={onSave}
        disabled={!count || !hiveId}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.save,
          (!count || !hiveId) && styles.saveOff,
          pressed && count && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.saveText}>Save mite check</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0' },
  body: { padding: 20, gap: 18 },
  field: { gap: 8 },
  label: { fontSize: 15, fontWeight: '700', color: '#57534e' },
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
  result: {
    backgroundColor: '#fffdf7',
    borderRadius: 12,
    borderLeftWidth: 6,
    padding: 16,
  },
  resultLevel: { fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  resultMsg: { fontSize: 15, color: '#44403c', marginTop: 4 },
  save: {
    margin: 20,
    backgroundColor: '#b45309',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
  },
  saveOff: { backgroundColor: '#d6d3d1' },
  saveText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
