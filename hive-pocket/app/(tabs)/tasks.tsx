import { useMemo } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHiveStore } from '@/lib/store';

export default function TasksScreen() {
  const tasks = useHiveStore((s) => s.tasks);
  const hives = useHiveStore((s) => s.hives);
  const toggleTask = useHiveStore((s) => s.toggleTask);

  const hiveName = useMemo(
    () => new Map(hives.map((h) => [h.id, h.name])),
    [hives],
  );

  const sorted = useMemo(
    () =>
      [...tasks].sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return a.dueAt.localeCompare(b.dueAt);
      }),
    [tasks],
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.h1}>Next visit</Text>
        <Text style={styles.sub}>Mite checks, treatments, and follow-ups</Text>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleTask(item.id)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: item.done }}
            style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}
          >
            <View style={[styles.check, item.done && styles.checked]}>
              {item.done ? <Text style={styles.checkMark}>✓</Text> : null}
            </View>
            <View style={styles.rowBody}>
              <Text style={[styles.rowTitle, item.done && styles.doneText]}>
                {item.title}
              </Text>
              <Text style={styles.rowMeta}>
                {hiveName.get(item.hiveId) ?? 'Hive'} · due{' '}
                {new Date(item.dueAt).toLocaleDateString()}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptyBody}>
              Reminders appear here after inspections and treatments.
            </Text>
          </View>
        }
        contentContainerStyle={sorted.length === 0 && styles.emptyContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0' },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  h1: { fontSize: 32, fontWeight: '800', color: '#1c1917' },
  sub: { fontSize: 14, color: '#78716c', marginTop: 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#fffdf7',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 14,
    minHeight: 72,
  },
  check: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#b45309',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: '#b45309' },
  checkMark: { color: '#fff', fontSize: 18, fontWeight: '800' },
  rowBody: { flex: 1 },
  rowTitle: { fontSize: 17, fontWeight: '600', color: '#1c1917' },
  doneText: { textDecorationLine: 'line-through', color: '#a8a29e' },
  rowMeta: { fontSize: 13, color: '#78716c', marginTop: 2 },
  empty: { alignItems: 'center', paddingHorizontal: 32, gap: 8 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#44403c' },
  emptyBody: { fontSize: 15, color: '#78716c', textAlign: 'center' },
});
