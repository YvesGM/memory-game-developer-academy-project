// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../js/language/language-types";
import type { GameState, MemoryCard } from "../js/game/game-interfaces";
import type { PlayerAssets } from "../js/game/game-player-assets";

// ## TS - FUNCTION-IMPORTS
import { getBoardConfig } from "../js/game/board-config";
import { getThemeCardAssets } from "../js/game/theme-card-assets";
import { renderExitGameDialog } from "../js/game/exit-game-dialog";
import { getEndScreenAssets } from "../js/game/end-screen-assets";
import { getPlayerAssets } from "../js/game/game-player-assets";
// # FUNCTIONALITY
// ## FUNCTIONS
export function renderGamePage(translation: Translations, gameState: GameState): string {
  if (gameState.phase === "game-over") {
    return renderGameOverScreen(translation, gameState);
  }

  if (gameState.phase === "result") {
    return renderResultScreen(translation, gameState);
  }

  const boardConfig = getBoardConfig(gameState.boardSize);
  const themeAssets = getThemeCardAssets(gameState.theme);
  const playerAssets = getPlayerAssets(gameState.theme);

  return `
    <main class="game-page game-page--${gameState.theme}" data-game-theme="${gameState.theme}">
      <section class="game-page__content">
        ${renderGameHeader(translation, gameState, themeAssets.exitIconPath, themeAssets.exitHoverIconPath, playerAssets)}
        ${renderGameBoard(translation, gameState.cards, themeAssets.cardBackPath, boardConfig.rows, boardConfig.columns, gameState.boardSize)}
      </section>
      ${renderExitGameDialog(translation)}
    </main>
  `;
}

