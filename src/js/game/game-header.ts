// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";
import type {
  GameState,
  ThemeCardAssets
} from "./game-interfaces";
import type { PlayerAssets } from "./game-player-assets";

// ## TS - FUNCTION-IMPORTS
import { renderCurrentPlayer } from "./game-current-player";
import { renderExitButton } from "./game-exit-button";
import { renderScores } from "./game-score";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the complete game header.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @param themeAssets - The active theme assets.
 * @param playerAssets - The active player assets.
 * @returns The game-header markup.
 */
export function renderGameHeader(
  translation: Translations,
  gameState: GameState,
  themeAssets: ThemeCardAssets,
  playerAssets: PlayerAssets
): string {
  return `
    <header class="game-header">
      ${renderScores(
        translation,
        gameState,
        playerAssets
      )}
      ${renderCurrentPlayer(
        translation,
        gameState,
        playerAssets
      )}
      ${renderExitButton(
        translation,
        themeAssets.exitIconPath,
        themeAssets.exitHoverIconPath
      )}
    </header>
  `;
}