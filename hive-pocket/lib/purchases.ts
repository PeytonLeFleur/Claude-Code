// RevenueCat is the source of truth for entitlements. From the titan subscriptions
// boilerplate. MONEY PATH — see project CLAUDE.md: real keys come from `eas env`,
// never committed, and the paywall never ships without an explicit human "go".
import { Platform } from 'react-native';
import Purchases, {
  LOG_LEVEL,
  PurchasesPackage,
  CustomerInfo,
} from 'react-native-purchases';

const KEYS = {
  ios: process.env.EXPO_PUBLIC_RC_IOS_KEY!,
  android: process.env.EXPO_PUBLIC_RC_ANDROID_KEY!,
};

// Pass the Supabase user id so RevenueCat identity == your user.
// Makes the webhook sync trivial and keeps entitlements consistent
// across reinstalls and devices.
export function configurePurchases(supabaseUserId?: string) {
  Purchases.setLogLevel(LOG_LEVEL.WARN);
  Purchases.configure({
    apiKey: Platform.OS === 'ios' ? KEYS.ios : KEYS.android,
    appUserID: supabaseUserId,
  });
}

export async function getCurrentOffering() {
  const offerings = await Purchases.getOfferings();
  return offerings.current; // packages live here
}

export async function buy(pkg: PurchasesPackage): Promise<CustomerInfo> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

export async function restore(): Promise<CustomerInfo> {
  return Purchases.restorePurchases();
}

export const hasEntitlement = (info: CustomerInfo, id = 'pro') =>
  typeof info.entitlements.active[id] !== 'undefined';
