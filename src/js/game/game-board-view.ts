// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";
import type {
  BoardConfig,
  GameState
} from "./game-interfaces";

// ## TS - FUNCTION-IMPORTS
import { renderMemoryCards } from "./memory-card-view";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the complete game board.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @param cardBackPath - The active card-back image path.
 * @param boardConfig - The selected board configuration.
 * @returns The game-board markup.
 */
export function renderGameBoard(
  translation: Translations,
  gameState: GameState,
  cardBackPath: string,
  boardConfig: BoardConfig
): string {
  return `
    <section
      class="game-board game-board--${gameState.boardSize}"
      aria-label="${translation.game.title}"
      style="${createBoardStyle(boardConfig)}"
    >
      ${renderMemoryCards(
        translation,
        gameState.cards,
        cardBackPath
      )}
    </section>
  `;
}

/**
 * Creates the inline CSS variables for the board dimensions.
 *
 * @param boardConfig - The selected board configuration.
 * @returns The board-style attribute value.
 */
function createBoardStyle(
  boardConfig: BoardConfig
): string {
  return [
    `--game-board-columns: ${boardConfig.columns}`,
    `--game-board-rows: ${boardConfig.rows}`
  ].join("; ");
}