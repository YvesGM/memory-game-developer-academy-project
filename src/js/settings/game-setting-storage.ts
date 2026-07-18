import type { GameSettings } from "./game-setting-interfaces";

import { isBoardSize, isGameTheme, isPlayerId } from "./game-setting-guards";
import { DEFAULT_GAME_SETTINGS } from "./game-settings";

const SETTINGS_STORAGE_KEY = "memory-game-settings";

export function loadGameSettings(): GameSettings {
  const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

  if (!storedSettings) {
    return DEFAULT_GAME_SETTINGS;
  }

  return parseGameSettings(storedSettings);
}

export function saveGameSettings(settings: GameSettings): void {
  localStorage.setItem(
    SETTINGS_STORAGE_KEY,
    JSON.stringify(settings)
  );
}

function parseGameSettings(value: string): GameSettings {
  try {
    const parsedValue: unknown = JSON.parse(value);

    return isGameSettings(parsedValue)
      ? parsedValue
      : DEFAULT_GAME_SETTINGS;
  } catch {
    return DEFAULT_GAME_SETTINGS;
  }
}

function isGameSettings(value: unknown): value is GameSettings {
  if (!isRecord(value)) {
    return false;
  }

  return isPlayerId(value.startingPlayer)
    && isBoardSize(value.boardSize)
    && isGameTheme(value.theme);
}

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}