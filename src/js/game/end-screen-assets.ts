import type { GameTheme } from "../settings/game-setting-types";
import type { EndScreenAssets } from "./game-interfaces";

const END_SCREEN_ASSETS: Record<GameTheme, EndScreenAssets> = {
  code: {
    winner: {
      bluePlayerImagePath:
        "/endscreens/coding/blue-chess-pawn.svg",
      orangePlayerImagePath:
        "/endscreens/coding/orange-chess-pawn.svg",
      confettiImagePath:
        "/endscreens/coding/confetti.svg"
    },
    draw: {
      scaleImagePath:
        "/endscreens/coding/scale-icon.svg"
    }
  },

  gaming: {
    winner: {
      bluePlayerImagePath:
        "/endscreens/gaming/pocale.svg",
      orangePlayerImagePath:
        "/endscreens/gaming/pocale.svg",
      confettiImagePath: null
    },
    draw: {
      scaleImagePath:
        "/endscreens/gaming/scale-icon.svg"
    }
  },

  academy: {
    winner: {
      bluePlayerImagePath:
        "/endscreens/da-projects/blue-chess-pawn.svg",
      orangePlayerImagePath:
        "/endscreens/da-projects/orange-chess-pawn.svg",
      confettiImagePath: null
    },
    draw: {
      scaleImagePath:
        "/endscreens/da-projects/scale-icon.svg"
    }
  },

  food: {
    winner: {
      bluePlayerImagePath:
        "/endscreens/food/blue-chess-pawn.svg",
      orangePlayerImagePath:
        "/endscreens/food/orange-chess-pawn.svg",
      confettiImagePath: null
    },
    draw: {
      scaleImagePath:
        "/endscreens/food/scale-icon.svg"
    }
  }
};

export function getEndScreenAssets(theme: GameTheme): EndScreenAssets {
  return END_SCREEN_ASSETS[theme];
}