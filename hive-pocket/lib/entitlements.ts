// Free-tier gating. Pure and unit-tested. Pricing follows the HivePocket research:
// free up to 2 hives; Pro unlocks unlimited hives, reminders, cloud backup, photos.
//
// IMPORTANT (product guardrail): this gates HIVE COUNT only. CSV/PDF export and
// local data ownership are NEVER gated — data portability is a free promise.
export const FREE_HIVE_LIMIT = 2;

export const PRO_ENTITLEMENT_ID = 'pro';

/** Can a user with `hiveCount` hives add another? Pro is unlimited. */
export function canAddHive(hiveCount: number, isPro: boolean): boolean {
  return isPro || hiveCount < FREE_HIVE_LIMIT;
}

/** Free hives remaining before the paywall (Infinity for Pro). */
export function hivesRemaining(hiveCount: number, isPro: boolean): number {
  if (isPro) return Infinity;
  return Math.max(0, FREE_HIVE_LIMIT - hiveCount);
}
