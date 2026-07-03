import { canAddHive, hivesRemaining, FREE_HIVE_LIMIT } from '../lib/entitlements';

describe('canAddHive', () => {
  it('allows free users under the limit', () => {
    expect(canAddHive(0, false)).toBe(true);
    expect(canAddHive(FREE_HIVE_LIMIT - 1, false)).toBe(true);
  });

  it('blocks free users at the limit', () => {
    expect(canAddHive(FREE_HIVE_LIMIT, false)).toBe(false);
    expect(canAddHive(FREE_HIVE_LIMIT + 5, false)).toBe(false);
  });

  it('never blocks Pro', () => {
    expect(canAddHive(999, true)).toBe(true);
  });
});

describe('hivesRemaining', () => {
  it('counts down for free users and floors at zero', () => {
    expect(hivesRemaining(0, false)).toBe(FREE_HIVE_LIMIT);
    expect(hivesRemaining(FREE_HIVE_LIMIT + 1, false)).toBe(0);
  });
  it('is Infinity for Pro', () => {
    expect(hivesRemaining(10, true)).toBe(Infinity);
  });
});
