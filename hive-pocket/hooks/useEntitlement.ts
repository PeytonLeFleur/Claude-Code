// Reactive entitlement hook. From the titan subscriptions boilerplate.
import { useEffect, useState } from 'react';
import Purchases, { CustomerInfo } from 'react-native-purchases';

export function useEntitlement(id = 'pro') {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Purchases.getCustomerInfo()
      .then((info) => mounted && setActive(!!info.entitlements.active[id]))
      .finally(() => mounted && setLoading(false));

    const listener = (info: CustomerInfo) =>
      setActive(!!info.entitlements.active[id]);
    Purchases.addCustomerInfoUpdateListener(listener);

    return () => {
      mounted = false;
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
  }, [id]);

  return { active, loading };
}
