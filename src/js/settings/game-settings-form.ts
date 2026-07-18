import type { GameSettings } from "./game-setting-interfaces";
import type { BoardSize, GameTheme, PlayerId } from "./game-setting-types";

export function readGameSettings(form: HTMLFormElement): GameSettings | null {
    const formData = new FormData(form);
    const startingPlayer = formData.get("startingPlayer");
    const boardSize = formData.get("boardSize");
    const theme = formData.get("theme");

  if (!isValidSettings(startingPlayer, boardSize, theme)) {
        return null;
    }

  return {
    startingPlayer: startingPlayer as PlayerId,
    boardSize: boardSize as BoardSize,
    theme: theme as GameTheme,
  };
}

function isValidSettings(player: FormDataEntryValue | null, size: FormDataEntryValue | null, theme: FormDataEntryValue | null): boolean {
  return isPlayerId(player)
    && isBoardSize(size)
    && isGameTheme(theme);
}

function isPlayerId(value: unknown): value is PlayerId {
  return value === "blue" || value === "orange";
}

function isBoardSize(value: unknown): value is BoardSize {
  return value === "4x4"
    || value === "4x6"
    || value === "6x6";
}

function isGameTheme(value: unknown): value is GameTheme {
  return value === "code"
    || value === "gaming"
    || value === "academy"
    || value === "food";
}