import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { configurePurchases } from '@/lib/purchases';

export default function RootLayout() {
  useEffect(() => {
    // Configure RevenueCat once. On web this is a no-op stub. On native without
    // keys configured it is a controlled failure, so guard it. A later iteration
    // passes the resolved Supabase user id here for identity == user.
    try {
      configurePurchases();
    } catch (e) {
      console.warn('[purchases] not configured yet:', e);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="hive/[id]" options={{ title: 'Hive' }} />
        <Stack.Screen name="paywall" options={{ title: 'HivePocket Pro', presentation: 'modal' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
