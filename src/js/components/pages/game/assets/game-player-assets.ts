// ------------ IMPORTS ------------//
import type { GameTheme } from "../../../../lib/pages/settings/settings-types";
import type { PlayerAssets } from "../../../../lib/pages/game/game-interfaces";

import { PLAYER_ASSETS } from "../../../../lib/pages/game/game-constants"

// ------------ FUNCTIONS ------------//

/**
 * Returns the player assets assigned to a game theme.
 *
 * @param theme - The game theme whose player assets should be returned.
 * @returns The complete player-asset configuration for the selected theme.
 */
export function getPlayerAssets(theme: GameTheme): PlayerAssets {
  return PLAYER_ASSETS[theme];
}