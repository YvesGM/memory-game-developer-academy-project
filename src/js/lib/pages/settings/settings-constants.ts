// ------------ IMPORTS ------------//
import type { GameSettings } from "./settings-interfaces";

// ------------ CONSTANTS ------------//

/**
 * Defines the default settings used for a new game.
 */
export const DEFAULT_GAME_SETTINGS: GameSettings = {
  startingPlayer: "blue",
  boardSize: "4x4",
  theme: "code"
};

/**
 * Defines the local-storage key used for game settings.
 */
export const SETTINGS_STORAGE_KEY = "memory-game-settings";