// ------------ IMPORTS ------------//
import type { GameTheme } from "../../../../lib/pages/settings/settings-types";
import type { EndScreenAssets } from "../../../../lib/pages/game/game-interfaces";
import { END_SCREEN_ASSETS } from "../../../../lib/pages/game/end-screens/end-screen-constants";

// ------------ FUNCTIONS ------------//

/**
 * Returns the end-screen assets assigned to a game theme.
 *
 * @param theme - The game theme whose end-screen assets should be returned.
 * @returns The complete winner and draw asset configuration for the theme.
 */
export function getEndScreenAssets(theme: GameTheme): EndScreenAssets {
  return END_SCREEN_ASSETS[theme];
}