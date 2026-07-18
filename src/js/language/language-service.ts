import { TRANSLATIONS } from "./translations";

import type {
  Language,
  Translations
} from "./language-types";

const LANGUAGE_STORAGE_KEY = "memory-game-language";
const DEFAULT_LANGUAGE: Language = "de";

export function loadLanguage(): Language {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return isLanguage(storedLanguage)
    ? storedLanguage
    : DEFAULT_LANGUAGE;
}

export function isLanguage(value: string | null): value is Language {
  return value === "de" || value === "en";
}

export function saveLanguage(language: Language): void {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language;
}

export function getTranslation(language: Language): Translations {
  return TRANSLATIONS[language];
}