import { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHiveStore } from '@/lib/store';
import { colonyRisk } from '@/lib/risk';
import { infestationRisk } from '@/lib/mites';
import { daysSince } from '@/lib/dashboard';

export default function HiveTimeline() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hive = useHiveStore((s) => s.hives.find((h) => h.id === id));
  const inspections = useHiveStore((s) =>
    s.inspections.filter((i) => i.hiveId === id),
  );

  const timeline = useMemo(
    () => [...inspections].sort((a, b) => b.date.localeCompare(a.date)),
    [inspections],
  );

  const latest = timeline[0];
  const risk = latest
    ? colonyRisk({
        lastInspection: latest,
        daysSinceInspection: daysSince(latest.date, new Date()),
      })
    : undefined;

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Stack.Screen options={{ title: hive?.name ?? 'Hive' }} />
      {risk ? (
        <View style={[styles.banner, { borderLeftColor: risk.color }]}>
          <Text style={[styles.bannerLevel, { color: risk.color }]}>
            {risk.level.toUpperCase()}
          </Text>
          <Text style={styles.bannerReasons}>{risk.reasons.join(' · ')}</Text>
        </View>
      ) : null}

      <FlatList
        data={timeline}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => {
          const mite = item.miteCount ? infestationRisk(item.miteCount) : undefined;
          return (
            <View style={styles.entry}>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
              <Text style={styles.line}>
                Queen: {item.queen} · Brood: {item.brood} · Stores: {item.stores}
              </Text>
              <Text style={styles.line}>Temperament: {item.temperament}</Text>
              {mite ? <Text style={styles.mite}>{mite.message}</Text> : null}
              {item.note ? <Text style={styles.note}>“{item.note}”</Text> : null}
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No inspections logged</Text>
            <Text style={styles.emptyBody}>
              The one-tap inspection form lands in a coming update.
            </Text>
          </View>
        }
        contentContainerStyle={timeline.length === 0 && styles.emptyContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0' },
  banner: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fffdf7',
    borderLeftWidth: 6,
  },
  bannerLevel: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  bannerReasons: { fontSize: 15, color: '#44403c', marginTop: 4 },
  entry: {
    backgroundColor: '#fffdf7',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    gap: 3,
  },
  date: { fontSize: 16, fontWeight: '700', color: '#1c1917' },
  line: { fontSize: 14, color: '#44403c' },
  mite: { fontSize: 13, color: '#b45309', marginTop: 4 },
  note: { fontSize: 14, color: '#57534e', fontStyle: 'italic', marginTop: 4 },
  empty: { alignItems: 'center', paddingHorizontal: 32, gap: 8 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#44403c' },
  emptyBody: { fontSize: 15, color: '#78716c', textAlign: 'center' },
});
