import { useEffect } from "react";

export default function useSessionStorageForm<T>(key: string, methods: any) {
  const { watch, reset } = methods;

  useEffect(() => {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        reset(data);
      } catch {}
    }
  }, [key, reset]);

  useEffect(() => {
    const subscription = (watch as any)((value: T) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [key, watch]);
}
