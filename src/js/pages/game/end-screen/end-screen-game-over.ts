// ------------ IMPORTS ------------//
import type { Translations } from "../../../lib/language/language-interfaces";
import type { GameState, PlayerAssets } from "../../../lib/pages/game/game-interfaces";

import { getPlayerAssets } from "../../../components/pages/game/assets/game-player-assets";
import { renderScores } from "../../../components/pages/game/game-score";

// ------------ FUNCTIONS ------------//

/**
 * Renders the intermediate game-over screen.
 *
 * @param translation - The translations for the active language.
 * @param gameState - The completed game state.
 * @returns The complete HTML markup for the game-over screen.
 */
export function renderGameOverScreen(translation: Translations, gameState: GameState): string {
  const playerAssets = getPlayerAssets(gameState.theme);
  return `
    <main class="game-page game-page--${gameState.theme} end-screen end-screen--game-over" data-game-theme="${gameState.theme}">
      <section class="end-screen__content end-screen__content--game-over">
        ${renderGameOverTitle(translation)}
        ${renderFinalScore(translation, gameState, playerAssets)}
      </section>
    </main>
  `;
}

/**
 * Renders the layered game-over title.
 *
 * @param translation - The translations for the active language.
 * @returns The HTML markup for the game-over title.
 */
function renderGameOverTitle(translation: Translations): string {
  const title = translation.game.gameOver;
  return `
    <h1 class="end-screen__game-over-title">
      <span class="end-screen__title-shadow" aria-hidden="true">${title}</span>
      <span class="end-screen__title-front">${title}</span>
    </h1>
  `;
}

/**
 * Renders the final score of a completed game.
 *
 * @param translation - The translations for the active language.
 * @param gameState - The completed game state.
 * @param playerAssets - The player assets of the active theme.
 * @returns The complete HTML markup for the final-score section.
 */
function renderFinalScore(translation: Translations, gameState: GameState, playerAssets: PlayerAssets): string {
  return `
    <div class="end-screen__final-score">
      <p class="end-screen__score-label">
        ${translation.game.finalScore}
      </p>
      <div class="end-screen__score-box">
        ${renderScores(translation, gameState, playerAssets)}
      </div>
    </div>
  `;
}