// Web stub for the RevenueCat purchase layer. In-app purchases are native-only;
// on web (used here for the export smoke build) these are inert no-ops so the
// bundle never pulls the native SDK. Real purchasing happens in a dev build.
import type { CustomerInfo, PurchasesPackage } from 'react-native-purchases';

export function configurePurchases(_supabaseUserId?: string) {
  console.warn('[purchases] In-app purchases are unavailable on web.');
}

export async function getCurrentOffering() {
  return null;
}

export async function buy(_pkg: PurchasesPackage): Promise<CustomerInfo> {
  throw new Error('Purchases are only available in the native app.');
}

export async function restore(): Promise<CustomerInfo> {
  throw new Error('Restore is only available in the native app.');
}

export const hasEntitlement = (_info: CustomerInfo, _id = 'pro') => false;
