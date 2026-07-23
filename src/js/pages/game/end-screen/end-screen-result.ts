// ------------ IMPORTS ------------//
import type { Translations } from "../../../lib/language/language-interfaces";
import type { GameState } from "../../../lib/pages/game/game-interfaces";
import type { PlayerId } from "../../../lib/pages/settings/settings-types";

import { getEndScreenAssets } from "../../../components/pages/game/assets/end-screen-assets";

// ------------ FUNCTIONS ------------//

/**
 * Renders the final winner or draw screen.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The completed game state.
 * @returns The result-screen markup.
 */
export function renderResultScreen(translation: Translations, gameState: GameState): string {
  const assets = getEndScreenAssets(gameState.theme);
  if (gameState.result === "draw") {
    return renderDrawScreen(translation, gameState, assets.draw.scaleImagePath);
  }

  return renderWinnerResult(translation, gameState, assets);
}

/**
 * Renders a valid winner result.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The completed game state.
 * @param assets - The active end-screen assets.
 * @returns The winner markup or an empty string.
 */
function renderWinnerResult(translation: Translations, gameState: GameState, assets: ReturnType<typeof getEndScreenAssets>): string {
  const winner = getWinner(gameState);
  if (!winner) {
    return "";
  }
  return renderWinnerScreen(translation, gameState, winner, getWinnerImagePath(winner, assets), assets.winner.confettiImagePath);
}

/**
 * Retrieves a valid winning player.
 *
 * @param gameState - The completed game state.
 * @returns The winning player or `null`.
 */
function getWinner(gameState: GameState): PlayerId | null {
  return gameState.result === "blue" || gameState.result === "orange" ? gameState.result : null;
}

/**
 * Resolves the winner image path.
 *
 * @param winner - The winning player.
 * @param assets - The active end-screen assets.
 * @returns The winner image path.
 */
function getWinnerImagePath(winner: PlayerId, assets: ReturnType<typeof getEndScreenAssets>): string {
  return winner === "blue" ? assets.winner.bluePlayerImagePath : assets.winner.orangePlayerImagePath;
}

/**
 * Renders the winning-player result screen.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The completed game state.
 * @param winner - The winning player.
 * @param winnerImagePath - The winner image path.
 * @param confettiImagePath - The optional confetti image path.
 * @returns The winner-screen markup.
 */
function renderWinnerScreen(translation: Translations, gameState: GameState, winner: PlayerId, winnerImagePath: string, confettiImagePath: string | null): string {
  return `
    <main class="game-page game-page--${gameState.theme} end-screen end-screen--winner end-screen--winner-${winner}" data-game-theme="${gameState.theme}">
      ${renderConfetti(confettiImagePath)}
      <section class="end-screen__content end-screen__content--result">
        ${renderWinnerText(translation, winner)}
        ${renderResultImage(winnerImagePath, "end-screen__winner-icon")}
        ${renderBackToStartButton(translation)}
      </section>
    </main>
  `;
}

/**
 * Renders optional confetti.
 *
 * @param imagePath - The optional confetti image path.
 * @returns The confetti markup or an empty string.
 */
function renderConfetti(imagePath: string | null): string {
  return imagePath ? `<img class="end-screen__confetti" src="${imagePath}" alt="" aria-hidden="true">` : "";
}

/**
 * Renders the translated winner text.
 *
 * @param translation - The active translation dictionary.
 * @param winner - The winning player.
 * @returns The winner-text markup.
 */
function renderWinnerText(translation: Translations, winner: PlayerId): string {
  return `
    <div class="end-screen__winner-text">
      <p class="end-screen__winner-intro">
        ${translation.game.winnerIs}
      </p>
      <h1 class="end-screen__winner-name">
        ${getWinnerLabel(translation, winner)}
      </h1>
    </div>
  `;
}

/**
 * Resolves the translated winner label.
 *
 * @param translation - The active translation dictionary.
 * @param winner - The winning player.
 * @returns The translated player label.
 */
function getWinnerLabel(translation: Translations, winner: PlayerId): string {
  return winner === "blue" ? translation.game.bluePlayer : translation.game.orangePlayer;
}

/**
 * Renders the draw result screen.
 *
 * @param translation - The active translation dictionary.
 * @param gameState - The completed game state.
 * @param scaleImagePath - The draw-image path.
 * @returns The draw-screen markup.
 */
function renderDrawScreen(translation: Translations, gameState: GameState, scaleImagePath: string): string {
  return `
    <main class="game-page game-page--${gameState.theme} end-screen end-screen--draw" data-game-theme="${gameState.theme}">
      <section class="end-screen__content end-screen__content--result">
        ${renderDrawText(translation)}
        ${renderResultImage(scaleImagePath, "end-screen__draw-icon")}
        ${renderBackToStartButton(translation)}
      </section>
    </main>
  `;
}

/**
 * Renders the translated draw text.
 *
 * @param translation - The active translation dictionary.
 * @returns The draw-text markup.
 */
function renderDrawText(translation: Translations): string {
  return `
    <div class="end-screen__draw-text">
      <p class="end-screen__draw-intro">
        ${translation.game.drawIntro}
      </p>
      ${renderDrawTitle(translation)}
    </div>
  `;
}

/**
 * Renders the layered draw title.
 *
 * @param translation - The active translation dictionary.
 * @returns The draw-title markup.
 */
function renderDrawTitle(translation: Translations): string {
  const title = translation.game.drawTitle;
  return `
    <h1 class="end-screen__draw-title">
      <span class="end-screen__title-shadow" aria-hidden="true">${title}</span>
      <span class="end-screen__title-front">${title}</span>
    </h1>
  `;
}

/**
 * Renders a result-screen image.
 *
 * @param imagePath - The result-image path.
 * @param modifierClass - The result-image modifier class.
 * @returns The result-image markup.
 */
function renderResultImage(imagePath: string, modifierClass: string): string {
  return `
    <div class="end-screen__result-image-wrapper">
      <img class="end-screen__result-icon ${modifierClass}" src="${imagePath}" alt="" aria-hidden="true">
    </div>
  `;
}

/**
 * Renders the button returning to the home page.
 *
 * @param translation - The active translation dictionary.
 * @returns The back-to-start button markup.
 */
function renderBackToStartButton(translation: Translations): string {
  return `
    <button class="end-screen__back-button" type="button" data-end-screen-home>
      <span>${translation.game.backToStart}</span>
    </button>
  `;
}