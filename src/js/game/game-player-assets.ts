// # TYPESCRIPT
// ## TS - TYPES
import type { GameTheme } from "../settings/game-setting-types";

// # CONFIGS
// ## INTERFACES
export interface PlayerAssets {
  blueScoreIconPath: string;
  orangeScoreIconPath: string;
  blueCurrentPlayerIconPath: string;
  orangeCurrentPlayerIconPath: string;
  showScoreLabels: boolean;
}

// ## CONST
const PLAYER_ASSETS: Record<GameTheme, PlayerAssets> = {
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
};

// # FUNCTIONALITY
// ## FUNCTIONS
export function getPlayerAssets(theme: GameTheme): PlayerAssets {
  return PLAYER_ASSETS[theme];
}