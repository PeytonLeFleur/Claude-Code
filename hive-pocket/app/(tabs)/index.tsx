import { useMemo } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHiveStore } from '@/lib/store';
import { buildDashboard, sortByUrgency } from '@/lib/dashboard';
import { HiveCard } from '@/components/HiveCard';

export default function ApiaryDashboard() {
  const router = useRouter();
  const apiaries = useHiveStore((s) => s.apiaries);
  const hives = useHiveStore((s) => s.hives);
  const inspections = useHiveStore((s) => s.inspections);
  const treatments = useHiveStore((s) => s.treatments);
  const tasks = useHiveStore((s) => s.tasks);

  const cards = useMemo(
    () =>
      sortByUrgency(
        buildDashboard({ apiaries, hives, inspections, treatments, tasks }, new Date()),
      ),
    [apiaries, hives, inspections, treatments, tasks],
  );

  const newHive = () => router.push('/hive/new');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.h1}>Apiary</Text>
        <Text style={styles.sub}>
          {hives.length} {hives.length === 1 ? 'hive' : 'hives'} · save-first, works offline
        </Text>
      </View>

      <FlatList
        data={cards}
        keyExtractor={(c) => c.hive.id}
        renderItem={({ item }) => (
          <HiveCard card={item} onPress={() => router.push(`/hive/${item.hive.id}`)} />
        )}
        ListEmptyComponent={
          <Pressable onPress={newHive} accessibilityRole="button" style={styles.empty}>
            <Text style={styles.emptyTitle}>No hives yet</Text>
            <Text style={styles.emptyBody}>
              Tap “+ Add hive” to start logging inspections.
            </Text>
          </Pressable>
        }
        contentContainerStyle={cards.length === 0 && styles.emptyContainer}
      />

      <Pressable
        onPress={newHive}
        accessibilityRole="button"
        style={({ pressed }) => [styles.fab, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.fabText}>+ Add hive</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0' },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  h1: { fontSize: 32, fontWeight: '800', color: '#1c1917' },
  sub: { fontSize: 14, color: '#78716c', marginTop: 2 },
  empty: { alignItems: 'center', paddingHorizontal: 32, gap: 8 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#44403c' },
  emptyBody: { fontSize: 15, color: '#78716c', textAlign: 'center' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    backgroundColor: '#b45309',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 999,
    elevation: 4,
  },
  fabText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
