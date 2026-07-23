// ------------ IMPORTS ------------//
import type { Translations } from "./lib/language/language-interfaces";
import type { GameState } from "./lib/pages/game/game-interfaces";

import { renderGameOverScreen } from "./pages/game/end-screen/end-screen-game-over";
import { renderGameScreen } from "./components/pages/game/game-screen";
import { renderResultScreen } from "./pages/game/end-screen/end-screen-result";

// ------------ FUNCTIONS ------------//

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