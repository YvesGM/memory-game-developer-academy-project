// # TYPESCRIPT
// ## TS - TYPES
import type { ThemePreviewConfig } from "./game-setting-interfaces";
import type { GameTheme, PlayerId } from "./game-setting-types";

// # CONFIGS
// ## CONST
const THEME_PREVIEW_CONFIGS: Record<GameTheme, ThemePreviewConfig> = {
  code: {
    className: "theme-preview--coding",
    assetFolder: "coding",
    scoreMode: "separate-icons",
    blueScore: 0,
    orangeScore: 6
  },

  gaming: {
    className: "theme-preview--gaming",
    assetFolder: "gaming",
    scoreMode: "combined-icon",
    blueScore: 2,
    orangeScore: 6,
    currentPlayerIconPrefix: "mid-chess-pawn"
  },

  academy: {
    className: "theme-preview--academy",
    assetFolder: "da-projects",
    scoreMode: "combined-icon",
    blueScore: 2,
    orangeScore: 6,
    currentPlayerIconPrefix: "mid-chess-pawn"
  },

  food: {
    className: "theme-preview--food",
    assetFolder: "food",
    scoreMode: "combined-icon",
    blueScore: 2,
    orangeScore: 6,
    currentPlayerIconPrefix: "mid-chess-pawn"
  }
};

// # FUNCTIONALITY
// ## FUNCTIONS
export function getThemePreviewConfig(theme: GameTheme): ThemePreviewConfig {
  return THEME_PREVIEW_CONFIGS[theme];
}

export function getPlayerIconPath(config: ThemePreviewConfig, player: PlayerId): string {
  const basePath = `/settings/theme-visuals/${config.assetFolder}`;

  if (config.currentPlayerIconPrefix) {
    return `${basePath}/${player}-${config.currentPlayerIconPrefix}-icon.svg`;
  }

  return `${basePath}/${player}-player-icon.svg`;
}