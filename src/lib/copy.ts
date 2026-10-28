import { useCallback } from "react";
import { useI18n } from "./i18n";
export function useCopy() {
  const { lang } = useI18n();
  return useCallback(
    (english: string, french: string) => (lang === "FR" ? french : english),
    [lang],
  );
}
