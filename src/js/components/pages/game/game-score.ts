// ------------ IMPORTS ------------//
import type { Translations } from "../../../lib/language/language-interfaces";
import type { GameState, PlayerAssets } from "../../../lib/pages/game/game-interfaces";

// ------------ FUNCTIONS ------------//

/**
 * Renders both player scores in the order defined by the active theme.
 *
 * @param translation - The translations for the active language.
 * @param gameState - The current game state.
 * @param playerAssets - The player assets of the active theme.
 * @returns The complete HTML markup for the score display.
 */
export function renderScores(translation: Translations, gameState: GameState, playerAssets: PlayerAssets): string {
  const blueScore = renderBlueScore(translation, gameState, playerAssets);
  const orangeScore = renderOrangeScore(translation, gameState, playerAssets);
  const scores = orderScores(gameState, blueScore, orangeScore);

  return `<div class="game-score" aria-label="Score">${scores}</div>`;
}

/**
 * Renders the blue player's score.
 *
 * @param translation - The translations for the active language.
 * @param gameState - The current game state.
 * @param playerAssets - The player assets of the active theme.
 * @returns The HTML markup for the blue player's score.
 */
function renderBlueScore(translation: Translations, gameState: GameState, playerAssets: PlayerAssets): string {
  return renderScore("blue", translation.game.bluePlayer, gameState.scores.blue, playerAssets.blueScoreIconPath, playerAssets.showScoreLabels);
}

/**
 * Renders the orange player's score.
 *
 * @param translation - The translations for the active language.
 * @param gameState - The current game state.
 * @param playerAssets - The player assets of the active theme.
 * @returns The HTML markup for the orange player's score.
 */
function renderOrangeScore(translation: Translations, gameState: GameState, playerAssets: PlayerAssets): string {
  return renderScore("orange", translation.game.orangePlayer, gameState.scores.orange, playerAssets.orangeScoreIconPath, playerAssets.showScoreLabels);
}

/**
 * Orders the rendered scores according to the active theme.
 *
 * @param gameState - The current game state.
 * @param blueScore - The rendered blue-player score.
 * @param orangeScore - The rendered orange-player score.
 * @returns The ordered score markup.
 */
function orderScores(gameState: GameState, blueScore: string, orangeScore: string): string {
  return gameState.theme === "code" ? `${blueScore}${orangeScore}` : `${orangeScore}${blueScore}`;
}

/**
 * Renders one player's score.
 *
 * @param player - The player represented by the score.
 * @param label - The translated player label.
 * @param score - The player's current score.
 * @param iconPath - The path of the player's score icon.
 * @param showLabel - Whether the player label should be displayed.
 * @returns The HTML markup for one player score.
 */
function renderScore(player: GameState["activePlayer"], label: string, score: number, iconPath: string, showLabel: boolean): string {
  return `
    <span class="game-score__player game-score__player--${player}">
      <img class="game-score__player-icon" src="${iconPath}" alt="" aria-hidden="true">
      ${renderScoreLabel(label, showLabel)}
      <span class="game-score__value">${score}</span>
    </span>
  `;
}

/**
 * Renders the optional player label.
 *
 * @param label - The translated player label.
 * @param showLabel - Whether the label should be displayed.
 * @returns The label markup or an empty string.
 */
function renderScoreLabel(label: string, showLabel: boolean): string {
  return showLabel ? `<span class="game-score__label">${label}</span>` : "";
}