import type { Translations } from "../js/language/language-types";
import type { GameState, MemoryCard } from "../js/game/game-interfaces";

import { getBoardConfig } from "../js/game/board-config";
import { getThemeCardAssets } from "../js/game/theme-card-assets";
import { renderExitGameDialog } from "../js/game/exit-game-dialog";

export function renderGamePage(translation: Translations, gameState: GameState): string {
  const boardConfig = getBoardConfig(gameState.boardSize);
  const themeAssets = getThemeCardAssets(gameState.theme);

  return `
    <main class="game-page game-page--${gameState.theme}" data-game-theme="${gameState.theme}">
      <section class="game-page__content">
        ${renderGameHeader(translation, gameState, themeAssets.exitIconPath, themeAssets.exitHoverIconPath)}
        ${renderGameBoard(translation, gameState.cards, themeAssets.cardBackPath, boardConfig.columns)}
      </section>

      ${renderExitGameDialog(translation)}
    </main>
  `;
}

function renderGameHeader(translation: Translations, gameState: GameState, exitIconPath: string, exitHoverIconPath: string): string {
  return `
    <header class="game-header">
      ${renderScores(gameState)}
      ${renderCurrentPlayer(translation, gameState)}
      ${renderExitButton(translation, exitIconPath, exitHoverIconPath)}
    </header>
  `;
}

function renderScores(gameState: GameState): string {
  return `
    <div class="game-score" aria-label="Score">
      ${renderScore("blue", gameState.scores.blue)}
      ${renderScore("orange", gameState.scores.orange)}
    </div>
  `;
}

function renderScore(player: "blue" | "orange", score: number): string {
  return `
    <span class="game-score__player game-score__player--${player}">
      <span class="game-score__flag" aria-hidden="true"></span>
      <span>${score}</span>
    </span>
  `;
}

function renderCurrentPlayer(translation: Translations, gameState: GameState): string {
  const label = gameState.activePlayer === "blue"
    ? translation.game.bluePlayer
    : translation.game.orangePlayer;

  return `
    <div class="game-header__current-player">
      <span>${translation.game.currentPlayer}</span>
      <span class="game-header__active-flag game-header__active-flag--${gameState.activePlayer}" role="img" aria-label="${label}"></span>
    </div>
  `;
}

function renderExitButton(translation: Translations, iconPath: string, hoverIconPath: string): string {
  return `
    <button class="game-exit-button" type="button" data-open-exit-dialog>
      <span class="game-exit-button__icons" aria-hidden="true">
        <img class="game-exit-button__icon game-exit-button__icon--default" src="${iconPath}" alt="">
        <img class="game-exit-button__icon game-exit-button__icon--hover" src="${hoverIconPath}" alt="">
      </span>
      <span>${translation.game.exitGame}</span>
    </button>
  `;
}

function renderGameBoard(translation: Translations, cards: MemoryCard[], cardBackPath: string, columns: number): string {
  return `
    <section class="game-board" aria-label="${translation.game.title}" style="--game-board-columns: ${columns};">
      ${cards
      .map((card) => {
        return renderMemoryCard(translation, card, cardBackPath);
      }).join("")}
    </section>
  `;
}

function renderMemoryCard(translation: Translations, card: MemoryCard, cardBackPath: string): string {
  const stateClass = getCardStateClass(card);
  const isDisabled = card.status === "matched";

  return `
    <button class="memory-card ${stateClass}" type="button" data-card-id="${card.id}" aria-label="${getCardAriaLabel(translation, card)}" aria-pressed="${card.status !== "hidden"}" ${isDisabled ? "disabled" : ""}>
      <span class="memory-card__inner">
        <span class="memory-card__face memory-card__face--back">
          <img src="${cardBackPath}" alt="" aria-hidden="true">
        </span>

        <span class="memory-card__face memory-card__face--front">
          <img src="${card.imagePath}" alt="" aria-hidden="true">
        </span>
      </span>
    </button>
  `;
}

function getCardStateClass(card: MemoryCard): string {
  if (card.status === "matched") {
    return "memory-card--matched";
  }

  if (card.status === "flipped") {
    return "memory-card--flipped";
  }

  return "";
}

function getCardAriaLabel(translation: Translations, card: MemoryCard): string {
  if (card.status === "matched") {
    return translation.game.matchedCardLabel;
  }

  if (card.status === "flipped") {
    return translation.game.flippedCardLabel;
  }

  return translation.game.hiddenCardLabel;
}