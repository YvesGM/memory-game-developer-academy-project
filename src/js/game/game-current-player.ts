// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";
import type { GameState } from "./game-interfaces";
import type { PlayerAssets } from "./game-player-assets";

// # TYPES

interface CurrentPlayerData {
  label: string;
  iconPath: string;
}

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the active-player indicator.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @param playerAssets - The active player assets.
 * @returns The current-player markup.
 */
export function renderCurrentPlayer(
  translation: Translations,
  gameState: GameState,
  playerAssets: PlayerAssets
): string {
  const playerData = getCurrentPlayerData(
    translation,
    gameState,
    playerAssets
  );

  return `
    <div class="game-header__current-player game-header__current-player--${gameState.activePlayer}">
      <span class="game-header__current-player-label">${translation.game.currentPlayer}</span>
      ${renderCurrentPlayerIcon(playerData)}
    </div>
  `;
}

/**
 * Resolves the label and icon of the active player.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The current game state.
 * @param playerAssets - The active player assets.
 * @returns The active player's display data.
 */
function getCurrentPlayerData(
  translation: Translations,
  gameState: GameState,
  playerAssets: PlayerAssets
): CurrentPlayerData {
  return gameState.activePlayer === "blue"
    ? getBluePlayerData(translation, playerAssets)
    : getOrangePlayerData(translation, playerAssets);
}

/**
 * Creates the blue player's display data.
 *
 * @param translation - The active translation dictionary.
 * @param playerAssets - The active player assets.
 * @returns The blue player's display data.
 */
function getBluePlayerData(
  translation: Translations,
  playerAssets: PlayerAssets
): CurrentPlayerData {
  return {
    label: translation.game.bluePlayer,
    iconPath: playerAssets.blueCurrentPlayerIconPath
  };
}

/**
 * Creates the orange player's display data.
 *
 * @param translation - The active translation dictionary.
 * @param playerAssets - The active player assets.
 * @returns The orange player's display data.
 */
function getOrangePlayerData(
  translation: Translations,
  playerAssets: PlayerAssets
): CurrentPlayerData {
  return {
    label: translation.game.orangePlayer,
    iconPath: playerAssets.orangeCurrentPlayerIconPath
  };
}

/**
 * Renders the active player's icon.
 *
 * @param playerData - The active player's display data.
 * @returns The player-icon markup.
 */
function renderCurrentPlayerIcon(
  playerData: CurrentPlayerData
): string {
  return `
    <span class="game-header__active-player-icon">
      <img src="${playerData.iconPath}" alt="${playerData.label}">
    </span>
  `;
}