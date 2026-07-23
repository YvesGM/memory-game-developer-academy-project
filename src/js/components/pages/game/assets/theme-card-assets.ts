// ------------ IMPORTS ------------//
import type { GameTheme } from "../../../../lib/pages/settings/settings-types";
import type { ThemeCardAssets } from "../../../../lib/pages/game/game-interfaces";

import { THEME_CARD_ASSETS } from "../../../../lib/pages/game/game-card-constants"

// ------------ FUNCTIONS ------------//

/**
 * Returns the card and exit-button assets assigned to a game theme.
 *
 * @param theme - The game theme whose assets should be returned.
 * @returns The complete asset configuration for the selected theme.
 */
export function getThemeCardAssets(theme: GameTheme): ThemeCardAssets {
  return THEME_CARD_ASSETS[theme];
}