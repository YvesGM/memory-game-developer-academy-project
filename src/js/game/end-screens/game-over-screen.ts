// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../../language/language-types";
import type { GameState } from "../game-interfaces";

// ## TS - FUNCTION-IMPORTS
import { getPlayerAssets } from "../game-player-assets";
import { renderScores } from "../game-score";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the intermediate game-over screen.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The completed game state.
 * @returns The game-over screen markup.
 */
export function renderGameOverScreen(
  translation: Translations,
  gameState: GameState
): string {
  const playerAssets = getPlayerAssets(gameState.theme);

  return `
    <main
      class="
        game-page
        game-page--${gameState.theme}
        end-screen
        end-screen--game-over
      "
      data-game-theme="${gameState.theme}"
    >
      <section class="end-screen__content end-screen__content--game-over">
        ${renderGameOverTitle(translation)}
        ${renderFinalScore(
          translation,
          gameState,
          playerAssets
        )}
      </section>
    </main>
  `;
}

/**
 * Renders the layered game-over title.
 *
 * @param translation - The active translation dictionary.
 * @returns The game-over title markup.
 */
function renderGameOverTitle(
  translation: Translations
): string {
  const title = translation.game.gameOver;

  return `
    <h1 class="end-screen__game-over-title">
      <span
        class="end-screen__title-shadow"
        aria-hidden="true"
      >
        ${title}
      </span>
      <span class="end-screen__title-front">
        ${title}
      </span>
    </h1>
  `;
}

/**
 * Renders the final score of a completed game.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The completed game state.
 * @param playerAssets - The active player assets.
 * @returns The final-score markup.
 */
function renderFinalScore(
  translation: Translations,
  gameState: GameState,
  playerAssets: ReturnType<typeof getPlayerAssets>
): string {
  return `
    <div class="end-screen__final-score">
      <p class="end-screen__score-label">
        ${translation.game.finalScore}
      </p>
      <div class="end-screen__score-box">
        ${renderScores(
          translation,
          gameState,
          playerAssets
        )}
      </div>
    </div>
  `;
}