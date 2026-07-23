// ------------ IMPORTS ------------//
import type { Translations } from "../../../lib/language/language-interfaces";
import type { GameState } from "../../../lib/pages/game/game-interfaces";

import { getBoardConfig } from "../../../components/pages/game/game-board";
import { renderExitGameDialog } from "./game-exit-dialog";
import { renderGameBoard } from "../../../pages/game/game-board-view";
import { renderGameHeader } from "./game-header";
import { getPlayerAssets } from "./assets/game-player-assets";
import { getThemeCardAssets } from "./assets/theme-card-assets";

// ------------ FUNCTIONS ------------//

/**
 * Renders the active memory-game screen.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @returns The active game-screen markup.
 */
export function renderGameScreen(translation: Translations, gameState: GameState): string {
  const boardConfig = getBoardConfig(gameState.boardSize);
  const themeAssets = getThemeCardAssets(gameState.theme);
  const playerAssets = getPlayerAssets(gameState.theme);

  return `
    <main class="game-page game-page--${gameState.theme}" data-game-theme="${gameState.theme}">
      <section class="game-page__content">
        ${renderGameHeader(translation, gameState, themeAssets, playerAssets)}
        ${renderGameBoard(translation, gameState, themeAssets.cardBackPath, boardConfig)}
      </section>
      ${renderExitGameDialog(translation)}
    </main>
  `;
}