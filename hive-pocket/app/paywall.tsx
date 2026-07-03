import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { gatePro } from '@/lib/paywall';

// Feature list mirrors the HivePocket hobby tier. The native RevenueCat paywall
// (lib/paywall) is the real purchase surface; this screen frames the value and
// launches it. MONEY PATH — not wired to real offerings until reviewed.
const PRO_FEATURES = [
  'Unlimited hives and yards',
  'Treatment & mite-check reminders',
  'Photo timeline per hive',
  'Cloud backup',
  'CSV / PDF export stays free — always',
];

export default function Paywall() {
  const router = useRouter();

  const onSubscribe = async () => {
    if (Platform.OS === 'web') return;
    const ok = await gatePro();
    if (ok) router.back();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.h1}>HivePocket Pro</Text>
      <Text style={styles.price}>$6.99/mo · $59/yr</Text>
      <View style={styles.features}>
        {PRO_FEATURES.map((f) => (
          <Text key={f} style={styles.feature}>
            ✓ {f}
          </Text>
        ))}
      </View>

      <Pressable
        onPress={onSubscribe}
        accessibilityRole="button"
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.ctaText}>
          {Platform.OS === 'web' ? 'Available in the app' : 'Start free trial'}
        </Text>
      </Pressable>

      <Text style={styles.fine}>
        Your data is always yours — export to CSV or PDF any time, free.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf7f0', padding: 24, gap: 12 },
  h1: { fontSize: 30, fontWeight: '800', color: '#1c1917', marginTop: 12 },
  price: { fontSize: 18, color: '#b45309', fontWeight: '700' },
  features: { marginTop: 12, gap: 10 },
  feature: { fontSize: 17, color: '#292524' },
  cta: {
    marginTop: 'auto',
    backgroundColor: '#b45309',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  fine: { fontSize: 13, color: '#78716c', textAlign: 'center' },
});
