import type { ThemePreviewConfig } from "./game-setting-interfaces";
import type { GameTheme, PlayerId } from "./game-setting-types";

const THEME_PREVIEW_CONFIGS: Record<GameTheme, ThemePreviewConfig> = {
  code: {
    className: "theme-preview--coding",
    assetFolder: "coding"
  },
  gaming: {
    className: "theme-preview--gaming",
    assetFolder: "gaming"
  },
  academy: {
    className: "theme-preview--academy",
    assetFolder: "da-projects"
  },
  food: {
    className: "theme-preview--food",
    assetFolder: "food"
  }
};

export function getThemePreviewConfig(theme: GameTheme): ThemePreviewConfig {
  return THEME_PREVIEW_CONFIGS[theme];
}

export function getPlayerIconPath(folder: string, player: PlayerId): string {
  return `/settings/theme-visuals/${folder}/${player}-player-icon.svg`;
}