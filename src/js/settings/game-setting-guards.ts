// # CONFIGS
// ## TYPES
import type { BoardSize, GameTheme, PlayerId } from "./game-setting-types";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Checks whether a value is a valid player identifier.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is `blue` or `orange`.
 */
export function isPlayerId(value: unknown): value is PlayerId {
  return value === "blue" || value === "orange";
}

/**
 * Checks whether a value is a supported board size.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a valid board size.
 */
export function isBoardSize(value: unknown): value is BoardSize {
  return value === "4x4" || value === "4x6" || value === "6x6";
}

/**
 * Checks whether a value is a supported game theme.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a valid game theme.
 */
export function isGameTheme(value: unknown): value is GameTheme {
  return value === "code" || value === "gaming" || value === "academy" || value === "food";
}