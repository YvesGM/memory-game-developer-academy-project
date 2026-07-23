// ------------ IMPORTS ------------//
import type { GameTheme } from "../settings/settings-types";
import type { PlayerAssets } from "./game-interfaces";

// ------------ CONSTANTS ------------//

/**
 * Storage key used to persist the current game state.
 */
export const GAME_STATE_STORAGE_KEY = "memory-game-state";

/**
 * Duration of the card-flip animation in milliseconds.
 */
export const CARD_FLIP_DURATION = 500;

/**
 * Delay before a non-matching card pair starts flipping back.
 */
export const CARD_FLIP_BACK_DELAY = 900;

/**
 * Maximum number of cards that may be selected at the same time.
 */
export const MAX_SELECTED_CARDS = 2;

/**
 * Duration of the game-over screen before the final result is shown.
 */
export const GAME_OVER_DURATION = 3000;

/**
 * Duration of the exit-dialog opening and closing animation.
 */
export const EXIT_DIALOG_ANIMATION_DURATION = 320;

/**
 * Maps every game theme to its theme-specific player assets.
 */
export const PLAYER_ASSETS = {
  code: {
    blueScoreIconPath: "/game/coding/blue-player-flag.svg",
    orangeScoreIconPath: "/game/coding/orange-player-flag.svg",
    blueCurrentPlayerIconPath: "/game/coding/blue-player-flag.svg",
    orangeCurrentPlayerIconPath: "/game/coding/orange-player-flag.svg",
    showScoreLabels: true
  },
  gaming: {
    blueScoreIconPath: "/game/games/blue-chess-pawn.svg",
    orangeScoreIconPath: "/game/games/orange-chess-pawn.svg",
    blueCurrentPlayerIconPath: "/game/games/blue-mid-chess-pawn.svg",
    orangeCurrentPlayerIconPath: "/game/games/orange-mid-chess-pawn.svg",
    showScoreLabels: false
  },
  academy: {
    blueScoreIconPath: "/game/da-projects/blue-chess-pawn.svg",
    orangeScoreIconPath: "/game/da-projects/orange-chess-pawn.svg",
    blueCurrentPlayerIconPath: "/game/da-projects/blue-mid-chess-pawn.svg",
    orangeCurrentPlayerIconPath: "/game/da-projects/orange-mid-chess-pawn.svg",
    showScoreLabels: false
  },
  food: {
    blueScoreIconPath: "/game/food/blue-chess-pawn.svg",
    orangeScoreIconPath: "/game/food/orange-chess-pawn.svg",
    blueCurrentPlayerIconPath: "/game/food/blue-mid-chess-pawn.svg",
    orangeCurrentPlayerIconPath: "/game/food/orange-mid-chess-pawn.svg",
    showScoreLabels: false
  }
} satisfies Record<GameTheme, PlayerAssets>;