import { useI18n } from "./i18n";
export function useCopy() {
  const { lang } = useI18n();
  return (english: string, french: string) => (lang === "FR" ? french : english);
}
