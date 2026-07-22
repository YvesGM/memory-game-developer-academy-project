// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";
import type { GameState } from "./game-interfaces";
import type { PlayerAssets } from "./game-player-assets";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders both player scores in the theme-specific order.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @param playerAssets - The active player assets.
 * @returns The complete score markup.
 */
export function renderScores(
  translation: Translations,
  gameState: GameState,
  playerAssets: PlayerAssets
): string {
  const blueScore = renderBlueScore(translation, gameState, playerAssets);
  const orangeScore = renderOrangeScore(translation, gameState, playerAssets);
  const scores = orderScores(gameState, blueScore, orangeScore);

  return `<div class="game-score" aria-label="Score">${scores}</div>`;
}

/**
 * Renders the blue player's score.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @param playerAssets - The active player assets.
 * @returns The blue-player score markup.
 */
function renderBlueScore(
  translation: Translations,
  gameState: GameState,
  playerAssets: PlayerAssets
): string {
  return renderScore(
    "blue",
    translation.game.bluePlayer,
    gameState.scores.blue,
    playerAssets.blueScoreIconPath,
    playerAssets.showScoreLabels
  );
}

/**
 * Renders the orange player's score.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @param playerAssets - The active player assets.
 * @returns The orange-player score markup.
 */
function renderOrangeScore(
  translation: Translations,
  gameState: GameState,
  playerAssets: PlayerAssets
): string {
  return renderScore(
    "orange",
    translation.game.orangePlayer,
    gameState.scores.orange,
    playerAssets.orangeScoreIconPath,
    playerAssets.showScoreLabels
  );
}

/**
 * Orders the scores according to the active theme.
 *
 * @param gameState - The current game state.
 * @param blueScore - The rendered blue score.
 * @param orangeScore - The rendered orange score.
 * @returns The ordered score markup.
 */
function orderScores(
  gameState: GameState,
  blueScore: string,
  orangeScore: string
): string {
  return gameState.theme === "code"
    ? `${blueScore}${orangeScore}`
    : `${orangeScore}${blueScore}`;
}

/**
 * Renders one player's score.
 *
 * @param player - The represented player.
 * @param label - The translated player label.
 * @param score - The current player score.
 * @param iconPath - The score icon path.
 * @param showLabel - Whether the player label is displayed.
 * @returns The player-score markup.
 */
function renderScore(
  player: "blue" | "orange",
  label: string,
  score: number,
  iconPath: string,
  showLabel: boolean
): string {
  return `
    <span class="game-score__player game-score__player--${player}">
      <img class="game-score__player-icon" src="${iconPath}" alt="" aria-hidden="true">
      ${renderScoreLabel(label, showLabel)}
      <span class="game-score__value">${score}</span>
    </span>
  `;
}

/**
 * Renders an optional player label.
 *
 * @param label - The translated player label.
 * @param showLabel - Whether the label is displayed.
 * @returns The label markup or an empty string.
 */
function renderScoreLabel(
  label: string,
  showLabel: boolean
): string {
  return showLabel
    ? `<span class="game-score__label">${label}</span>`
    : "";
}