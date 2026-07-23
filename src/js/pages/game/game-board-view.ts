// ------------ IMPORTS ------------//
import type { Translations } from "../../lib/language/language-interfaces";
import type { BoardConfig, GameState } from "../../lib/pages/game/game-interfaces";

import { renderMemoryCards } from "./memory-card-view";

// ------------ FUNCTIONS ------------//

/**
 * Renders the complete memory-game board.
 *
 * @param translation - The translations for the active language.
 * @param gameState - The current game state.
 * @param cardBackPath - The image path of the active card back.
 * @param boardConfig - The configuration of the selected board size.
 * @returns The complete HTML markup for the game board.
 */
export function renderGameBoard(translation: Translations, gameState: GameState, cardBackPath: string, boardConfig: BoardConfig): string {
  return `
    <section class="game-board game-board--${gameState.boardSize}" aria-label="${translation.game.title}" style="${createBoardStyle(boardConfig)}">
      ${renderMemoryCards(translation, gameState.cards, cardBackPath)}
    </section>
  `;
}

/**
 * Creates the inline CSS custom properties for the board dimensions.
 *
 * @param boardConfig - The configuration of the selected board size.
 * @returns The CSS declaration string used by the board style attribute.
 */
function createBoardStyle(boardConfig: BoardConfig): string {
  return [
    `--game-board-columns: ${boardConfig.columns}`,
    `--game-board-rows: ${boardConfig.rows}`
  ].join("; ");
}