function renderGameOverScreen(
  translation: Translations,
  gameState: GameState
): string {
  const playerAssets = getPlayerAssets(gameState.theme);

  return `
    <main
      class="
        game-page
        game-page--${gameState.theme}
        end-screen
        end-screen--game-over
      "
      data-game-theme="${gameState.theme}"
    >
      <section class="end-screen__content end-screen__content--game-over">
        <h1 class="end-screen__game-over-title">
          <span class="end-screen__title-shadow" aria-hidden="true">
            ${translation.game.gameOver}
          </span>

          <span class="end-screen__title-front">
            ${translation.game.gameOver}
          </span>
        </h1>

        <div class="end-screen__final-score">
          <p class="end-screen__score-label">
            ${translation.game.finalScore}
          </p>

          <div class="end-screen__score-box">
            ${renderScores(
    translation,
    gameState,
    playerAssets
  )}
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderResultScreen(translation: Translations, gameState: GameState): string {
  const assets = getEndScreenAssets(gameState.theme);

  if (gameState.result === "draw") {
    return renderDrawScreen(translation, gameState, assets.draw.scaleImagePath);
  }

  if (gameState.result === "blue" || gameState.result === "orange") {
    const winnerImagePath = gameState.result === "blue" ? assets.winner.bluePlayerImagePath : assets.winner.orangePlayerImagePath;
    return renderWinnerScreen(translation, gameState, gameState.result, winnerImagePath, assets.winner.confettiImagePath);
  }

  return "";
}

function renderWinnerScreen(
  translation: Translations,
  gameState: GameState,
  winner: "blue" | "orange",
  winnerImagePath: string,
  confettiImagePath: string | null
): string {
  const winnerLabel =
    winner === "blue"
      ? translation.game.bluePlayer
      : translation.game.orangePlayer;

  const confettiMarkup = confettiImagePath
    ? `
      <img
        class="end-screen__confetti"
        src="${confettiImagePath}"
        alt=""
        aria-hidden="true"
      >
    `
    : "";

  return `
    <main
      class="
        game-page
        game-page--${gameState.theme}
        end-screen
        end-screen--winner
        end-screen--winner-${winner}
      "
      data-game-theme="${gameState.theme}"
    >
      ${confettiMarkup}

      <section class="end-screen__content end-screen__content--result">
        <div class="end-screen__winner-text">
          <p class="end-screen__winner-intro">
            ${translation.game.winnerIs}
          </p>

          <h1 class="end-screen__winner-name">
            ${winnerLabel}
          </h1>
        </div>

        <div class="end-screen__result-image-wrapper">
          <img
            class="end-screen__result-icon end-screen__winner-icon"
            src="${winnerImagePath}"
            alt=""
            aria-hidden="true"
          >
        </div>

        ${renderBackToStartButton(translation)}
      </section>
    </main>
  `;
}

function renderDrawScreen(
  translation: Translations,
  gameState: GameState,
  scaleImagePath: string
): string {
  return `
    <main
      class="
        game-page
        game-page--${gameState.theme}
        end-screen
        end-screen--draw
      "
      data-game-theme="${gameState.theme}"
    >
      <section class="end-screen__content end-screen__content--result">
        <div class="end-screen__draw-text">
          <p class="end-screen__draw-intro">
            ${translation.game.drawIntro}
          </p>

          <h1 class="end-screen__draw-title">
            <span class="end-screen__title-shadow" aria-hidden="true">
              ${translation.game.drawTitle}
            </span>

            <span class="end-screen__title-front">
              ${translation.game.drawTitle}
            </span>
          </h1>
        </div>

        <div class="end-screen__result-image-wrapper">
          <img
            class="end-screen__result-icon end-screen__draw-icon"
            src="${scaleImagePath}"
            alt=""
            aria-hidden="true"
          >
        </div>

        ${renderBackToStartButton(translation)}
      </section>
    </main>
  `;
}

function renderBackToStartButton(
  translation: Translations
): string {
  return `
    <button
      class="end-screen__back-button"
      type="button"
      data-end-screen-home
    >
      <span>${translation.game.backToStart}</span>
    </button>
  `;
}

function renderGameHeader(translation: Translations, gameState: GameState, exitIconPath: string, exitHoverIconPath: string, playerAssets: PlayerAssets): string {
  return `
    <header class="game-header">
      ${renderScores(translation, gameState, playerAssets)}
      ${renderCurrentPlayer(translation, gameState, playerAssets)}
      ${renderExitButton(translation, exitIconPath, exitHoverIconPath)}
    </header>
  `;
}

function renderScore(player: "blue" | "orange", label: string, score: number, iconPath: string, showLabel: boolean): string {
  const labelMarkup = showLabel ? `<span class="game-score__label">${label}</span>` : "";

  return `
    <span class="game-score__player game-score__player--${player}">
      <img class="game-score__player-icon" src="${iconPath}" alt="" aria-hidden="true">
      ${labelMarkup}
      <span class="game-score__value">${score}</span>
    </span>
  `;
}

function renderScores(
  translation: Translations,
  gameState: GameState,
  playerAssets: PlayerAssets
): string {
  const blueScore = renderScore("blue", translation.game.bluePlayer, gameState.scores.blue, playerAssets.blueScoreIconPath, playerAssets.showScoreLabels);
  const orangeScore = renderScore("orange", translation.game.orangePlayer, gameState.scores.orange, playerAssets.orangeScoreIconPath, playerAssets.showScoreLabels);
  const scoreMarkup = gameState.theme === "code" ? `${blueScore}${orangeScore}` : `${orangeScore}${blueScore}`;

  return `
    <div class="game-score" aria-label="Score">
      ${scoreMarkup}
    </div>
  `;
}

function renderCurrentPlayer(translation: Translations, gameState: GameState, playerAssets: PlayerAssets): string {
  const isBluePlayer = gameState.activePlayer === "blue";
  const label = isBluePlayer ? translation.game.bluePlayer : translation.game.orangePlayer;
  const iconPath = isBluePlayer ? playerAssets.blueCurrentPlayerIconPath : playerAssets.orangeCurrentPlayerIconPath;

  return `
    <div class="game-header__current-player game-header__current-player--${gameState.activePlayer}">
      <span class="game-header__current-player-label">
        ${translation.game.currentPlayer}
      </span>

      <span class="game-header__active-player-icon">
        <img src="${iconPath}" alt="${label}">
      </span>
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
      <span class="game-exit-button__text">${translation.game.exitGame}</span>
    </button>
  `;
}

function renderGameBoard(translation: Translations, cards: MemoryCard[], cardBackPath: string, rows: number, columns: number, boardSize: GameState["boardSize"]): string {
  return `
    <section class="game-board game-board--${boardSize}" aria-label="${translation.game.title}" style="--game-board-columns: ${columns}; --game-board-rows: ${rows};">
      ${cards.map((card) => { return renderMemoryCard(translation, card, cardBackPath); }).join("")}
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