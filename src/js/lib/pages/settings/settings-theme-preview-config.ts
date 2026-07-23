// ------------ IMPORTS ------------//
import type { ThemePreviewConfig } from "./settings-interfaces";
import type { GameTheme, PlayerId } from "./settings-types";

import { THEME_PREVIEW_CONFIGS } from "./settings-theme-preview-constants"

// ------------ FUNCTIONS ------------//

/**
 * Retrieves the preview configuration of a game theme.
 *
 * @param theme - The selected game theme.
 * @returns The corresponding theme-preview configuration.
 */
export function getThemePreviewConfig(theme: GameTheme): ThemePreviewConfig {
  return THEME_PREVIEW_CONFIGS[theme];
}

/**
 * Creates the player-icon path used in a theme preview.
 *
 * Uses the configured current-player icon prefix when one is
 * available. Otherwise, it returns the standard player icon.
 *
 * @param config - The active theme-preview configuration.
 * @param player - The player whose icon should be resolved.
 * @returns The matching player-icon path.
 */
export function getPlayerIconPath(config: ThemePreviewConfig, player: PlayerId): string {
  const basePath = `/settings/theme-visuals/${config.assetFolder}`;
  if (config.currentPlayerIconPrefix) {
    return createPrefixedPlayerIconPath(basePath, config.currentPlayerIconPrefix, player);
  }

  return `${basePath}/${player}-player-icon.svg`;
}

/**
 * Creates a player-icon path with a theme-specific prefix.
 *
 * @param basePath - The asset directory of the selected theme.
 * @param iconPrefix - The configured current-player icon prefix.
 * @param player - The player whose icon should be resolved.
 * @returns The prefixed player-icon path.
 */
function createPrefixedPlayerIconPath(basePath: string, iconPrefix: string, player: PlayerId): string {
  return (`${basePath}/${player}-${iconPrefix}-icon.svg`);
}