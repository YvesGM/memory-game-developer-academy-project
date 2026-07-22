// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../js/language/language-types";
import type { GameState } from "../js/game/game-interfaces";

// ## TS - FUNCTION-IMPORTS
import { renderGameOverScreen } from "../js/game/end-screens/game-over-screen";
import { renderGameScreen } from "../js/game/game-screen";
import { renderResultScreen } from "../js/game/end-screens/result-screen";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the view matching the current game phase.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @returns The active game or end-screen markup.
 */
export function renderGamePage(translation: Translations, gameState: GameState): string {
  if (gameState.phase === "game-over") {
    return renderGameOverScreen(translation, gameState);
  }

  return renderRemainingGamePhase(
    translation, gameState);
}

/**
 * Renders the active game or final result phase.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @returns The active phase markup.
 */
function renderRemainingGamePhase(translation: Translations, gameState: GameState): string {
  return gameState.phase === "result" ? renderResultScreen(translation, gameState) : renderGameScreen(translation, gameState);
}