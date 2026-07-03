import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { Option } from '@/lib/inspectionOptions';

interface Props<T extends string> {
  label: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Big-target segmented picker for glove-friendly field entry. */
export function SegmentedField<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((opt) => {
          const on = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
              accessibilityLabel={`${label}: ${opt.label}`}
              style={({ pressed }) => [
                styles.cell,
                on && styles.cellOn,
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={[styles.cellText, on && styles.cellTextOn]}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  label: { fontSize: 15, fontWeight: '700', color: '#57534e' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell: {
    minHeight: 56,
    minWidth: 92,
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#e7e0d3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellOn: { backgroundColor: '#b45309', borderColor: '#b45309' },
  cellText: { fontSize: 16, fontWeight: '600', color: '#57534e' },
  cellTextOn: { color: '#fff' },
});
