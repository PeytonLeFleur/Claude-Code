// Native RevenueCat paywall. From the titan subscriptions boilerplate.
// Only shows if the user lacks the entitlement.
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

export async function gatePro() {
  const result = await RevenueCatUI.presentPaywallIfNeeded({
    requiredEntitlementIdentifier: 'pro',
  });
  return (
    result === PAYWALL_RESULT.PURCHASED ||
    result === PAYWALL_RESULT.RESTORED
  );
}
