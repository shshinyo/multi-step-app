import { useEffect } from "react";

export default function useSaveStepToSessionStorage(
  key: string,
  currentStep: number,
) {
  useEffect(() => {
    sessionStorage.setItem(key, currentStep.toString());
  }, [key, currentStep]);
}
