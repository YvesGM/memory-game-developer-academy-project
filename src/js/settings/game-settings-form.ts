// # TYPESCRIPT
// ## TS - TYPES
import type { GameSettings } from "./game-setting-interfaces";

// ## TS - FUNCTION-IMPORTS
import { isBoardSize, isGameTheme, isPlayerId } from "./game-setting-guards";

// # FUNCTIONALITY
// ## FUNCTIONS
export function readGameSettings(form: HTMLFormElement): GameSettings | null {
  const formData = new FormData(form);
  return createGameSettings(formData.get("startingPlayer"), formData.get("boardSize"), formData.get("theme"));
}

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