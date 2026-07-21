// # CONFIGS
// ## TYPES
import type { BoardSize, GameTheme, PlayerId } from "./game-setting-types";

// # FUNCTIONALITY
// ## FUNCTIONS
export function isPlayerId(value: unknown): value is PlayerId {
  return value === "blue" || value === "orange";
}

export function isBoardSize(value: unknown): value is BoardSize {
  return value === "4x4"
    || value === "4x6"
    || value === "6x6";
}

export function isGameTheme(value: unknown): value is GameTheme {
  return value === "code"
    || value === "gaming"
    || value === "academy"
    || value === "food";
}