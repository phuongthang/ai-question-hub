import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import viTranslation from "./locales/vi.json";
import enTranslation from "./locales/en.json";

const resources = {
  vi: {
    translation: viTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ của trình duyệt
  .use(initReactI18next) // Tích hợp với react-i18next
  .init({
    resources,
    fallbackLng: "vi", // Ngôn ngữ mặc định nếu không phát hiện được
    interpolation: {
      escapeValue: false, // React đã tự động chống XSS
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
export type { Question } from "./api/example";

