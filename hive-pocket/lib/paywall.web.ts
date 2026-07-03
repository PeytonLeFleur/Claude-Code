// Web stub for the native RevenueCat paywall. No purchase UI on web.
export async function gatePro() {
  console.warn('[paywall] The paywall is only available in the native app.');
  return false;
}
