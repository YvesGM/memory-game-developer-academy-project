// ------------ IMPORTS ------------//
import type { Language } from "./language-types";

// ------------ INTERFACES ------------//

/**
 * Storage key used to persist the currently selected language.
 */
export const LANGUAGE_STORAGE_KEY = "memory-game-language";

/**
 * Default language used when no valid language is stored.
 */
export const DEFAULT_LANGUAGE: Language = "de";