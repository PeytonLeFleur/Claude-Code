import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { DashboardCard } from '@/lib/dashboard';

interface Props {
  card: DashboardCard;
  onPress?: () => void;
}

/** Glove-friendly colony card: big tap target, colour = worst risk signal. */
export function HiveCard({ card, onPress }: Props) {
  const { hive, apiaryName, risk, daysSinceInspection } = card;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${hive.name}, ${risk.level}. ${risk.reasons.join(', ')}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.stripe, { backgroundColor: risk.color }]} />
      <View style={styles.body}>
        <Text style={styles.title}>{hive.name}</Text>
        {apiaryName ? <Text style={styles.subtitle}>{apiaryName}</Text> : null}
        <Text style={[styles.reason, { color: risk.color }]}>
          {risk.reasons[0]}
        </Text>
        <Text style={styles.meta}>
          {daysSinceInspection === undefined
            ? 'No inspections yet'
            : `Last inspected ${daysSinceInspection}d ago`}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#fffdf7',
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    minHeight: 96,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: { opacity: 0.85 },
  stripe: { width: 10 },
  body: { flex: 1, padding: 16, gap: 2 },
  title: { fontSize: 20, fontWeight: '700', color: '#1c1917' },
  subtitle: { fontSize: 14, color: '#78716c' },
  reason: { fontSize: 15, fontWeight: '600', marginTop: 4 },
  meta: { fontSize: 13, color: '#a8a29e' },
});
