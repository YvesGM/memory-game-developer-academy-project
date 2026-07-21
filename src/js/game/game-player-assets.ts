// # TYPESCRIPT
// ## TS - TYPES
import type { GameTheme } from "../settings/game-setting-types";

// # CONFIGS
// ## INTERFACES
interface PlayerAssets {
  bluePlayerIconPath: string;
  orangePlayerIconPath: string;
}

// CONST
const PLAYER_ASSETS: Record<GameTheme, PlayerAssets> = {
  code: {
    bluePlayerIconPath: "/endscreens/coding/blue-chess-pawn.svg",
    orangePlayerIconPath: "/endscreens/coding/orange-chess-pawn.svg"
  },

  gaming: {
    bluePlayerIconPath: "/endscreens/da-projects/blue-chess-pawn.svg",
    orangePlayerIconPath: "/endscreens/da-projects/orange-chess-pawn.svg"
  },

  academy: {
    bluePlayerIconPath: "/endscreens/da-projects/blue-chess-pawn.svg",
    orangePlayerIconPath: "/endscreens/da-projects/orange-chess-pawn.svg"
  },

  food: {
    bluePlayerIconPath: "/endscreens/coding/blue-chess-pawn.svg",
    orangePlayerIconPath: "/endscreens/coding/orange-chess-pawn.svg"
  }
};

// # FUNCTIONALITY
// ## FUNCTIONS
export function getPlayerAssets(theme: GameTheme): PlayerAssets {
  return PLAYER_ASSETS[theme];
}