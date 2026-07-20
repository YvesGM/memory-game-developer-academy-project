import type { ThemePreviewConfig } from "./game-setting-interfaces";
import type { GameTheme, PlayerId } from "./game-setting-types";

const THEME_PREVIEW_CONFIGS: Record<GameTheme, ThemePreviewConfig> = {
  code: {
    className: "theme-preview--coding",
    assetFolder: "coding",
    scoreMode: "separate-icons"
  },
  gaming: {
    className: "theme-preview--gaming",
    assetFolder: "gaming",
    scoreMode: "combined-icon",
    currentPlayerIconPrefix: "mid-chess-pawn"
  },
  academy: {
    className: "theme-preview--academy",
    assetFolder: "da-projects",
    scoreMode: "combined-icon",
    currentPlayerIconPrefix: "mid-chess-pawn"
  },
  food: {
    className: "theme-preview--food",
    assetFolder: "food",
    scoreMode: "combined-icon",
    currentPlayerIconPrefix: "mid-chess-pawn"
  }
};

export function getThemePreviewConfig(theme: GameTheme): ThemePreviewConfig {
  return THEME_PREVIEW_CONFIGS[theme];
}

export function getPlayerIconPath(config: ThemePreviewConfig, player: PlayerId): string {
  const prefix = config.currentPlayerIconPrefix;

  if (prefix) {
    return `/settings/theme-visuals/${config.assetFolder}/${player}-${prefix}-icon.svg`;
  }

  return `/settings/theme-visuals/${config.assetFolder}/${player}-player-icon.svg`;
}