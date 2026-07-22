// # TYPESCRIPT
// ## TS - TYPES
import type { GameSettings } from "./game-setting-interfaces";

// ## TS - FUNCTION-IMPORTS
import { isBoardSize, isGameTheme, isPlayerId } from "./game-setting-guards";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Reads and validates the selected settings from a form.
 *
 * @param form - The settings form to evaluate.
 * @returns The valid game settings or `null`.
 */
export function readGameSettings(form: HTMLFormElement): GameSettings | null {
  const formData = new FormData(form);
  return createGameSettings(formData.get("startingPlayer"), formData.get("boardSize"), formData.get("theme"));
}

/**
 * Creates validated game settings from form values.
 *
 * @param player - The selected starting-player value.
 * @param boardSize - The selected board-size value.
 * @param theme - The selected game-theme value.
 * @returns The created game settings or `null`.
 */
function createGameSettings(player: FormDataEntryValue | null, boardSize: FormDataEntryValue | null, theme: FormDataEntryValue | null): GameSettings | null {
  if (!isPlayerId(player) || !isBoardSize(boardSize) || !isGameTheme(theme)) {
    return null;
  }

  return {
    startingPlayer: player,
    boardSize,
    theme
  };
}