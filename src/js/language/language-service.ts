// ------------ IMPORTS ------------//
import type { Language } from "../lib/language/language-types";
import type { Translations } from "../lib/language/language-interfaces";

import { LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE } from "../lib/language/language-constants";
import { TRANSLATIONS } from "../lib/language/translations";

// ------------ FUNCTIONS ------------//

/**
 * Loads the last valid application language from local storage.
 *
 * @returns The stored language or the default language as fallback.
 */
export function loadLanguage(): Language {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;}

/**
 * Checks whether a value represents a supported application language.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a supported language.
 */
export function isLanguage(value: string | null): value is Language {
  return value === "de" || value === "en";
}

/**
 * Persists the selected language and updates the document language.
 *
 * @param language - The language to store and apply.
 */
export function saveLanguage(language: Language): void {localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language;
}

/**
 * Returns the translations for a supported application language.
 *
 * @param language - The language whose translations should be returned.
 * @returns The complete translation object for the selected language.
 */
export function getTranslation(language: Language): Translations {
  return TRANSLATIONS[language];
}