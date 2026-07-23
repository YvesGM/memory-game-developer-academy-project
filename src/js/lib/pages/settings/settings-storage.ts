// ------------ IMPORTS ------------//
import type { GameSettings } from "./settings-interfaces";

import { DEFAULT_GAME_SETTINGS, SETTINGS_STORAGE_KEY } from "./settings-constants";
import { isBoardSize, isGameTheme, isPlayerId } from "../../../pages/settings/settings-guards";

// ------------ FUNCTIONS ------------//

/**
 * Loads the stored game settings from local storage.
 *
 * Falls back to the default settings when no stored value
 * exists or the stored data is invalid.
 *
 * @returns The stored or default game settings.
 */
export function loadGameSettings(): GameSettings {
  const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!storedSettings) {
    return DEFAULT_GAME_SETTINGS;
  }

  return parseGameSettings(storedSettings);
}

/**
 * Persists the selected game settings in local storage.
 *
 * @param settings - The game settings to store.
 */
export function saveGameSettings(settings: GameSettings): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Parses and validates a serialized game-settings value.
 *
 * @param value - The serialized settings value.
 * @returns The parsed settings or the default settings.
 */
function parseGameSettings(value: string): GameSettings {
  try {
    const parsedValue: unknown = JSON.parse(value);
    return isGameSettings(parsedValue) ? parsedValue : DEFAULT_GAME_SETTINGS;
  } catch {
    return DEFAULT_GAME_SETTINGS;
  }
}

/**
 * Checks whether a value contains valid game settings.
 *
 * @param value - The value to validate.
 * @returns `true` when the value matches `GameSettings`.
 */
function isGameSettings(value: unknown): value is GameSettings {
  if (!isRecord(value)) {
    return false;
  }
  return isPlayerId(value.startingPlayer) && isBoardSize(value.boardSize) && isGameTheme(value.theme);
}

/**
 * Checks whether a value is a non-null object record.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is an object record.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}