// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";
import type { GameState } from "./game-interfaces";

// ## TS - FUNCTION-IMPORTS
import { getBoardConfig } from "./board-config";
import { renderExitGameDialog } from "./exit-game-dialog";
import { renderGameBoard } from "./game-board-view";
import { renderGameHeader } from "./game-header";
import { getPlayerAssets } from "./game-player-assets";
import { getThemeCardAssets } from "./theme-card-assets";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the active memory-game screen.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @returns The active game-screen markup.
 */
export function renderGameScreen(
  translation: Translations,
  gameState: GameState
): string {
  const boardConfig = getBoardConfig(gameState.boardSize);
  const themeAssets = getThemeCardAssets(gameState.theme);
  const playerAssets = getPlayerAssets(gameState.theme);

  return `
    <main
      class="game-page game-page--${gameState.theme}"
      data-game-theme="${gameState.theme}"
    >
      <section class="game-page__content">
        ${renderGameHeader(
          translation,
          gameState,
          themeAssets,
          playerAssets
        )}
        ${renderGameBoard(
          translation,
          gameState,
          themeAssets.cardBackPath,
          boardConfig
        )}
      </section>
      ${renderExitGameDialog(translation)}
    </main>
  `;
}