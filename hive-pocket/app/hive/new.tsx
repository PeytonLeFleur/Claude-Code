import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHiveStore } from '@/lib/store';

// Glove-friendly creation flow: name the hive, pick or create a yard, optional
// install date. Pure store writes — saves offline immediately (guardrail #1).
export default function NewHive() {
  const router = useRouter();
  const apiaries = useHiveStore((s) => s.apiaries);
  const addApiary = useHiveStore((s) => s.addApiary);
  const addHive = useHiveStore((s) => s.addHive);

  const [name, setName] = useState('');
  const [installedAt, setInstalledAt] = useState('');
  const [apiaryId, setApiaryId] = useState<string | null>(apiaries[0]?.id ?? null);
  const [newApiary, setNewApiary] = useState('');

  const trimmedName = name.trim();
  const canSave = trimmedName.length > 0 && (apiaryId !== null || newApiary.trim().length > 0);

  const onSave = () => {
    if (!canSave) return;
    let targetApiaryId = apiaryId;
    if (newApiary.trim().length > 0) {
      targetApiaryId = addApiary(newApiary.trim()).id;
    }
    if (!targetApiaryId) return;
    const installed = installedAt.trim();
    addHive(targetApiaryId, trimmedName, installed || undefined);
    router.back();
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Hive name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Blue Langstroth"
          placeholderTextColor="#a8a29e"
          style={styles.input}
          autoFocus
          returnKeyType="next"
        />

        <Text style={styles.label}>Yard</Text>
        <View style={styles.chips}>
          {apiaries.map((a) => {
            const selected = apiaryId === a.id && newApiary.trim().length === 0;
            return (
              <Pressable
                key={a.id}
                onPress={() => {
                  setApiaryId(a.id);
                  setNewApiary('');
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                style={[styles.chip, selected && styles.chipOn]}
              >
                <Text style={[styles.chipText, selected && styles.chipTextOn]}>{a.name}</Text>
              </Pressable>
            );
          })}
        </View>
        <TextInput
          value={newApiary}
          onChangeText={(t) => {
            setNewApiary(t);
            if (t.trim().length > 0) setApiaryId(null);
          }}
          placeholder={apiaries.length ? '＋ or new yard name' : 'New yard name (e.g. Home Yard)'}
          placeholderTextColor="#a8a29e"
          style={styles.input}
        />

        <Text style={styles.label}>Installed (optional)</Text>
        <TextInput
          value={installedAt}
          onChangeText={setInstalledAt}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#a8a29e"
          style={styles.input}
          keyboardType="numbers-and-punctuation"
        />
      </ScrollView>

      <Pressable
        onPress={onSave}
        disabled={!canSave}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.save,
          !canSave && styles.saveOff,
          pressed && canSave && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.saveText}>Save hive</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0' },
  body: { padding: 20, gap: 8 },
  label: { fontSize: 15, fontWeight: '700', color: '#57534e', marginTop: 12 },
  input: {
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#e7e0d3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#1c1917',
    minHeight: 56,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#e7e0d3',
    minHeight: 44,
    justifyContent: 'center',
  },
  chipOn: { backgroundColor: '#b45309', borderColor: '#b45309' },
  chipText: { fontSize: 16, color: '#57534e' },
  chipTextOn: { color: '#fff', fontWeight: '700' },
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
