// ------------ TYPES ------------//

/**
 * Represents the current visibility and match state of a memory card.
 */
export type CardStatus = | "hidden" | "flipped" | "matched";

/**
 * Represents the current lifecycle phase of a game.
 */
export type GamePhase = | "playing" | "game-over" | "result";

/**
 * Represents the final result of a game.
 *
 * `null` indicates that no result has been determined yet.
 */
export type GameResult = | "blue" | "orange" | "draw" | null;