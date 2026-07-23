// ------------ IMPORTS ------------//
import type { Translations } from "../../../lib/language/language-interfaces";
import type { GameState, ThemeCardAssets } from "../../../lib/pages/game/game-interfaces";
import type { PlayerAssets } from "../../../lib/pages/game/game-interfaces";

import { renderCurrentPlayer } from "../../../pages/game/game-current-player";
import { renderExitButton } from "./game-exit-button";
import { renderScores } from "./game-score";

// ------------ FUNCTIONS ------------//

/**
 * Renders the complete header of the active game screen.
 *
 * @param translation - The translations for the active language.
 * @param gameState - The current game state.
 * @param themeAssets - The card and exit-button assets of the active theme.
 * @param playerAssets - The player assets of the active theme.
 * @returns The complete HTML markup for the game header.
 */
export function renderGameHeader(translation: Translations, gameState: GameState, themeAssets: ThemeCardAssets, playerAssets: PlayerAssets): string {
  return `
    <header class="game-header">
      ${renderScores(translation, gameState, playerAssets)}
      ${renderCurrentPlayer(translation, gameState, playerAssets)}
      ${renderExitButton(translation, themeAssets.exitIconPath, themeAssets.exitHoverIconPath)}
    </header>
  `;
}