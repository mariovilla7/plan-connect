import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import bg from "./locales/bg.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
  bg: { translation: bg },
};

const SUPPORTED = ["es", "en", "bg"] as const;
type Lang = (typeof SUPPORTED)[number];

// Mapa país → idioma soportado
const COUNTRY_TO_LANG: Record<string, Lang> = {
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", UY: "es", PR: "es",
  BG: "bg",
};

// Detector personalizado: lookup por país (geo IP) — async, cacheado en localStorage
const GEO_CACHE_KEY = "i18nextLngGeo";

async function detectByGeo(): Promise<Lang | null> {
  try {
    const cached = localStorage.getItem(GEO_CACHE_KEY);
    if (cached && SUPPORTED.includes(cached as Lang)) return cached as Lang;

    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 2500);
    // ipapi.co responde { country: "ES" } sin clave para tráfico bajo
    const res = await fetch("https://ipapi.co/json/", { signal: ctrl.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string; country_code?: string };
    const code = (data.country_code || data.country || "").toUpperCase();
    const lang = COUNTRY_TO_LANG[code] || "en";
    localStorage.setItem(GEO_CACHE_KEY, lang);
    return lang;
  } catch {
    return null;
  }
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "es",
      supportedLngs: SUPPORTED as unknown as string[],
      interpolation: { escapeValue: false },
      detection: {
        // Si el usuario ya escogió idioma manualmente, respetarlo siempre.
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
        lookupLocalStorage: "i18nextLng",
      },
    });

  // Solo auto-detectar por geo si NO hay elección manual previa.
  if (typeof window !== "undefined" && !localStorage.getItem("i18nextLng")) {
    detectByGeo().then((lang) => {
      if (lang && i18n.language !== lang) {
        i18n.changeLanguage(lang);
        // No marcamos i18nextLng manualmente: el cambio sí lo persiste.
      }
    });
  }
}

export default i18n;
